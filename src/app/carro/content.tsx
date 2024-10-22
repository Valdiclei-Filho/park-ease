"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Select, MenuItem } from "@mui/material";

interface Car {
  id: number;
  placa: string;
  id_cor: number;
  id_modelo: number;
  data_cadastro: string;
  cor_nome?: string;
  modelo_nome?: string;
}

interface ContentProps {
  cars: Car[];
  colors: { id: number; nome: string }[];
  models: { id: number; nome: string }[];
}

export default function Content({ cars, colors, models }: ContentProps) {

  const [rows, setRows] = React.useState<GridRowsProp>(cars);

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log("Updated Row: ", updatedRow);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "placa", headerName: "Placa", width: 150, editable: false },
    {
      field: "cor_nome",
      headerName: "Cor",
      width: 120,
      editable: true,
      renderEditCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => {
            const newValue = e.target.value;
            const updatedRow = { ...params.row, id_cor: newValue };
            processRowUpdate(updatedRow);
          }}
        >
          {(Array.isArray(colors) ? colors : []).map((color) => (
            <MenuItem key={color.id} value={color.id}>
              {color.nome}
            </MenuItem>
          ))}

        </Select>
      ),
    },
    {
      field: "modelo_nome",
      headerName: "Modelo",
      width: 120,
      editable: true,
      renderEditCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => {
            const newValue = e.target.value;
            const updatedRow = { ...params.row, id_modelo: newValue };
            processRowUpdate(updatedRow);
          }}
        >
          {(Array.isArray(models) ? models : []).map((model) => (
            <MenuItem key={model.id} value={model.id}>
              {model.nome}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "data_cadastro",
      headerName: "Data de Cadastro",
      width: 180,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows.rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: () => (
            <GridToolbarContainer>
              <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  const id = Math.floor(Math.random() * 1000);
                  setRows((oldRows) => [
                    ...oldRows,
                    {
                      id,
                      placa: "",
                      id_cor: "",
                      id_modelo: "",
                      data_cadastro: "",
                      isNew: true,
                    },
                  ]);
                  setRowModesModel((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit },
                  }));
                }}
              >
                Add record
              </Button>
            </GridToolbarContainer>
          ),
        }}
      />
    </Box>
  );
}

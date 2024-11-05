import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Select, MenuItem } from "@mui/material";
import { ROUTES_CONST } from "@/shared";

interface Car {
  id: number;
  placa: string;
  id_cor: number;
  id_modelo: number;
  data_cadastro: string;
  cor_nome: string;
  modelo_nome: string;
}

interface Color {
  id: number;
  nome: string;
}

interface Model {
  id: number;
  nome: string;
}

interface Props {
  cars: Car[];
  colors: Color[];
  models: Model[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
}

export default function Content({ cars, colors, setCars }: Props) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const handleCorChange = async (
    id: number,
    placa: string,
    newCorId: number,
    id_modelo: number,
  ) => {
    try {
      const response = await fetch(
        `${ROUTES_CONST.CARRO}?id=${id}&placa=${placa}&id_cor=${newCorId}&id_modelo=${id_modelo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar carro");
      }

      const updatedCars = cars.map((car) =>
        car.id === id
          ? {
              ...car,
              id_cor: newCorId,
              cor_nome: colors.find((cor) => cor.id === newCorId)?.nome || "",
            }
          : car,
      );

      setCars(updatedCars);
      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar a cor:", error);
    }
  };

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const date = new Date(dateString);
    const formattedDate = date
      .toLocaleDateString("pt-BR", options)
      .replace(/, /g, " ");
    return `${formattedDate}`;
  };

  const columns: GridColDef[] = [
    {
      field: "placa",
      headerName: "Placa",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cor_nome",
      headerName: "Cor",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Select
          value={params.row.id_cor}
          onChange={(e) =>
            handleCorChange(
              params.row.id,
              params.row.placa,
              Number(e.target.value),
              params.row.id_modelo,
            )
          }
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {colors.map((cor) => (
            <MenuItem key={cor.id} value={cor.id}>
              {cor.nome}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "modelo_nome",
      headerName: "Modelo",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "data_cadastro",
      headerName: "Data de Cadastro",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => formatDateTime(params.row.data_cadastro),
    },
  ];

  return (
    <div
      style={{
        height: 600,
        width: "100%",
      }}
    >
      <DataGrid
        rows={cars}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        pageSizeOptions={[5, 8, 10]}
        disableRowSelectionOnClick
        filterMode="client"
      />
    </div>
  );
}

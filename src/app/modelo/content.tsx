"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface Model {
  id: number;
  nome: string;
}

interface ModelsGrafico {
  modelo: string;
  quantidade: number;
}

interface Props {
  models: Model[];
  modelsGrafico: ModelsGrafico[];
}

export default function Models({ models, modelsGrafico }: Props) {
  const columns: GridColDef<(typeof models)[number]>[] = [
    {
      field: "id",
      headerName: "Código",
      editable: false,
      align: "center",
      filterable: true,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "nome",
      headerName: "Modelo",
      editable: false,
      align: "center",
      filterable: true,
      sortable: true,
      headerAlign: "center",
      flex: 1,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        justifyItems: "center",
      }}
    >
      <Box
        sx={{
          height: 350,
          width: "50%",
          margin: 10,
          marginRight: 0,
        }}
      >
        <DataGrid
          rows={models}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
      <PieChart
        series={[
          {
            data: modelsGrafico.map((item) => ({
              id: item.modelo,
              value: item.quantidade,
              label: item.modelo,
            })),
            highlightScope: {
              fade: "global",
              highlight: "item",
            },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: "gray",
            },
          },
        ]}
        height={400}
        width={600}
        margin={{
          right: 150,
        }}
      />
    </div>
  );
}

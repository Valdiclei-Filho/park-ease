"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface Color {
  id: number;
  nome: string;
}

interface ColorsGrafico {
  cor: string;
  quantidade: number;
}

interface Props {
  colors: Color[];
  colorsGrafico: ColorsGrafico[];
}

const corEmPortugues = {
  vermelho: "#FF0000",
  verde: "#00FF00",
  azul: "#0000FF",
  amarelo: "#FFFF00",
  preto: "#000000",
  branco: "#EEEEED",
  cinza: "#808080",
  "cinza claro": "#D3D3D3",
  "cinza escuro": "#A9A9A9",
  laranja: "#FFA500",
  roxo: "#800080",
  rosa: "#FFC0CB",
  bege: "#F5F5DC",
  marrom: "#8B4513",
  turquesa: "#40E0D0",
  ciano: "#00FFFF",
  magenta: "#FF00FF",
  ouro: "#FFD700",
  prata: "#C0C0C0",
  "vermelho escuro": "#8B0000",
  "verde escuro": "#006400",
  "azul escuro": "#00008B",
  "azul claro": "#ADD8E6",
  "verde claro": "#90EE90",
  "amarelo claro": "#FFFFE0",
  "roxo claro": "#E6E6FA",
  "laranja claro": "#FFA07A",
  pêssego: "#FFDAB9",
  lavanda: "#E6E6FA",
  mauve: "#E0B0FF",
  vinho: "#722F37",
  champagne: "#F7E7CE",
  "verde limão": "#32CD32",
  "azul turquesa": "#48D1CC",
  creme: "#FFFDD0",
  salmon: "#FA8072",
};

type CoresEmPortugues = keyof typeof corEmPortugues;

export default function Colors({ colors, colorsGrafico }: Props) {
  const columns: GridColDef<(typeof colors)[number]>[] = [
    {
      field: "id",
      headerName: "Código",
      headerAlign: "center",
      editable: false,
      align: "center",
      filterable: true,
      flex: 1,
    },
    {
      field: "nome",
      headerName: "Cor",
      headerAlign: "center",
      editable: false,
      align: "center",
      filterable: true,
      sortable: true,
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
          rows={colors}
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
            data: colorsGrafico.map((item) => ({
              id: item.cor,
              value: item.quantidade,
              label: item.cor,
              color:
                corEmPortugues[item.cor.toLowerCase() as CoresEmPortugues] ||
                "gray",
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
          right: 100,
        }}
      />
    </div>
  );
}

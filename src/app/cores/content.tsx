"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

interface Color {
  id: number;
  nome: string
}

interface ColorsGrafico {
  cor: string;
  quantidade: number
}

interface Props {
  colors: Color[];
  colorsGrafico: ColorsGrafico[];
  setColors: React.Dispatch<React.SetStateAction<Color[]>>;
  setColorsGrafico: React.Dispatch<React.SetStateAction<ColorsGrafico[]>>;
}

export default function Colors(
  { colors, colorsGrafico, setColors, setColorsGrafico }: Props
) {
  console.log(colors)
  const columns: GridColDef<(typeof colors)[number]>[] = [
    {
      field: 'id',
      headerName: 'Código',
      headerAlign: 'center',
      editable: false,
      align: 'center',
      filterable: true,
      flex: 1
    }, {
      field: 'nome',
      headerName: 'Cor',
      headerAlign: 'center',
      editable: false,
      align: 'center',
      filterable: true,
      sortable: true,
      flex: 1
    }
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        justifyItems: 'center'
      }}>
      <Box
        sx={{
          height: 350,
          width: '50%',
          margin: 10,
          marginRight: 0
        }}>
        <DataGrid
          rows={colors}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]} />
      </Box>
      <PieChart
        series={[{
          data: colorsGrafico.map(
            (item) => ({ id: item.cor, value: item.quantidade, label: item.cor })
          ),
          highlightScope: {
            fade: 'global',
            highlight: 'item'
          },
          faded: {
            innerRadius: 30,
            additionalRadius: -30,
            color: 'gray'
          }
        }
        ]}
        height={400}
        width={600}
        margin={{
          right: 100
        }} />
    </div>

  );
}
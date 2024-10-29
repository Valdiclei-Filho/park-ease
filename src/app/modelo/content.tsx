"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

interface Model {
  id: number;
  nome: string
}

interface ModelsGrafico {
  modelo: string;
  quantidade: number
}

interface Props {
  models: Model[];
  modelsGrafico: ModelsGrafico[];
  setModels: React.Dispatch<React.SetStateAction<Model[]>>;
  setModelsGrafico: React.Dispatch<React.SetStateAction<ModelsGrafico[]>>;
}

export default function Colors({ models, modelsGrafico, setModels, setModelsGrafico }: Props) {
  console.log(models)
  const columns: GridColDef<(typeof models)[number]>[] = [
    { field: 'id', headerName: 'Código', editable: false, align: 'left', filterable: true },
    {
      field: 'nome',
      headerName: 'Nome',
      editable: false,
      align: 'center',
      filterable: true,
      sortable: true,
    },
  ];

  return (
    <div>

      <Box sx={{ height: 400, width: '100%', }}>
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
              label: item.modelo
            })),
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        height={600}
        width={500}
        margin={{ right: 200 }}
      />

    </div>
  );
}
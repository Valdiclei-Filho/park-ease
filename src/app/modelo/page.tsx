"use client";
import { ROUTES_CONST } from "@/shared/route.const";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

export default async function CarsAll() {
  const columns: GridColDef<(typeof rows)[number]>[] = [
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

  const response = await fetch(ROUTES_CONST.CARRO_MODELO);
  const responseJson = await response.json();
  const rows = responseJson.rows;

  return (
    <div>

      <Box sx={{ height: 400, width: '100%', }}>
        <DataGrid
          rows={rows}
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
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}

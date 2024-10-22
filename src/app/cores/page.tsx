"use client";
import { ROUTES_CONST } from "@/shared/route.const";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default async function  CarsAll() {
    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'Código', editable: false, align: 'left', filterable: true},
        {
          field: 'nome',
          headerName: 'Nome',
          editable: false,
          align: 'center',
          filterable: true,
          sortable: true,
        },
      ];
      
      const response = await fetch(ROUTES_CONST.CORES);
      const responseJson = await response.json();
      const rows = responseJson.rows;

    return (
    <Box sx={{ height: 800, width: '100%', }}>
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
  );
}

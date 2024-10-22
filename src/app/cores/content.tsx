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

}

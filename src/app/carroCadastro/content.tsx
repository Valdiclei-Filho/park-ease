import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Container,
  Paper,
  Autocomplete,
} from "@mui/material";
import dayjs from "dayjs";
import { ROUTES_CONST } from "@/shared";

interface Car {
  placa: string;
  id_cor: number;
  id_modelo: number;
  data_cadastro: string;
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
  colors: Color[];
  models: Model[];
}

export default function Content({ colors, models }: Props) {
  const [car, setCliente] = useState<Car>({
    placa: "",
    id_cor: 0,
    id_modelo: 0,
    data_cadastro: dayjs().format("YYYY-MM-DD"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...car, [e.target.name]: e.target.value });
  };

  const handleColorSelect = (
    event: React.SyntheticEvent<Element, Event>,
    value: Color | null,
  ) => {
    setCliente({
      ...car,
      id_cor: value ? value.id : 0,
    });
  };

  const handleModelSelect = (
    event: React.SyntheticEvent<Element, Event>,
    value: Model | null,
  ) => {
    setCliente({
      ...car,
      id_modelo: value ? value.id : 0,
    });
  };

  const handleSubmit = async () => {
    try {
      const clienteParams = new URLSearchParams(
        Object.entries(car).map(([key, value]) => [key, String(value)]),
      ).toString();

      const url = `${ROUTES_CONST.CARRO_CADASTRO}?${clienteParams}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, marginBottom: 5 }}>
      <Paper
        elevation={6}
        sx={{ padding: 4, borderRadius: 3, backgroundColor: "#fafafa" }}
      >
        <Typography
          variant="h4"
          align="center"
          color="primary"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Cadastro do Carro
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Placa do Carro"
            name="placa"
            value={car.placa}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Cor</InputLabel>
            <Autocomplete
              value={
                car.id_cor ? colors.find((cor) => cor.id === car.id_cor) : null
              }
              onChange={handleColorSelect}
              options={colors}
              getOptionLabel={(option) => option.nome}
              renderInput={(params) => (
                <TextField {...params} label="Cor" variant="outlined" />
              )}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Modelo</InputLabel>
            <Autocomplete
              value={
                car.id_modelo
                  ? models.find((model) => model.id === car.id_modelo)
                  : null
              }
              onChange={handleModelSelect}
              options={models}
              getOptionLabel={(option) => option.nome}
              renderInput={(params) => (
                <TextField {...params} label="Modelo" variant="outlined" />
              )}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
            />
          </FormControl>
          <TextField
            label="Data de Cadastro"
            name="dataCadastro"
            value={car.data_cadastro}
            disabled
            fullWidth
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              padding: "12px",
              fontWeight: "bold",
              backgroundColor: "#4CAF50",
              ":hover": { backgroundColor: "#388E3C" },
            }}
          >
            Salvar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

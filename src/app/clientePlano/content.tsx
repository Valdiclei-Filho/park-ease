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

interface Cliente {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  id_carro: number;
  id_plano: number;
  dataCadastro: string;
}

interface Car {
  id: number;
  placa: string;
  id_cor: number;
  id_modelo: number;
  data_cadastro: string;
  cor_nome: string;
  modelo_nome: string;
}

interface Plan {
  id: number;
  nome: string;
  valor: number;
  horas_maximas: string;
  data_cadastro: string;
  quantidade_veiculos: number;
}

interface Props {
  cars: Car[];
  plans: Plan[];
}

export default function Content({ cars, plans }: Props) {
  const [cliente, setCliente] = useState<Cliente>({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    dataNascimento: "",
    id_plano: 0,
    id_carro: 0,
    dataCadastro: dayjs().format("YYYY-MM-DD"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleCarroSelect = (
    event: React.SyntheticEvent<Element, Event>,
    value: Car | null,
  ) => {
    setCliente({
      ...cliente,
      id_carro: value ? value.id : 0,
    });
  };

  const handlePlanoSelect = (
    event: React.SyntheticEvent<Element, Event>,
    value: Plan | null,
  ) => {
    setCliente({
      ...cliente,
      id_plano: value ? value.id : 0,
    });
  };

  const handleSubmit = async () => {
    try {
      const clienteParams = new URLSearchParams(
        Object.entries(cliente).map(([key, value]) => [key, String(value)]),
      ).toString();

      const url = `${ROUTES_CONST.CLIENTE_PLANO}?${clienteParams}`;

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
          Cadastro de Cliente
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nome do Cliente"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="CPF"
            name="cpf"
            value={cliente.cpf}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Telefone"
            name="telefone"
            value={cliente.telefone}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Data de Nascimento"
            name="dataNascimento"
            type="date"
            value={cliente.dataNascimento}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Carro</InputLabel>
            <Autocomplete
              value={
                cliente.id_carro
                  ? cars.find((carro) => carro.id === cliente.id_carro)
                  : null
              }
              onChange={handleCarroSelect}
              options={cars}
              getOptionLabel={(option) => option.placa}
              renderInput={(params) => (
                <TextField {...params} label="Carro" variant="outlined" />
              )}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Plano</InputLabel>
            <Autocomplete
              value={
                cliente.id_plano
                  ? plans.find((plano) => plano.id === cliente.id_plano)
                  : null
              }
              onChange={handlePlanoSelect}
              options={plans}
              getOptionLabel={(option) => option.nome}
              renderInput={(params) => (
                <TextField {...params} label="Plano" variant="outlined" />
              )}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
            />
          </FormControl>
          <TextField
            label="Data de Cadastro"
            name="dataCadastro"
            value={cliente.dataCadastro}
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

"use client";

import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box } from "@mui/material";
import { useState } from "react";

const CadastroCliente = () => {
  const [cliente, setCliente] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    idPlano: "",
    idCarro: "",
  });

  const [planos, setPlanos] = useState([
    { id: 1, nome: "Plano Básico" },
    { id: 2, nome: "Plano Premium" },
  ]); // Esses dados seriam carregados do banco

  const [carros, setCarros] = useState([
    { id: 1, placa: "ABC1234" },
    { id: 2, placa: "XYZ5678" },
  ]); // Esses dados seriam carregados do banco

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cliente);
    // Lógica de envio para o servidor (por exemplo, usando axios para fazer um POST)
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, margin: "0 auto", p: 2 }}>
      <TextField
        label="Nome"
        name="nome"
        value={cliente.nome}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="CPF"
        name="cpf"
        value={cliente.cpf}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Telefone"
        name="telefone"
        value={cliente.telefone}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        name="email"
        value={cliente.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Data de Nascimento"
        name="dataNascimento"
        type="date"
        value={cliente.dataNascimento}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        required
      />

      {/* Select para Planos */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="select-plano-label">Plano</InputLabel>
        <Select
          labelId="select-plano-label"
          name="idPlano"
          value={cliente.idPlano}
          onChange={handleChange}
          required
        >
          {planos.map((plano) => (
            <MenuItem key={plano.id} value={plano.id}>
              {plano.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select para Carros */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="select-carro-label">Carro</InputLabel>
        <Select
          labelId="select-carro-label"
          name="idCarro"
          value={cliente.idCarro}
          onChange={handleChange}
          required
        >
          {carros.map((carro) => (
            <MenuItem key={carro.id} value={carro.id}>
              {carro.placa}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Cadastrar Cliente
      </Button>
    </Box>
  );
};

export default CadastroCliente;

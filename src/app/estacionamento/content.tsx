import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SelectChangeEvent } from "@mui/material/Select";
import { QRCodeCanvas } from "qrcode.react";
import Confetti from "react-confetti";
import { DateUtils, ROUTES_CONST } from "@/shared";

interface Cliente {
  id: number;
  nome_cliente: string;
  email: string;
  cpf: string;
  horario_entrada?: string;
  horario_saida?: string;
  horas_maximas: number;
  modelo: string;
  cor: string;
  placa: string;
  multa?: number;
}

interface Props {
  clientes: Cliente[];
}

export default function ClientePage({ clientes }: Props) {
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [estacionados, setEstacionados] = useState<Cliente[]>([]);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [pagamentoEfetuado, setPagamentoEfetuado] = useState(false);

  const handleSelectChange = (event: SelectChangeEvent<number | null>) => {
    setClienteId(event.target.value as number);
  };

  const handleAddCliente = () => {
    const cliente = clientes.find((c) => c.id === clienteId);
    if (cliente && !estacionados.some((c) => c.id === cliente.id)) {
      const horarioEntrada = DateUtils.GetCurrentDateAsString();
      setEstacionados((prev) => [
        ...prev,
        { ...cliente, multa: 0, horario_entrada: horarioEntrada },
      ]);
    }
    setClienteId(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEstacionados((prev) =>
        prev.map((cliente) => {
          if (cliente.horas_maximas > 0) {
            return { ...cliente, horas_maximas: cliente.horas_maximas - 1 };
          }
          return {
            ...cliente,
            multa: (cliente.multa || 0) + 20,
          };
        }),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handlePagamento = (id: number) => {
    const horarioSaida = DateUtils.GetCurrentDateAsString();

    setEstacionados((prev) =>
      prev.map((cliente) =>
        cliente.id === id
          ? { ...cliente, horario_saida: horarioSaida }
          : cliente,
      ),
    );

    const cliente = estacionados.find((c) => c.id === id);
    if (cliente) {
      const qrData = JSON.stringify({
        id: cliente.id,
        nome: cliente.nome_cliente,
        multa: cliente.multa,
        horario_saida: horarioSaida,
        mensagem: "Realize o pagamento da multa via QR Code.",
      });

      setQrCodeData(qrData);
      setClienteId(cliente.id);
      setShowQrDialog(true);
    }
  };

  const handleCloseQrDialog = () => {
    setEstacionados((prev) =>
      prev.map((cliente) =>
        cliente.id === clienteId
          ? {
              ...cliente,
              horario_saida: DateUtils.GetCurrentDateAsString(),
            }
          : cliente,
      ),
    );

    setEstacionados((prev) =>
      prev.filter((cliente) => cliente.id !== clienteId),
    );

    setShowQrDialog(false);
    setQrCodeData(null);
    setPagamentoEfetuado(true);

    setTimeout(() => {
      setPagamentoEfetuado(false);
    }, 10000);
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const clienteParams = new URLSearchParams(
        Object.entries(clientes).map(([key, value]) => [key, String(value)]),
      ).toString();

      console.log(clienteParams);

      const url = `${ROUTES_CONST.ESTACIONAMENTO}?${clienteParams}`;

      console.log(url);

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

  const columns: GridColDef[] = [
    { field: "nome_cliente", headerName: "Nome", flex: 1, align: "center" },
    { field: "email", headerName: "Email", flex: 1, align: "center" },
    { field: "cpf", headerName: "CPF", flex: 1, align: "center" },
    {
      field: "horario_entrada",
      headerName: "Horario Entrada",
      flex: 1,
      align: "center",
    },
    {
      field: "horario_saida",
      headerName: "Horario Saída",
      flex: 1,
      align: "center",
    },
    {
      field: "horas_maximas",
      headerName: "Horas Máximas",
      flex: 1,
      align: "center",
    },
    { field: "modelo", headerName: "Modelo", flex: 1, align: "center" },
    { field: "cor", headerName: "Cor", flex: 1, align: "center" },
    { field: "placa", headerName: "Placa", flex: 1, align: "center" },
    { field: "multa", headerName: "Multa (R$)", flex: 1, align: "center" },
    {
      field: "acao",
      headerName: "Ação",
      flex: 1,
      align: "center",
      renderCell: (params) =>
        params.row.multa && params.row.multa > 0 ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handlePagamento(params.row.id)}
          >
            Pagar
          </Button>
        ) : null,
    },
  ];

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Gerenciamento de Estacionamento
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="cliente-select-label">Cliente</InputLabel>
        <Select
          labelId="cliente-select-label"
          value={clienteId}
          onChange={handleSelectChange}
          label="Cliente"
        >
          {clientes.map((cliente) => (
            <MenuItem key={cliente.id} value={cliente.id}>
              {cliente.nome_cliente} - {cliente.placa}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCliente}
        disabled={clienteId === null}
        fullWidth
      >
        Adicionar Cliente
      </Button>

      <Box mt={4} style={{ width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          Clientes Estacionados
        </Typography>
        <Box style={{ height: "400px", width: "100%" }}>
          <DataGrid
            rows={estacionados}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[5]}
            style={{
              width: "100%",
            }}
          />
        </Box>
      </Box>

      {pagamentoEfetuado && <Confetti />}

      <Dialog open={showQrDialog} onClose={handleCloseQrDialog}>
        <DialogTitle align="center">Pagamento</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {qrCodeData && (
            <QRCodeCanvas
              value={qrCodeData}
              size={256}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={true}
            />
          )}
          <Typography style={{ marginTop: "1rem", textAlign: "center" }}>
            Leia o QR Code para realizar o pagamento.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQrDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

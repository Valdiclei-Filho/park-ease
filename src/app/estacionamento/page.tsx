"use client";

import ClientePage from "./content";
import React, { useEffect, useRef, useState } from "react";
import { ROUTES_CONST } from "@/shared/route.const";
import { Loading } from "../../components/_ui/Button/index";
import { Toast } from "../../components/_ui/Toast/index";
import { SnackbarCloseReason } from "@mui/material/Snackbar";

interface Cliente {
  id: number;
  nome_cliente: string;
  email: string;
  cpf: string;
  plano: string;
  valor_plano: string;
  horas_maximas: number;
  modelo: string;
  cor: string;
  placa: string;
}

export default function ColorsAll() {
  const hasFetched = useRef(false);
  const [clientes, setCars] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("error");

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const [clientesResponse] = await Promise.all([
          fetch(ROUTES_CONST.ESTACIONAMENTO),
        ]);

        if (!clientesResponse.ok) {
          throw new Error("Falha ao buscar alguns dados");
        }

        const clienteData = await clientesResponse.json();

        setCars(clienteData.rows);
        setSuccessMessage("Dados carregados com sucesso!");
        setSeverity("success");
      } catch (err) {
        setError("Falha ao carregar os dados");
        setSeverity("error");
      } finally {
        setLoading(false);
        setSnackbarOpen(true);
      }
    };

    fetchData();
  }, []);

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return <Loading color="#021526" size={88} />;
  }

  return (
    <>
      <ClientePage clientes={clientes}></ClientePage>
      <Toast
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={error ? error : successMessage || ""}
        severity={severity}
      />
    </>
  );
}

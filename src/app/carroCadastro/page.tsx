"use client";

import React, { useEffect, useRef, useState } from "react";
import Content from "./content";
import { ROUTES_CONST } from "@/shared/route.const";
import { Loading } from "../../components/_ui/Button/index";
import { Toast } from "../../components/_ui/Toast/index";
import { SnackbarCloseReason } from "@mui/material/Snackbar";

interface Color {
  id: number;
  nome: string;
}

interface Model {
  id: number;
  nome: string;
}

export default function CarsAll() {
  const hasFetched = useRef(false);
  const [colors, setCars] = useState<Color[]>([]);
  const [models, setPlans] = useState<Model[]>([]);
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
        const [coresResponse, modelosResponse] = await Promise.all([
          fetch(ROUTES_CONST.CORES),
          fetch(ROUTES_CONST.CARRO_MODELO),
        ]);

        if (!coresResponse.ok || !modelosResponse.ok) {
          throw new Error("Falha ao buscar alguns dados");
        }

        const corData = await coresResponse.json();
        const modeloData = await modelosResponse.json();

        setCars(corData.rows);
        setPlans(modeloData.rows);
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
      <Content colors={colors} models={models} />

      <Toast
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={error ? error : successMessage || ""}
        severity={severity}
      />
    </>
  );
}

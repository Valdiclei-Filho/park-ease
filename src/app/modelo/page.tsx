"use client";

import Models from "./content";
import React, { useEffect, useRef, useState } from "react";
import { ROUTES_CONST } from "@/shared/route.const";
import { Loading } from "../../components/_ui/Button/index";
import { Toast } from "../../components/_ui/Toast/index";
import { SnackbarCloseReason } from "@mui/material/Snackbar";

interface Model {
  id: number;
  nome: string;
}

interface ModelsGrafico {
  modelo: string;
  quantidade: number;
}

export default function ModelsAll() {
  const hasFetched = useRef(false);
  const [models, setModels] = useState<Model[]>([]);
  const [modelsGrafico, setModelsGrafico] = useState<ModelsGrafico[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("error");

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const [modelsResponse, modelsGraficoResponse] = await Promise.all([
          fetch(ROUTES_CONST.CARRO_MODELO),
          fetch(`${ROUTES_CONST.CARRO_MODELO}/grafico`),
        ]);

        if (!modelsResponse.ok || !modelsGraficoResponse.ok) {
          throw new Error("Failed to fetch data.");
        }

        const colorData = await modelsResponse.json();
        const colorGraficoData = await modelsGraficoResponse.json();

        setModels(colorData.rows);
        setModelsGrafico(colorGraficoData.rows);
        setSuccessMessage("Dados carregados com sucesso!");
        setSeverity("success");
      } catch (err) {
        setError("Falha ao carregar os dados");
        setSeverity("error");
        console.log(err);
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
      <Models models={models} modelsGrafico={modelsGrafico} />
      <Toast
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={error ? error : successMessage || ""}
        severity={severity}
      />
    </>
  );
}

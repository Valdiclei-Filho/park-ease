"use client";

import React, { useEffect, useRef, useState } from "react";
import Content from "./content";
import { ROUTES_CONST } from "@/shared/route.const";
import { Loading } from "../../components/_ui/Button/index";
import { Toast } from "../../components/_ui/Toast/index";
import { SnackbarCloseReason } from "@mui/material/Snackbar";

interface Car {
  id: number;
  placa: string;
  id_cor: number;
  id_modelo: number;
  data_cadastro: string;
  cor_nome: string;
  modelo_nome: string;
}

export default function CarsAll() {
  const hasFetched = useRef(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [colors, setColors] = useState([]);
  const [models, setModels] = useState([]);
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
        const [carResponse, colorResponse, modelResponse] = await Promise.all([
          fetch(ROUTES_CONST.CARRO),
          fetch(ROUTES_CONST.CORES),
          fetch(ROUTES_CONST.CARRO_MODELO),
        ]);

        if (!carResponse.ok || !colorResponse.ok || !modelResponse.ok) {
          throw new Error("Falha ao buscar alguns dados");
        }

        const carData = await carResponse.json();
        const colorData = await colorResponse.json();
        const modelData = await modelResponse.json();

        setCars(carData.rows);
        setColors(colorData.rows);
        setModels(modelData.rows);
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
      <Content cars={cars} colors={colors} models={models} setCars={setCars} />

      <Toast
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={error ? error : successMessage || ""}
        severity={severity}
      />
    </>
  );
}

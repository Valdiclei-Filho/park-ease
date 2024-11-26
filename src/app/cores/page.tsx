"use client";

import React, { useEffect, useRef, useState } from "react";
import { ROUTES_CONST } from "@/shared/route.const";
import { Loading } from "../../components/_ui/Button/index";
import { Toast } from "../../components/_ui/Toast/index";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import Colors from "./content";

interface Color {
  id: number;
  nome: string;
}

interface ColorsGrafico {
  cor: string;
  quantidade: number;
}

export default function ColorsAll() {
  const hasFetched = useRef(false);
  const [colors, setColors] = useState<Color[]>([]);
  const [colorsGrafico, setColorsGrafico] = useState<ColorsGrafico[]>([]);
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
        const [colorsResponse] = await Promise.all([fetch(ROUTES_CONST.CORES)]);

        const [colorsGraficoResponse] = await Promise.all([
          fetch(`${ROUTES_CONST.CORES}/grafico`),
        ]);

        if (!colorsResponse.ok) {
          throw new Error("Failed to fetch some data.");
        }

        const colorData = await colorsResponse.json();
        const colorGraficoData = await colorsGraficoResponse.json();

        setColors(colorData.rows);
        setColorsGrafico(colorGraficoData.rows);
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
      <Colors colors={colors} colorsGrafico={colorsGrafico} />
      <Toast
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={error ? error : successMessage || ""}
        severity={severity}
      />
    </>
  );
}

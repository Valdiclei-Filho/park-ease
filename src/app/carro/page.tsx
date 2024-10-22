"use client";

import React, { useEffect, useState } from "react";
import Content from "./content";
import { ROUTES_CONST } from "@/shared/route.const";

interface Car {
  id: number;
  placa: string;
  id_cor: number;
  id_modelo: number;
  data_cadastro: string;
  cor_nome?: string;
  modelo_nome?: string;
}

interface Color {
  id: number;
  nome: string;
}

interface Model {
  id: number;
  nome: string;
}

export default function CarsAll() {
  const [cars, setCars] = useState<Car[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carResponse, colorResponse, modelResponse] = await Promise.all([
          fetch(ROUTES_CONST.CARRO, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(ROUTES_CONST.CORES, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(ROUTES_CONST.CARRO_MODELO, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        if (!carResponse.ok || !colorResponse.ok || !modelResponse.ok) {
          throw new Error("Failed to fetch some data.");
        }

        const carData = await carResponse.json();
        const colorData = await colorResponse.json();
        const modelData = await modelResponse.json();

        setCars(carData);
        setColors(colorData);
        setModels(modelData);
      } catch (err) {
        setError("Erro ao buscar os dados. Por favor, tente novamente.");
        console.error("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <Content cars={cars} colors={colors} models={models} />;
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Content from "./content";
import { ROUTES_CONST } from "@/shared/route.const";

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
          throw new Error("Failed to fetch some data.");
        }

        const carData = await carResponse.json();
        const colorData = await colorResponse.json();
        const modelData = await modelResponse.json();

        setCars(carData.rows);
        setColors(colorData.rows);
        setModels(modelData.rows);
      } catch (err) {
        setError("Failed to load data");
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

  return <Content cars={cars} colors={colors} models={models} setCars={setCars} />;
}

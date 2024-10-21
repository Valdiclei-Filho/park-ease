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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carResponse = await fetch(ROUTES_CONST.CARRO, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const carData = await carResponse.json();
        setCars(carData);

        const colorResponse = await fetch(ROUTES_CONST.CORES, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const colorData = await colorResponse.json();
        setColors(colorData);

        const modelResponse = await fetch(ROUTES_CONST.CARRO_MODELO, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const modelData = await modelResponse.json();
        setModels(modelData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Content cars={cars} colors={colors} models={models} />
  );
}

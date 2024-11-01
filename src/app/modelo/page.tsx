"use client";
import Color from './content'
import React, { useEffect, useRef, useState } from "react";
import { ROUTES_CONST } from "@/shared/route.const";

interface Model {
  id: number;
  nome: string;
}

interface ModelsGrafico {
  modelo: string;
  quantidade: number;
}

export default function ColorsAll() {
  const hasFetched = useRef(false);
  const [models, setModels] = useState<Model[]>([]);
  const [modelsGrafico, setModelsGrafico] = useState<ModelsGrafico[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const [modelsResponse, modelsGraficoResponse] = await Promise.all([
          fetch(ROUTES_CONST.CARRO_MODELO),
          fetch(`${ROUTES_CONST.CARRO_MODELO}/grafico`)
        ]);

        if (!modelsResponse.ok || !modelsGraficoResponse.ok) {
          throw new Error("Failed to fetch data.");
        }

        const colorData = await modelsResponse.json();
        const colorGraficoData = await modelsGraficoResponse.json();

        setModels(colorData.rows);
        setModelsGrafico(colorGraficoData.rows);
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

  return <Color
    models={models}
    modelsGrafico={modelsGrafico}
    setModels={setModels}
    setModelsGrafico={setModelsGrafico} />;
}

"use client";
import Color from './content'
import React, { useEffect, useState } from "react";
import { ROUTES_CONST } from "@/shared/route.const";

interface Color {
  id: number;
  nome: string;
}

interface ColorsGrafico{
  cor: string;
  quantidade: number;
}

export default function ColorsAll() {
  const [colors, setColors] = useState<Color[]>([]);
  const [colorsGrafico, setColorsGrafico] = useState<ColorsGrafico[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [colorsResponse] = await Promise.all([
          fetch(ROUTES_CONST.CORES),
        ]);

        const [colorsGraficoResponse] = await Promise.all([
          fetch(`${ROUTES_CONST.CORES}/grafico`)
        ])

        if (!colorsResponse.ok) {
          throw new Error("Failed to fetch some data.");
        }

        const colorData = await colorsResponse.json();
        const colorGraficoData = await colorsGraficoResponse.json();

        setColors(colorData.rows);
        setColorsGrafico(colorGraficoData.rows);
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

  return <Color colors={colors} colorsGrafico={colorsGrafico} setColors={setColors} setColorsGrafico={setColorsGrafico}/>;
}

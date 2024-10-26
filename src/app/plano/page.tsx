"use client";

import Planos from './content'
import React, { useEffect, useState } from "react";
import { ROUTES_CONST } from "@/shared/route.const";

interface Plan {
  id: number;
  nome: string;
  valor: number;
  horas_maximas: string;
  data_cadastro: string;
  quantidade_veiculos: number
}

export default function PlansAll() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planResponse] = await Promise.all([
          fetch(ROUTES_CONST.PLANOS),
        ]);

        if (!planResponse.ok) {
          throw new Error("Failed to fetch some data.");
        }

        const planData = await planResponse.json();

        setPlans(planData.rows);
        console.log(planData)
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

  return <Planos plans={plans} setPlans={setPlans}/>;
}
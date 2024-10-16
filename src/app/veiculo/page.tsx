"use client";

import React, { useEffect, useState } from 'react';
import Content from './content';
import { getCars } from './actions';
import { getColors } from '../cores/actions';
import { getCarModels } from '../veiculo-modelo/actions';

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
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const carData = await getCars();
                const colorData = await getColors();
                const modelData = await getCarModels();
                
                setCars(carData);
                setColors(colorData);
                setModels(modelData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
    
        fetchData();
    }, []);
    
    return (
      (colors.length > 0 && models.length > 0) ? (
        <Content cars={cars} colors={colors} models={models} />
      ) : (
        <div>Loading...</div>
      )
    );
}

import React from 'react';
import {
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import {ROUTES_CONST} from '@/shared';

interface Car {
    id: number;
    placa: string;
    id_cor: number;
    id_modelo: number;
    data_cadastro: string;
    cor_nome: string;
    modelo_nome: string;
}

interface Color {
    id: number;
    nome: string;
}

interface Model {
    id: number;
    nome: string;
}

interface Props {
    cars: Car[];
    colors: Color[];
    models: Model[];
    setCars: React.Dispatch <React.SetStateAction<Car[]> >;
}

export default function Content({cars, colors, models, setCars} : Props) {

  const handleCorChange = async (id: number, placa: string, newCorId: number, id_modelo: number) => {
    try {
        const response = await fetch(
            `${ROUTES_CONST.CARRO}?id=${id}&placa=${placa}&id_cor=${newCorId}&id_modelo=${id_modelo}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Erro ao atualizar carro');
        }

        const updatedCars = cars.map((car) =>
            car.id === id
                ? {
                      ...car,
                      id_cor: newCorId,
                      cor_nome: colors.find((cor) => cor.id === newCorId)?.nome || '',
                  }
                : car
        );

        setCars(updatedCars);
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar a cor:', error);
    }
};

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Placa</TableCell>
                        <TableCell>Cor</TableCell>
                        <TableCell>Modelo</TableCell>
                        <TableCell>Data de Cadastro</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        cars.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.placa}</TableCell>
                                <TableCell>
                                    <Select
                                        value={row.id_cor}
                                        onChange={(e) => handleCorChange(row.id, row.placa, Number(e.target.value), row.id_modelo)}>
                                        {
                                            colors.map((cor) => (
                                                <MenuItem key={cor.id} value={cor.id}>
                                                    {cor.nome}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    {row.modelo_nome}
                                </TableCell>
                                <TableCell>{row.data_cadastro}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

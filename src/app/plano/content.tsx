"use client";

import {Box, Button, Grid, Typography} from '@mui/material';

interface Plan {
    id: number;
    nome: string;
    valor: number;
    horas_maximas: string;
    data_cadastro: string;
    quantidade_veiculos: number;
}

interface Props {
    plans: Plan[];
    setPlans: React.Dispatch<React.SetStateAction<Plan[]>>;
}

export default function Planos({ plans, setPlans }: Props) {
    return (
        <Box
            sx={{
                flexGrow: 1,
                padding: '50px',
                backgroundColor: '#f7f8fc'
            }}>
            <Typography
                variant="h2"
                align="center"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    marginBottom: '40px',
                    color: '#333'
                }}>
                Nossos Planos
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {plans.map((plano) => (
                    <Grid item xs={12} sm={6} md={4} key={plano.id}>
                        <Box
                            sx={{
                                background: 'linear-gradient(135deg, #FFCDD2, #FF8A80)',
                                height: '350px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                borderRadius: '16px',
                                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
                                }
                            }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>
                                {plano.nome}
                            </Typography>
                            <Typography
                                variant="body1"
                                align="center"
                                sx={{
                                    color: '#fff'
                                }}>
                                {plano.valor}
                            </Typography>
                            <Typography
                                variant="body2"
                                align="center"
                                sx={{
                                    color: '#fff',
                                    marginTop: '10px'
                                }}>
                                {plano.horas_maximas}
                            </Typography>
                            <Typography
                                variant="body2"
                                align="center"
                                sx={{
                                    color: '#fff',
                                    marginTop: '10px'
                                }}>
                                {plano.quantidade_veiculos}
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    marginTop: '20px',
                                    backgroundColor: '#FF5252',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#ff1744'
                                    },
                                    borderRadius: '20px',
                                    padding: '10px 20px'
                                }}>
                                Escolher Plano
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

import { Box, Grid, Typography } from "@mui/material";
import { LocalOffer, AccessTime, DirectionsCar } from "@mui/icons-material"; // Ícones para melhorar a usabilidade visual

const darkColors = [
  "#D32F2F",
  "#C2185B",
  "#7B1FA2",
  "#512DA8",
  "#303F9F",
  "#1976D2",
  "#0288D1",
  "#0097A7",
  "#00796B",
  "#388E3C",
  "#689F38",
  "#AFB42B",
  "#FBC02D",
  "#FFA000",
  "#F57C00",
  "#E64A19",
  "#5D4037",
  "#616161",
  "#455A64",
  "#37474F",
];

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
}

export default function Planos({ plans }: Props) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: "50px",
        backgroundColor: "#f7f8fc",
      }}
    >
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: "40px",
          color: "#333",
        }}
      >
        Nossos Planos
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plano, index) => (
          <Grid item xs={12} sm={6} md={4} key={plano.id}>
            <Box
              sx={{
                backgroundColor: darkColors[index % darkColors.length],
                height: "350px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "16px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {plano.nome}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  marginTop: "10px",
                }}
              >
                <LocalOffer sx={{ marginRight: "8px" }} />
                <Typography variant="body1">{`R$ ${plano.valor}`}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  marginTop: "10px",
                }}
              >
                <AccessTime sx={{ marginRight: "8px" }} />
                <Typography variant="body2">{`Máx. de horas: ${plano.horas_maximas}`}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  marginTop: "10px",
                }}
              >
                <DirectionsCar sx={{ marginRight: "8px" }} />
                <Typography variant="body2">{`Veículos: ${plano.quantidade_veiculos}`}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

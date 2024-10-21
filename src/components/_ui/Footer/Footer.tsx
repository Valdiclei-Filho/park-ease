// components/_ui/Footer/index.js
import React from "react";
import { Box, Typography, Link } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "16px",
        textAlign: "center",
        position: "relative", // Mudança para relative
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Seu Nome. Todos os direitos
        reservados.
      </Typography>
      <Typography variant="body2">
        <Link href="#" color="inherit">
          Termos de Serviço
        </Link>
        {" | "}
        <Link href="#" color="inherit">
          Política de Privacidade
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;

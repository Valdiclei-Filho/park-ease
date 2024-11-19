// components/_ui/Footer/index.js
import React from "react";
import { Box, Typography, Link } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      className="footer"
      sx={{
        backgroundColor: "#021526", // Usando o tom mais escuro
        color: "#FFFFFF", // Texto branco
        padding: "16px",
        textAlign: "center",
        position: "relative", // Mantido como relative
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

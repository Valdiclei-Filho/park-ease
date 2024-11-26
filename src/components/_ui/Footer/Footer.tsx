import React from "react";
import { Box, Typography, Link } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      className="footer"
      sx={{
        backgroundColor: "#021526",
        color: "#FFFFFF",
        padding: "16px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Valdiclei. Todos os direitos
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

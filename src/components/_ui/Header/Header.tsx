"use client";

import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { AppUtils } from "@/shared";

const mainPages = [
  { name: "Estacionamento", path: AppUtils.ESTACIONAMENTO_PATH },
];

const cadastroPages = [
  { name: "Cadastro Carro", path: AppUtils.CARRO_CADASTRO_PATH },
  { name: "Cadastro Cliente", path: AppUtils.CLIENTE_PLANO_PATH },
];

const consultaPages = [
  { name: "Consulta Planos", path: AppUtils.PLANOS_PATH },
  { name: "Consulta Clientes", path: AppUtils.CARROS_PATH },
  { name: "Consulta Cores", path: AppUtils.CORES_PATH },
  { name: "Consulta Modelos", path: AppUtils.CARROS_MODELOS_PATH },
];

function ResponsiveAppBar() {
  const [anchorElCadastro, setAnchorElCadastro] =
    React.useState<null | HTMLElement>(null);
  const [anchorElConsulta, setAnchorElConsulta] =
    React.useState<null | HTMLElement>(null);

  const handleOpenCadastroMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCadastro(event.currentTarget);
  };

  const handleCloseCadastroMenu = () => {
    setAnchorElCadastro(null);
  };

  const handleOpenConsultaMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElConsulta(event.currentTarget);
  };

  const handleCloseConsultaMenu = () => {
    setAnchorElConsulta(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#021526" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            href={AppUtils.ESTACIONAMENTO_PATH}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#FFFFFF",
            }}
          >
            <img
              src="/img/icon-96.png"
              alt=""
              width="60"
              height="60"
              style={{ marginRight: "8px" }}
            />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {mainPages.map((page) => (
              <Button key={page.name} sx={{ color: "#FFFFFF" }}>
                <Link
                  href={page.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
            <Button sx={{ color: "#FFFFFF" }} onClick={handleOpenCadastroMenu}>
              Cadastro
            </Button>
            <Menu
              anchorEl={anchorElCadastro}
              open={Boolean(anchorElCadastro)}
              onClose={handleCloseCadastroMenu}
            >
              {cadastroPages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseCadastroMenu}>
                  <Link
                    href={page.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
            <Button sx={{ color: "#FFFFFF" }} onClick={handleOpenConsultaMenu}>
              Consulta
            </Button>
            <Menu
              anchorEl={anchorElConsulta}
              open={Boolean(anchorElConsulta)}
              onClose={handleCloseConsultaMenu}
            >
              {consultaPages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseConsultaMenu}>
                  <Link
                    href={page.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            ParkEase
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

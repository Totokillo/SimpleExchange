import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { ConnectW } from "../components/ConnectW";
import Alert from "@mui/material/Alert";
const pages = ["Swap", "Farms", "Pools"];
localStorage.removeItem("id");
const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [Login, setLogin] = React.useState(
    JSON.parse(localStorage.getItem("StatusLogin"))
  );
  const [Alerts, setAlerts] = React.useState(
    JSON.parse(localStorage.getItem("StatusAlert"))
  );
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const customTheme = createTheme({
    palette: {
      secondary: {
        main: "#2E0249",
        contrastText: "#FFFFF",
      },
    },
  });
  const handleStatusOut = () => {
    setLogin(false);
    localStorage.setItem("StatusLogin", JSON.stringify(false));
    localStorage.setItem("StatusAlert", JSON.stringify(false));
    window.location.reload(false);
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#C21010",
    "&:hover": {
      backgroundColor: "#E64848",
    },
  }));

  return (
    <ThemeProvider theme={customTheme}>
      <AppBar position="static" color={"secondary"}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CurrencyExchangeIcon
              sx={{
                display: { xs: "none", md: "flex", color: "white" },
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/Swap"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              EXCHANGE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: "#ffffff" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu} href={page}>
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 1,
                        display: "block",
                      }}
                      href={page}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <CurrencyExchangeIcon
              sx={{
                display: { xs: "flex", md: "none", color: "white" },
                mr: 1,
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              EXCHANGE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 3, color: "white", display: "block" }}
                  href={page}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ width: "auto", flexGrow: 0, justifyContent: "center" }}>
              {Login ? (
                <ColorButton
                  sx={{ minWidth: 150 }}
                  onClick={() => handleStatusOut()}
                >
                  Disconnect
                </ColorButton>
              ) : (
                <ConnectW />
              )}
            </Box>
          </Toolbar>
        </Container>
        {Alerts ? (
          <Alert
          autoHideDuration={1000}
            severity="success"
            sx={{
              display: "flex-box",
            }}
            onClose={() => {
              setAlerts(false);
              localStorage.setItem("StatusAlert", JSON.stringify(false));
            }}
          >
            Welcome To Exchange
          </Alert>
        ) : null}
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;

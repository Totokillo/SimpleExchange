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
import { createTheme, ThemeProvider} from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { ConnectW } from "../components/ConnectW";
const pages = ["Swap", "Farms", "Pools"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [Login, setLogin] = React.useState(JSON.parse(localStorage.getItem("StatusLogin")));
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const customTheme = createTheme({
    palette: {
      secondary: {
        main: "#85F4FF",
        contrastText: "#00000",
      },
    },
  });
  const handleStatusOut = () => {
    setLogin(false);
    localStorage.setItem("StatusLogin", JSON.stringify(false));
    window.location.reload(false);
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#42C2FF",
    "&:hover": {
      backgroundColor: "#85F4FF",
    },
  }));

  return (
    <ThemeProvider theme={customTheme}>
      <AppBar position="static" color={"secondary"}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CurrencyExchangeIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
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
                color: "inherit",
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
                <MenuIcon />
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
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu} href={page}>
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 1, color: "#000000", display: "block" }}
                      href={page}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <CurrencyExchangeIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
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
                color: "inherit",
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
                  sx={{ my: 3, color: "#000000", display: "block" }}
                  href={page}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ width: "auto", flexGrow: 0, justifyContent: "center" }}>{Login ? (
        <ColorButton sx={{ minWidth: 150 }} onClick={() => handleStatusOut()}>
          LogOut
        </ColorButton>
      ) : (
        <ConnectW/>
      )}
             
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;

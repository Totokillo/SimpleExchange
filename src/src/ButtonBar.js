import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Button from "@mui/material/Button";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Fab from "@mui/material/Fab";

export default function Footer() {
  const customTheme = createTheme({
    palette: {
      duio: {
        main: "#000000",
        contrastText: "#e8e0e0 ",
      },
      secondary: {
        main: "#4C3575",
      },
    },
  });
  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#42C2FF",
    "&:hover": {
      backgroundColor: "#85F4FF",
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#42C2FF",
    "&:hover": {
      backgroundColor: "#85F4FF",
    },
  }));
  return (
    <ThemeProvider theme={customTheme}>
      <React.Fragment>
        <AppBar
          position="fixed"
          color="duio"
          sx={{ top: "auto", bottom: 0, height: "10vh" }}
        >
          <Toolbar>
            <div className="container">
              <div className="row ">
                <div className="col">
                  <Fab color="secondary" aria-label="add">
                    <YouTubeIcon />
                  </Fab>
                </div>
              </div>
            </div>
            &nbsp;
            <div className="container">
              <div className="row ">
                <div className="col ">
                  <Fab color="secondary" aria-label="add">
                    <TwitterIcon />
                  </Fab>
                </div>
              </div>
            </div>
            &nbsp;
            <div className="container">
              <div className="row ">
                <div className="col ">
                  <Fab color="secondary" aria-label="add">
                    <FacebookIcon />
                  </Fab>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </ThemeProvider>
  );
}

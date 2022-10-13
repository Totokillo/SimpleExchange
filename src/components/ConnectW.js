import React, { useState } from "react";
import MetamaskLogo from "../src/asset/MetamaskLogo";
import Card from "@mui/material/Card";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
export const ConnectW = () => {

    const [open, setOpen] = useState(false);
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: "#42C2FF",
        "&:hover": {
          backgroundColor: "#85F4FF",
        },
      }));
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    function SimpleDialog(props) {
      const [coins, setCoins] = useState([]);

      const { onClose, selectedValue, open } = props;

      const handleClose = () => {
        onClose(selectedValue);
      };
      var cardStyle = {
        display: "block",
        width: "10vw",
        transitionDuration: "0.3s",
        height: "12vw",
      };
      return (
        <Dialog onClose={handleClose} open={open} maxWidth="sm">
          <DialogTitle style={{ textAlign: "center" }}><h2>Connect Wallet</h2></DialogTitle>
          <Container style={{ textAlign: "center" }}>
            <DialogContent>
              <Card style={cardStyle}>
              <h3> Metamask </h3>
                <Button variant="text">
                  <MetamaskLogo />
                </Button>
              </Card>
            </DialogContent>
          </Container>
        </Dialog>
      );
    }
    return (
      <div>
        <ColorButton variant="contained" fullWidth onClick={handleClickOpen}>
          Connect Wallet
        </ColorButton>
        <SimpleDialog open={open} onClose={handleClose} />
      </div>
    );
}

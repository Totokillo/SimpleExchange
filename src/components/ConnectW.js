import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Alert from "@mui/material/Alert";
export const ConnectW = () => {
  const [Login, setLogin] = useState(false);
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

  const handleStatus = () => {
    setLogin(true);
    localStorage.setItem("StatusLogin", JSON.stringify(true));
    localStorage.setItem("StatusAlert", JSON.stringify(true));
    setOpen(false);
    window.location.reload(false);
  };

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle style={{ textAlign: "center" }}>
          <h2>Connect Wallet</h2>
        </DialogTitle>
        <Container style={{ textAlign: "center" }}>
          <DialogContent>
            <Card sx={{ maxWidth: 450 }} variant="outlined">
              {" "}
              <h3> Metamask </h3>
              <Button sx={{ minWidth: 150 }} onClick={() => handleStatus()}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" />
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
};

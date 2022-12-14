import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ConnectW } from "../components/ConnectW";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [],
  };
}
function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}
const rows = [
  createData("USDT-BSW", 44.44, 36.76, 11531680, 0),
  createData("BNB-BSW", 37.65, 31.93, 7625131, 0),
  createData("BFG-BSW", 49.3, 40.08, 911371, 0),
  createData("CBNB-USDT", 14.98, 13.96, 36459244, 0),
  createData("BNB-BUSD", 17.0, 15.7, 36442160, 0),
];

export default function Farm() {
  const [Login] = React.useState(
    JSON.parse(localStorage.getItem("StatusLogin"))
  );
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#42C2FF",
    "&:hover": {
      backgroundColor: "#85F4FF",
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#C21010",
    "&:hover": {
      backgroundColor: "#E64848",
    },
  }));
  const ColorButton3 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#2B7A0B",
    "&:hover": {
      backgroundColor: "#7DCE13",
    },
  }));

  const Popup4 = (name, stake, color, label, colors) => {
    const [open, setOpen] = useState(false);
    const [alerts, setAlert] = useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const handleClick = (Transition) => {
      setTransition(() => Transition);
      setAlert(true);setOpen(false)
    };
  
    const Closes = () => {
  
      setAlert(false);
    };
    function SimpleDialog(props) {
      const { onClose, selectedValue, open } = props;
      const handleClose = () => {
        onClose(selectedValue);
      };

      return (
        <Dialog onClose={handleClose} open={open} maxWidth="sm">

          <Container style={{ textAlign: "center" }}>
            <DialogContent>
              <Card sx={{ maxWidth: 500 }} variant="outlined">
                <CardContent>
                <h2>{stake}</h2>
                  <FormControl sx={{ mt: 6, width: "35ch" }} variant="outlined">
                    <TextField
                      id="input-with-icon-textfield"
                      label={label}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {name}
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                  </FormControl>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      p: 1,
                      m: 1,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    {Login ? (
                      colors == 1 ? (
                        <div>
                          <ColorButton
                            sx={{ minWidth: 150 }}
                            onClick={() => handleClick(TransitionLeft)}
                          >
                            {stake}
                          </ColorButton>
                        </div>
                      ) : (
                        <div>
                          <ColorButton2
                            sx={{ minWidth: 150 }}
                            onClick={() => handleClick(TransitionLeft)}
                          >
                            {stake}
                          </ColorButton2>
                        </div>
                      )
                    ) : (
                      <ConnectW />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </DialogContent>
          </Container>
        </Dialog>
      );
    }
    return colors == 1 ? (
      <div>
        <ColorButton
          variant="contained"
          color={color}
          onClick={handleClickOpen}
        >
          {stake}
        </ColorButton>
        <SimpleDialog open={open} onClose={handleClose} />  <Snackbar
     
     open={alerts}
     onClose={Closes}
     autoHideDuration={1000}
     TransitionComponent={transition}
     key={transition ? transition.name : ''}
   >
     <Alert severity="success"> {stake} Success</Alert>
   </Snackbar>
      </div>
    ) : (
      <div>
        <ColorButton2
          variant="contained"
          color={color}
          onClick={handleClickOpen}
        >
          {stake}
        </ColorButton2>
        <SimpleDialog open={open} onClose={handleClose} />  <Snackbar
     
     open={alerts}
     onClose={Closes}
     autoHideDuration={1000}
     TransitionComponent={transition}
     key={transition ? transition.name : ''}
   >
     <Alert severity="error"> {stake} Success</Alert>
   </Snackbar>
      
      </div>
    );
  };

  const Popup5 = (stake, color, label) => {
    const [open, setOpen] = useState(false);
    const [alerts, setAlert] = useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleClick = (Transition) => {
      setTransition(() => Transition);
      setAlert(true);setOpen(false)
    };
  
    const Closes = () => {
      setAlert(false);
    };
    function SimpleDialog(props) {
      const { onClose, selectedValue, open } = props;
      const handleClose = () => {
        onClose(selectedValue);
      };

    

      return (
        <Dialog onClose={handleClose} open={open} maxWidth="sm">
          <Container style={{ textAlign: "center" }}>
            <DialogContent>
              <Card sx={{ maxWidth: 500 }} variant="outlined">
                <CardContent>
                <h2>{stake}</h2>
                  <FormControl sx={{ mt: 6, width: "35ch" }} variant="outlined">
                    <TextField
                      id="outlined-basic"
                      label={label}
                      disabled={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">0.00</InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">ETC</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  </FormControl>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      p: 1,
                      m: 1,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    {Login ? (
                      <div>
                        <ColorButton3
                          sx={{ minWidth: 150 }}
                          onClick={() => handleClick(TransitionLeft)}
                        >
                          {stake}
                        </ColorButton3>
                      </div>
                    ) : (
                      <ConnectW />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </DialogContent>
          </Container>
        </Dialog>
      );
    }
    return (
      <div>
        <ColorButton3
          variant="contained"
          color={color}
          onClick={handleClickOpen}
        >
          {stake}
        </ColorButton3>
        <SimpleDialog open={open} onClose={handleClose} />
        <Snackbar
     
     open={alerts}
     onClose={Closes}
     autoHideDuration={1000}
     TransitionComponent={transition}
     key={transition ? transition.name : ''}
   >
     <Alert severity="success"> {stake} Success</Alert>
   </Snackbar>
      </div>
    );
  };

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      const coin = rows[0].name.split("-");
      console.log(coin[0]);
    };

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ flexGrow: 1, mt: 1 }}>
                <Grid container spacing={0}>
                  <Grid
                    md
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button variant="outlined" href={"Pools"}>
                      Get LP
                    </Button>
                  </Grid>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <Grid xs alignItems="center">
                    Available
                    <br />
                    LP 0.0000 <br />
                    LP $0.0000
                  </Grid>
                  <Grid sm alignItems="center">
                    Staked LPs
                    <br />
                    LP 0.0000 <br />
                  </Grid>
                  &nbsp; &nbsp;
                  <Box sx={{ flexGrow: 0 }}>
                    <Grid
                      md
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {Login ? (
                        <div>
                          {Popup4(
                            row.name,
                            "Stake",
                            "primary",
                            "LP Token Available",
                            1
                          )}
                          &nbsp;
                          {Popup4(
                            row.name,
                            "UnStake",
                            "error",
                            "Staked LP Tokens",
                            2
                          )}
                        </div>
                      ) : (
                        <ConnectW />
                      )}
                    </Grid>{" "}
                  </Box>
                  &nbsp; &nbsp;
                  <Grid
                    sm
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {Popup5("Harvest", "success", "Claimable Reward")}
                  </Grid>
                  &nbsp; &nbsp; &nbsp;
                  <Grid sm alignItems="center">
                    Earned
                    <br />
                    0.0000 ETC
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ flexGrow: 1, mt: 1 }}></Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#371B58",
        flexGrow: 1,
        height: "820px",
        overflow: "auto",
      }}
    >
      <Container maxWidth="auto">
        <Stack spacing>
          <br />
          <Card sx={{ minWidth: "auto" }}>
            <CardContent>
              <Typography sx={{ fontSize: 30 }}>Farms</Typography>
              <Typography variant="h6">Stake LP tokens to earn</Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: "auto" }}>
            <CardContent>
              <Grid container spacing={0}>
                <FormControl fullWidth sx={{ m: 1, width: "210ch" }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Search by name,symbol,or address
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <SearchIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                    }
                    label=" Search by name,symbol,or address"
                  />
                </FormControl>
              </Grid>
            </CardContent>
          </Card>
          <Grid container spacing={0}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Farms</TableCell>
                    <TableCell align="right">APY</TableCell>
                    <TableCell align="right">APR</TableCell>
                    <TableCell align="right">Liquldlty</TableCell>
                    <TableCell align="right">Earned</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <br />
        </Stack>
      </Container>
    </Box>
  );
}

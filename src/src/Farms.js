import * as React from "react";
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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ConnectW } from "../components/ConnectW";
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
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
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
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ flexGrow: 1 , mt:1 }}>
              <Grid container spacing={0}>
                <Grid
                  xs
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button variant="outlined">Get LP</Button>
                </Grid>
                <Grid xs alignItems="center">
                  Available
                  <br />
                  LP 0.0000 <br />
                  LP $0.0000
                </Grid>
                <Grid xs alignItems="center">
                  Staked LPs
                  <br />
                  LP 0.0000 <br />
                </Grid>
                <Grid
                  xs
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <ArrowForwardIosIcon />
                </Grid>
                <Grid
                  xs
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <ConnectW/>
                </Grid>
                <Grid
                  xs
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <ArrowForwardIosIcon />
                </Grid>
                <Grid
                  xs
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button variant="outlined" disabled>
                    Harvest
                  </Button>
                </Grid>
                <Grid xs alignItems="center">
                  Earned
                  <br />
                  0.0000 BSW
                  <br />
                  $0.0000
                </Grid>
              </Grid>
            </Box  >
            < Box sx={{ flexGrow: 1 , mt:1 }}>
              
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const rows = [
  createData("USDT-BSW", 44.44, 36.76, 11531680, 0),
  createData("BNB-BSW", 37.65, 31.93, 7625131, 0),
  createData("BFG-BSW", 49.3, 40.08, 911371, 0),
  createData("CBNB-USDT", 14.98, 13.96, 36459244, 0),
  createData("BNB-BUSD", 17.0, 15.7, 36442160, 0),
];

export default function Farm() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#B8FFF9",
        flexGrow: 1,
        height: "820px",
        overflow: "auto",
      }}
    >
      <Container maxWidth="auto">
        <Stack spacing>
          <Card sx={{ minWidth: "auto" }}>
            <CardContent>
              <Typography sx={{ fontSize: 30 }}>Farms</Typography>
              <Typography variant="h6">Stake LP tokens to earn</Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: "auto" }}>
            <CardContent>
              <Grid container spacing={0}>
                <Box
                  component="form"
                  sx={{
                    m: 1,
                    width: "auto",
                  }}
                >
                  <FormControl fullWidth sx={{ m: 1 , width: '210ch'}}>
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
                </Box>
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
        </Stack>
      </Container>
    </Box>
  );
}

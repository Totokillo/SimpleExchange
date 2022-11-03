import React, { useState, useEffect } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Chart from "./asset/chart";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TickerTape } from "react-ts-tradingview-widgets";
import DialogContent from "@mui/material/DialogContent";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
const theme = createTheme({
  typography: {
    body1: {
      color: "#FFFFFF",
    },
    h4: {
      color: "#FFFFFF",
    },
  },
});
const customTextF = createTheme({
  palette: {
    secondary: {
      main: "#FFFFFF",
    },
  },
});

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default function Swap() {
  const [coin, setCoin] = useState();
  const [coin2, setCoin2] = useState(false);
  const [coin3, setCoin3] = useState();
  const [chartFE, setchartFE] = useState(false);
  const [var1, setvar1] = useState(null);
  const [var2, setvar2] = useState(null);

  const fetchChartCoin = async (id) => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );

    setCoin(data);
  };

  const Popup1 = () => {
    const [coin, setCoin] = useState();
    const [open, setOpen] = useState(false);
    const [Selectcoin, setSelectcoin] = useState(null);
    const fetchCoin = async (id) => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );

      setCoin(data);
    };

    const handleClickOpen = () => {
      setOpen(true);
      setchartFE(false);
    };

    const handleClose = () => {
      setOpen(false);
    };

    function SimpleDialog(props) {
      const [coins, setCoins] = useState([]);
      const [loading, setLoading] = useState(false);
      const [search, setSearch] = useState("");
      const [page, setPage] = useState(1);

      const { onClose, selectedValue, open } = props;

      const handleClose = () => {
        onClose(selectedValue);

        setchartFE(true);
        //localStorage.removeItem("id");
      };

      const handleListItemClick = (value) => {
        onClose(value);
      };
      const fetchmarketCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=thb&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        //console.log(data);
        setCoins(data);
        setLoading(false);
      };
      useEffect(() => {
        fetchmarketCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

      const handleSelect = (value, value2) => {
        setchartFE(false);
        localStorage.removeItem("id");
        localStorage.setItem("id", JSON.stringify(value2));
        setSelectcoin(value);
        fetchCoin(value);
        setCoin2(value);
        fetchChartCoin(value);
        handleListItemClick();
        setchartFE(true);

        //window.location.reload(false);
      };

      return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
          <DialogTitle>Choose Coin </DialogTitle>
          <Container style={{ textAlign: "center" }}>
            <TextField
              label="Search For a Crypto Currency.."
              variant="outlined"
              style={{ marginBottom: 20, width: "100%" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer component={Paper}>
              <Box sx={{ flexGrow: 1 }}>
                {loading ? (
                  <LinearProgress style={{ backgroundColor: "gold" }} />
                ) : (
                  <Table aria-label="simple table">
                    <TableBody>
                      {handleSearch()
                        .slice((page - 1) * 9, (page - 1) * 9 + 9)
                        .map((row) => {
                          const profit = row.price_change_percentage_24h > 0;
                          return (
                            <Button
                              onClick={() => handleSelect(row.id, row.symbol)}
                              style={{
                                maxWidth: "370px",
                                maxHeight: "300px",
                                minWidth: "370px",
                                minHeight: "220px",
                              }}
                              variant="outlined"
                            >
                              <TableRow className={row} key={row.name}>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  style={{
                                    display: "flex",
                                    gap: 15,
                                  }}
                                >
                                  <img
                                    src={row?.image}
                                    alt={row.name}
                                    height="50"
                                    style={{ marginBottom: 10 }}
                                  />

                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <span
                                      style={{
                                        textTransform: "uppercase",
                                        fontSize: 22,
                                      }}
                                    >
                                      {row.symbol}
                                    </span>
                                    <span style={{ color: "darkgrey" }}>
                                      {row.name}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{
                                    fontWeight: 500,
                                  }}
                                >
                                  Price{" "}
                                  {numberWithCommas(
                                    row.current_price.toFixed(2)
                                  )}{" "}
                                  ฿
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{
                                    color:
                                      profit > 0 ? "rgb(14, 203, 129)" : "red",
                                    fontWeight: 500,
                                  }}
                                >
                                  24h
                                  <br />
                                  change {profit && "+"}
                                  {row.price_change_percentage_24h.toFixed(2)}%
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{
                                    fontWeight: 500,
                                  }}
                                >
                                  Market Cap{" "}
                                  {numberWithCommas(
                                    row.market_cap.toString().slice(0, -6)
                                  )}{" "}
                                  M
                                </TableCell>
                              </TableRow>
                            </Button>
                          );
                        })}
                    </TableBody>
                  </Table>
                )}
              </Box>
            </TableContainer>

            {/* Comes from @material-ui/lab */}
            <Pagination
              count={(handleSearch()?.length / 10).toFixed(0)}
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
              }}
            />
          </Container>
        </Dialog>
      );
    }

    return (
      <div>
        <IconButton onClick={handleClickOpen} sx={{ p: 0 }}>
          <Avatar
            aria-label="recipe"
            sx={{ bgcolor: "#371B58", width: 24, height: 24 }}
          >
            {Selectcoin ? (
              <img src={coin?.image.thumb} loading="lazy" />
            ) : (
              <CurrencyExchangeIcon sx={{ color: "#FFFFFF" }} />
            )}
          </Avatar>{" "}
          <ArrowDropDownIcon sx={{ color: "#FFFFFF" }} />
        </IconButton>
        <SimpleDialog open={open} onClose={handleClose} />
      </div>
    );
  };
  const Popup2 = () => {
    const [coin, setCoin] = useState();
    const [open, setOpen] = useState(false);
    const [Selectcoin, setSelectcoin] = useState(null);
    const fetchCoin = async (id) => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoin3(data);
      setCoin(data);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    function SimpleDialog(props) {
      const [coins, setCoins] = useState([]);
      const [loading, setLoading] = useState(false);
      const [search, setSearch] = useState("");
      const [page, setPage] = useState(1);

      const { onClose, selectedValue, open } = props;

      const handleClose = () => {
        onClose(selectedValue);
        //localStorage.removeItem("id");
      };

      const handleListItemClick = (value) => {
        onClose(value);
      };
      const fetchmarketCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=thb&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        //console.log(data);
        setCoins(data);
        setLoading(false);
      };
      useEffect(() => {
        fetchmarketCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

      const handleSelect = (value) => {
        setSelectcoin(value);
        fetchCoin(value);
        handleListItemClick();
        //window.location.reload(false);
      };

      return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
          <DialogTitle>Choose Coin </DialogTitle>
          <Container style={{ textAlign: "center" }}>
            <TextField
              label="Search For a Crypto Currency.."
              variant="outlined"
              style={{ marginBottom: 20, width: "100%" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer component={Paper}>
              <Box sx={{ flexGrow: 1 }}>
                {loading ? (
                  <LinearProgress style={{ backgroundColor: "gold" }} />
                ) : (
                  <Table aria-label="simple table">
                    <TableBody>
                      {handleSearch()
                        .slice((page - 1) * 9, (page - 1) * 9 + 9)
                        .map((row) => {
                          const profit = row.price_change_percentage_24h > 0;
                          return (
                            <Button
                              onClick={() => handleSelect(row.id)}
                              style={{
                                maxWidth: "370px",
                                maxHeight: "300px",
                                minWidth: "370px",
                                minHeight: "220px",
                              }}
                              variant="outlined"
                            >
                              <TableRow className={row} key={row.name}>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  style={{
                                    display: "flex",
                                    gap: 15,
                                  }}
                                >
                                  <img
                                    src={row?.image}
                                    alt={row.name}
                                    height="50"
                                    style={{ marginBottom: 10 }}
                                  />

                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <span
                                      style={{
                                        textTransform: "uppercase",
                                        fontSize: 22,
                                      }}
                                    >
                                      {row.symbol}
                                    </span>
                                    <span style={{ color: "darkgrey" }}>
                                      {row.name}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{
                                    fontWeight: 500,
                                  }}
                                >
                                  Price{" "}
                                  {numberWithCommas(
                                    row.current_price.toFixed(2)
                                  )}{" "}
                                  ฿
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{
                                    color:
                                      profit > 0 ? "rgb(14, 203, 129)" : "red",
                                    fontWeight: 500,
                                  }}
                                >
                                  24h
                                  <br />
                                  change {profit && "+"}
                                  {row.price_change_percentage_24h.toFixed(2)}%
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{
                                    fontWeight: 500,
                                  }}
                                >
                                  Market Cap{" "}
                                  {numberWithCommas(
                                    row.market_cap.toString().slice(0, -6)
                                  )}{" "}
                                  M
                                </TableCell>
                              </TableRow>
                            </Button>
                          );
                        })}
                    </TableBody>
                  </Table>
                )}
              </Box>
            </TableContainer>

            {/* Comes from @material-ui/lab */}
            <Pagination
              count={(handleSearch()?.length / 10).toFixed(0)}
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
              }}
            />
          </Container>
        </Dialog>
      );
    }

    return (
      <div>
        <IconButton onClick={handleClickOpen} sx={{ p: 0 }}>
          <Avatar
            aria-label="recipe"
            sx={{ bgcolor: "#371B58", width: 24, height: 24 }}
          >
            {Selectcoin ? (
              <img src={coin?.image.thumb} loading="lazy" />
            ) : (
              <CurrencyExchangeIcon sx={{ color: "#FFFFFF" }} />
            )}
          </Avatar>{" "}
          <ArrowDropDownIcon sx={{ color: "#FFFFFF" }} />
        </IconButton>
        <SimpleDialog open={open} onClose={handleClose} />
      </div>
    );
  };
  const Popup4 = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      //window.location.reload(false);
    };
    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#42C2FF",
      "&:hover": {
        backgroundColor: "#85F4FF",
      },
    }));
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
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: "120" }}
                  >
                    <Typography>
                      <h4>Transection Success</h4>
                    </Typography>
                    <DoneOutlineIcon sx={{ color: "#54B435", fontSize: 120 }} />
                  </Grid>

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
                    <ColorButton
                      sx={{ minWidth: 150 }}
                      onClick={() => handleClose()}
                    >
                      Ok
                    </ColorButton>
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
        <ColorButton
          variant="contained"
          disabled={var1 || var2 ? false : true}
          onClick={handleClickOpen}
        >
          EXCHANGE
        </ColorButton>
        <SimpleDialog open={open} onClose={handleClose} />
      </div>
    );
  };
  const handleChange = (event) => {
    setvar1(null);
    setvar2(null);
    const result =
      (parseFloat(event.target.value, 10) *
        coin?.market_data.current_price.thb) /
      coin3?.market_data.current_price.thb;
    setvar2(result);
  };
  const handleChange2 = (event) => {
    setvar1(null);
    setvar2(null);
    const result =
      (parseFloat(event.target.value, 10) *
        coin3?.market_data.current_price.thb) /
      coin?.market_data.current_price.thb;
    setvar1(result);
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#371B58",
        flexGrow: 1,
        height: "820px",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="xl" sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={8} lg={5}>
          <Paper
            elevation={0}
            maxWidth
            sx={{
              backgroundColor: "#2E0249",

              height: 46,
            }}
          >
            <Box sx={{ maxWidth: 2450 }}>
              <TickerTape
                colorTheme="dark"
                displayMode="regular"
                symbols={[
                  {
                    proName: "BITKUB:KUBTHB",
                    title: "Bitkub",
                  },
                  {
                    proName: "BITKUB:ETHTHB",
                    title: "Ethereum",
                  },
                  {
                    proName: "BITKUB:BTCTHB",
                    title: "Bitcoin",
                  },
                  {
                    proName: "BITKUB:LUNATHB",
                    title: "Luna",
                  },
                  {
                    proName: "BITKUB:USDTTHB",
                    title: "USDT",
                  },
                ]}
              ></TickerTape>
            </Box>
          </Paper>
        </Grid>
        <Grid container spacing={0}>
          {/* Chart */}
          <Grid item xs={12} md={7} lg={9}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#371B58",
                justifyContent: "center",
                p: 2,
                display: "block",
                flexDirection: "column",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "#2E0249",
                  maxWidth: "auto",
                  height: 500,
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" sx={{ bgcolor: "#2E0249" }}>
                      {coin?.image.small ? (
                        <img
                          src={`${coin?.image.small}`}
                          loading="lazy"
                          sx={{ width: 50, height: 50 }}
                        />
                      ) : (
                        <img src="https://www.colorabout.com/images/color/rgb/46-2-73.jpg?v=1" />
                      )}
                    </Avatar>
                  }
                  title={
                    <ThemeProvider theme={theme}>
                      <Typography variant="body1">
                        {coin2 ? coin?.name : null}
                      </Typography>
                    </ThemeProvider>
                  }
                />
                <CardContent>
                  {chartFE ? (
                    <Chart />
                  ) : (
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justify="center"
                      style={{ minHeight: "120vh" }}
                    >
                      <Grid item xs={3}>
                        <ThemeProvider theme={theme}>
                          <Typography variant="body1">
                            <h3> Plsese select Coin </h3>
                          </Typography>
                        </ThemeProvider>
                        <QueryStatsIcon
                          sx={{ color: "#FFFFFF", fontSize: 240 }}
                        />
                      </Grid>
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={5} lg={2} alignItems="center" justify="center">
            <Paper
              elevation={0}
              sx={{
                width: "40ch",
                backgroundColor: "#371B58",
                justifyContent: "center",
                p: 2,
                display: "block",
                height: 500,
              }}
            >
              <Card
                sx={{
                  maxWidth: 500,
                  height: 500,
                  backgroundColor: "#2E0249",
                }}
              >
                <CardHeader
                  title={
                    <ThemeProvider theme={theme}>
                      <Typography variant="h4">Swap</Typography>
                    </ThemeProvider>
                  }
                />
                <CardContent sx={{ bgcolor: "#2E0249" }}>
                  <FormControl
                    sx={{ mt: 6, width: "35ch", bgcolor: "#2E0249" }}
                    variant="outlined"
                  >
                    <ThemeProvider theme={customTextF}>
                      <TextField
                        id="input-with-icon-textfield"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {Popup1()}
                            </InputAdornment>
                          ),
                          inputmode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        variant="outlined"
                        sx={{ input: { color: "white" } }}
                        color="secondary"
                        focused
                        type="number"
                        value={var1}
                        disabled={coin ? false : true}
                        onChange={handleChange}
                      />
                    </ThemeProvider>
                  </FormControl>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pt: 0,
                      mt: 3,
                      bgcolor: "#2E0249",
                      borderRadius: 1,
                    }}
                  >
                    <SwapVertIcon sx={{ fontSize: 40, color: "white" }} />
                  </Box>
                  <FormControl sx={{ mt: 5, width: "35ch" }} variant="outlined">
                    <ThemeProvider theme={customTextF}>
                      <TextField
                        id="input-with-icon-textfield"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {Popup2()}
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        sx={{ input: { color: "white" } }}
                        color="secondary"
                        focused
                        type="number"
                        disabled={coin3 ? false : true}
                        value={var2}
                        onChange={handleChange2}
                      />
                    </ThemeProvider>
                  </FormControl>
                </CardContent>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 1,
                    m: 1,
                    bgcolor: "#2E0249",
                    borderRadius: 1,
                  }}
                >
                  {Popup4()}
                </Box>
              </Card>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} lg={5}>
          <Paper
            elevation={0}
            maxWidth
            sx={{
              backgroundColor: "#371B58",

              height: 80,
            }}
          ></Paper>
        </Grid>
      </Container>
    </Box>
  );
}

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import UseAxios from "../src/api/UseAxios";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Box from "@mui/material/Box";
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Popup() {
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
  };

  const handleClose = (value) => {
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
                                {numberWithCommas(row.current_price.toFixed(2))}{" "}
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
          sx={{ bgcolor: "#FFFFFF", width: 24, height: 24 }}
        >
          {Selectcoin ? (
            <img src={coin?.image.thumb} loading="lazy" />
          ) : (
            <CurrencyExchangeIcon sx={{ color: "#000" }} />
          )}
        </Avatar>
      </IconButton>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}

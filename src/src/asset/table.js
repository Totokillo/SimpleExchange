import React, { useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Container from "@mui/material/Container";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import { ConnectW } from "../../components/ConnectW";
import AddIcon from "@mui/icons-material/Add";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import OutlinedInput from "@mui/material/OutlinedInput";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}
    function TransitionLeft(props) {
      return <Slide {...props} direction="right" />;
    }

const rows = [
  createData("BTC-ETC", 0, 0, 0),
  createData("BTC-ETC", 0, 0, 0),
  createData("BTC-ETC", 0, 0, 0),
  createData("BTC-ETC", 0, 0, 0),
  createData("BTC-ETC", 0, 0, 0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Pool",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Liquidity",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Volume(24H)",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "APR",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [Login] = React.useState(
    JSON.parse(localStorage.getItem("StatusLogin"))
  );
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const Popup3 = () => {
    const [open, setOpen] = useState(false);
    const [alerts, setAlert] = useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#42C2FF",
      "&:hover": {
        backgroundColor: "#85F4FF",
      },
    }));
    const handleClick = (Transition) => {
      setTransition(() => Transition);
      setAlert(true);setOpen(false)
    };
  
    const handleCloses = () => {
  
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
                  <h2>ADD LP</h2>
                  <FormControl sx={{ mt: 6, width: "35ch" }} variant="outlined">
                    <TextField
                      id="input-with-icon-textfield"
                      label="Input"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">BTC</InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                  </FormControl>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pt: 5,
                      mt: 1,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <AddIcon sx={{ fontSize: 45 }} />
                  </Box>
                  <FormControl sx={{ mt: 5, width: "35ch" }} variant="outlined">
                    <TextField
                      id="input-with-icon-textfield"
                      label="Input"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">ETC</InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                  </FormControl>
                </CardContent>

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
                      <ColorButton
                        sx={{ minWidth: 150 }}
                        onClick={() => handleClick(TransitionLeft)}
                      >
                        Add LP
                      </ColorButton>
                    </div>
                  ) : (
                    <ConnectW />
                  )}
                </Box>
              </Card>
            </DialogContent>
          </Container>
        </Dialog>
      );
    }
    return (
      <div>
        <ColorButton variant="contained" onClick={handleClickOpen}>
          Add LP
        </ColorButton>
        <SimpleDialog open={open} onClose={handleClose} />
        <Snackbar
     
          open={alerts}
          onClose={handleCloses}
          autoHideDuration={1000}
          TransitionComponent={transition}
          key={transition ? transition.name : ''}
        >
          <Alert severity="success">Add LP Success</Alert>
        </Snackbar>
      </div>
    );
  };
  const Popup4 = () => {
    const [open, setOpen] = useState(false);
    const [alerts, setAlert] = useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const ColorButton2 = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#C21010",
      "&:hover": {
        backgroundColor: "#E64848",
      },
    }));
    const handleClick = (Transition) => {
      setTransition(() => Transition);
      setAlert(true);setOpen(false)
    };
  
    const handleCloses = () => {
  
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
                  <h2>REMOVE LP</h2>
                  <FormControl sx={{ mt: 6, width: "35ch" }} variant="outlined">
                    <TextField
                      id="input-with-icon-textfield"
                      label="Your LP Tokens"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            BTC-ETC
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                    <br />

                    <ToggleButtonGroup
                      color="primary"
                      fullWidth
                      exclusive
                      value={alignment}
                      onChange={handleAlignment}
                    >
                      <ToggleButton
                        size="large"
                        value="left"
                        aria-label="left aligned"
                      >
                        25%
                      </ToggleButton>
                      <ToggleButton
                        size="large"
                        value="center"
                        aria-label="centered"
                      >
                        50%
                      </ToggleButton>
                      <ToggleButton
                        size="large"
                        value="right"
                        aria-label="right aligned"
                      >
                        75%
                      </ToggleButton>
                      <ToggleButton
                        size="large"
                        value="justify"
                        aria-label="justified"
                      >
                        MAX
                      </ToggleButton>
                    </ToggleButtonGroup>
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
                    <ArrowDownwardIcon />
                  </Box>

                  <FormControl sx={{ m: 1, width: "37ch" }} variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      defaultValue={"0.00"}
                      fullWidth
                      disabled
                      endAdornment={
                        <InputAdornment position="end">BTC</InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        p: 1,

                        bgcolor: "background.paper",
                        borderRadius: 1,
                      }}
                    >
                      <AddIcon sx={{ fontSize: 25 }} />
                    </Box>
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      defaultValue={"0.00"}
                      fullWidth
                      disabled
                      endAdornment={
                        <InputAdornment position="end">ETC</InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
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
                        <ColorButton2
                          sx={{ minWidth: 150 }}
                          onClick={() => handleClick(TransitionLeft)}
                        >
                          Remove LP
                        </ColorButton2>
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
        <ColorButton2 variant="contained" onClick={handleClickOpen}>
          Remove LP
        </ColorButton2>
        <SimpleDialog open={open} onClose={handleClose} />
        <Snackbar
          open={alerts}
          onClose={handleCloses}
          autoHideDuration={1000}
          TransitionComponent={transition}
          key={transition ? transition.name : ''}
        ><Alert severity="error">Remove LP Success</Alert>
        </Snackbar>
      </div>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="center"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                      <TableCell>
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={1}>
                            {Popup3()}
                            <br />
                            &nbsp;
                            {Popup4()}
                          </Grid>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

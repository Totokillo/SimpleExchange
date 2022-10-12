import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import EnhancedTable from "./asset/table";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function Pool() {
  
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
              <Typography sx={{ fontSize: 30 }}>Pool</Typography>
              <Typography variant="h6">
                Just stake some tokens to earn.
              </Typography>
              <Typography variant="h6">High Apr,Low risk</Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: "auto" }}>
            <CardContent>
              <Grid container spacing={0}>
                
                  <FormControl fullWidth sx={{ m: 1 , width: '210ch'}}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Search 
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <SearchIcon
                          sx={{ color: "action.active", mr: 1, my: 0.5 }}
                        />
                      }
                      label=" Search "
                    />
                  </FormControl>
                
                </Grid>
            </CardContent>
          </Card>
          <Grid container spacing={0}>
                <EnhancedTable/>

          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

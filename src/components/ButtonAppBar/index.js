import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useRef } from 'react';


// https://mui.com/pt/components/app-bar/

export default function ButtonAppBar(props) {
  const token = "b41e25882385ee402f115680cb550c54";
  const username = props.username;

  const valueRef = useRef('');

  //https://stackoverflow.com/questions/29791721/how-get-data-from-material-ui-textfield-dropdownmenu-components
  const sendValue = () => {
    let city = valueRef.current.value;
    //Primeiro dar get para ver se existe:
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${token}`)
    .then((response) => {
      if (response.data.code === "404") {
        return; //Caso cidade nao exista, nao faca nada
      }
      else {
        city = response.data.name
      }
      axios
      .get(`https://morning-temple-71197.herokuapp.com/api/user/${username}/`)
      .then((response) => {
        const lsCities = response.data.cities;



      console.log("aaa");
      console.log(lsCities);
      lsCities.push(city);
      axios
      .post(`https://morning-temple-71197.herokuapp.com/api/user/${username}/`, {
        "cities": lsCities
    })
    .then((response) => window.location.reload())
  }
  );
  })
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: " #ad741f"}}>
        <Toolbar sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Box
              component="img"
              sx={{
              height: 60,
              // width: auto,
              margin: 1,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              }}
              alt="Logo"
              src="/coffee.png"
              />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Your Morning Coffee
            </Typography>
          </Box>
            <Box sx={{width: 500,
            display: "flex",
            flexDirection: "row",
            }}>


            <TextField fullWidth={true} id="filled-basic" label="Type a city..." variant="filled" className="citySearch" inputRef={valueRef}/>
            <Button color="inherit" onClick={
              sendValue}>
              Add
              </Button>
              </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

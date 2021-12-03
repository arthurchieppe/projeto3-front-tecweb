import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useRef } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function ButtonAppBar(props) {
  const token = "b41e25882385ee402f115680cb550c54";
  const username = props.username;

  const valueRef = useRef('');

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

const AddButton = styled(Button) (({ theme }) => ({
  color: theme.palette.getContrastText("#C5481B"),
  backgroundColor: "#C5481B",
  fontSize: 15,
  padding: 10,
  margin: 3,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Rubik',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  fontweight: "bold",
  '&:hover': {
    backgroundColor: "#E56A3E",
  },
}));


  return (
    <div className="header">

        <div className="title"> 
          <img alt="Logo" src="./coffee.png"/>
          <h1> Your Morning Coffee</h1>
        </div>

        <div className="add">
          <div className="textField"> 
            <TextField sx={{margin: 1, input: {color: "white"}}} required id="task-input" label="What is your task?" variant="standard" fullWidth={true}/>
            <TextField sx={{margin: 1, input: {color: "white"}}} id="duedate-input" label="When is the due date?" variant="standard" fullWidth={true}/>
          </div>
          <AddButton onClick={
            sendValue}>
            Add
          </AddButton>
        </div>
    </div>
  );
}

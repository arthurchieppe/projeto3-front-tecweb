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
  const descriptionRef = useRef('');
  const dueDateRef = useRef('');

  function sendValue() {
    let description = String(descriptionRef.current.value);
    let dueDate = String(dueDateRef.current.value);
    axios
    .post('http://127.0.0.1:8000/api/todo/', {"description": description, "dueDate": dueDate})
    .then((response) => window.location.reload());
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
          <h1> Your Morning Coffee</h1>
        </div>

        <div className="add">
          <div className="textField"> 
            <TextField sx={{margin: 1, input: {color: "white"}}} id="task-input" label="What is your task?" variant="standard" fullWidth={true} inputRef={descriptionRef}/>
            <TextField sx={{margin: 1, input: {color: "white"}}} id="duedate-input" label="When is the due date?" variant="standard" fullWidth={true} inputRef={dueDateRef}/>
          </div>
          <AddButton onClick={
            sendValue}>
            Add
          </AddButton>
        </div>
    </div>
  );
}

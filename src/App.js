import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import * as React from 'react';
import NewsCard from './components/NewsCard';
import axios from "axios";
import { useState, useEffect} from "react";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import IconButton from '@mui/material/IconButton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 10,
  },
}));

const innerTheme = createTheme({
  palette: {
    primary: {
      main: "#ff8a80",
    },
  },
});

function deleteTask(id) {
  console.log(id);
  axios
  .delete(`https://ancient-cove-96144.herokuapp.com/api/todo/delete/${id}`)
  .then(window.location.reload())
}

function App() {
  
  const [isLoading, setLoading] = useState(true);
  const [newsList, setNews] = useState([]);
  const [todoRows, setTodo] = useState([]);

  useEffect(() => {
    axios
    .get(`http://api.mediastack.com/v1/news?access_key=8dfbfb8b6824dddd77e305f81e0063d6&sources=en&limit=6`)
    .then((response)=> {
      console.log(response.data.data)
      setNews(response.data.data)
      axios
      .get('https://ancient-cove-96144.herokuapp.com/api/todo/')
      .then((response) => {
        console.log(response.data);
        setTodo(response.data); 
        setLoading(false);
      })
      
    })
  }, []);


  if (isLoading) {
    return <div className="cityContainer">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <ButtonAppBar/>
      </header>

      <div className="body">

          <div className="news">
            <h2> News </h2>
            <div className="api">
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="flex-start"
                flexWrap="wrap"
                padding={3}
              >
                {newsList.map((news) => (
                  <NewsCard key={`news__${news.title}`} title={news.title} author={news.author} description={news.description} url={news.url } image={news.image}>
                    
                  </NewsCard>
                ))}
              </Grid>
            </div>
          </div>

          <div className="to-do">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="To-do List">
                <TableHead>
                  <TableRow>
                    <StyledTableCell bgcolor = "#D34D1D" align="left">My Tasks</StyledTableCell>
                    <StyledTableCell align="right">Due Date&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">Done?&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todoRows.map((row) => (
                    <StyledTableRow key={`task__${row.description}`}>
                      <StyledTableCell component="th" scope="row">
                        {row.description}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.dueDate}</StyledTableCell>
                      <StyledTableCell align="right"> 
                        <ThemeProvider theme={innerTheme}>
                          <IconButton aria-label="done" id={row.id} value={row.id} onClick={() => deleteTask(row.id)}>
                            <CheckCircleOutlinedIcon/>
                          </IconButton>
                        </ThemeProvider>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
      </div>
      
    </div>
  );
}

export default App;

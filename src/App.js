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
import Checkbox from '@mui/material/Checkbox';

function createData(task, date) { return { task, date }; }

const rows = [
  createData('Fazer projeto 3 TecWeb', "08-12-2021"),
  createData('Sugestão de Estudos 14-15 Eletromag', "02-12-2021"),
  createData('Ver a nota de Camadas', "04-12-2021"),
  createData('Assistir a aula 14 de Modcon', "06-12-2021")
];

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

function App() {

  const [isLoading, setLoading] = useState(true);
  const [newsList, setNews] = useState([]);

  useEffect(() => {
    axios
    .get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=91265bf8c2434cf5809447b50b8f4e2b`)
    .then((response)=> {
      console.log(response.data)
      setNews(response.data.articles)
      setLoading(false);
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
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="flex-start"
                flexWrap="wrap"
                padding={10}
              >
                {newsList.map((news) => (
                  <NewsCard key={`news__${news.title}`} title={news.title} author={news.author} description={news.description} url={news.url } image={news.urlToImage}>
                    
                  </NewsCard>
                ))}
              </Grid>
          </div>

          <div className="to-do">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="To-do List">
                <TableHead>
                  <TableRow>
                    <StyledTableCell bgcolor = "#D34D1D" align="left">My Tasks</StyledTableCell>
                    <StyledTableCell align="right">Due Date&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.task}>
                      <StyledTableCell component="th" scope="row">
                        {row.task}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.date}</StyledTableCell>
                      <StyledTableCell align="right"> 
                        <ThemeProvider theme={innerTheme}>
                          <Checkbox />
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

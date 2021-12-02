import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import * as React from 'react';
import NewsCard from './components/NewsCard';
import axios from "axios";
import { useState, useEffect} from "react";
import Grid from '@mui/material/Grid';

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
  );
}

export default App;

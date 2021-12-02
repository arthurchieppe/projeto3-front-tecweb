import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import * as React from 'react';
import CityCard from './components/CityCard';
import axios from "axios";
import { useState, useEffect} from "react";
import Grid from '@mui/material/Grid';

function App() {
  const token = "b41e25882385ee402f115680cb550c54"

  const [getCities, setCities] = useState([]);
  const [cityNames, setcityNames] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const username = "default" //Modificar aqui username
  useEffect(() => {
    axios //Axios para Backend
    .get(`https://morning-temple-71197.herokuapp.com/api/user/${username}/`)
    .then((response) =>
    {
      console.log(response.data);
      setcityNames(response.data.cities);
      let promises = response.data.cities.map((city) => {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${token}`).then((response)=>response.data)
      });

      Promise.all(promises).then((lista) => {
        console.log(lista)
        setLoading(false);
        setCities(lista);
      });
    });
  },[]);

  if (isLoading) {
    return <div className="cityContainer">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <ButtonAppBar cityNames={cityNames} username={username}/>
      </header>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        flexWrap="wrap"
        padding={10}


      >
        {getCities.map((city) => (
          <CityCard key={`city__${city.id}`} name={city.name} username={username} image={city.weather[0].icon}
          lat={city.coord.lat} lon={city.coord.lon}>
            {city.main.temp-273.15}
            {city.main.temp_max-273.15}
            {city.main.temp_min-273.15}
            {city.main.humidity}
            {city.weather[0].description}
          </CityCard>
        ))}
      </Grid>
    </div>
  );
}

export default App;

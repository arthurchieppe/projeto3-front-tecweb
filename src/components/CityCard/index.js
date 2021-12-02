import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import { useState, useEffect} from "react";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// https://mui.com/components/cards/
export default function CityCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function deleteCity(name) {
     axios
      .get(`https://morning-temple-71197.herokuapp.com/api/user/${props.username}/`)
      .then((response) => {
      const lsCities = response.data.cities;
      // const normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      console.log(name)
      let arr = lsCities.filter(e => e !== name);
      console.log(arr) // https://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
      axios
      .post(`https://morning-temple-71197.herokuapp.com/api/user/${props.username}/`, {
        "cities": arr
    })
    .then(window.location.reload())
    });
  }

  function buildImageUrl() {
    let url = `https://openweathermap.org/img/w/${props.image}.png`;
    return url

  }

  //https://stackoverflow.com/questions/32589197/how-can-i-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
 }

  const [getCigs, setCigs] = useState(0);

  //https://jasminedevv.github.io/AQI2cigarettes/
  function getNumberCig() {
    let lat = props.lat;
    let lon = props.lon;
    const token = "b41e25882385ee402f115680cb550c54"
    axios
    .get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${token}`)
    .then((response) => {
      let pm2_5 = response.data.list[0].components.pm2_5;
      let numCigs = pm2_5/22
      setCigs(numCigs);
    });
  }
  // var getCigs = 0;
  useEffect(() => {
    getNumberCig();
  });

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#96D9AD" }} aria-label="Inicial da Cidade">
            {props.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={() => {deleteCity(props.name)}}>
            <DeleteForeverIcon/>
          </IconButton>
        }
        title={props.name}
        subheader={titleCase(props.children[4])}
      />
      <CardMedia
        component="img"
        height="194"
        image={buildImageUrl()}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 4, mb: 2 }}>
            Temperature: {Math.round(props.children[0])} °C
            <br/>
            Max Temp: {Math.round(props.children[1])} °C
            <br/>
            Min Temp: {Math.round(props.children[2])} °C
            <br/>
            Humidity: {Math.round(props.children[3])} %
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Number of cigarettes "smoked": {getCigs}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

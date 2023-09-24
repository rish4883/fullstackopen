import axios from "axios";
import { useEffect, useState } from "react";
const geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const api_key = import.meta.env.VITE_SOME_KEY;

const Weather = ({capital, lat, lon}) => {
  const [city, setCity] = useState()
  const [geo, setGeo] = useState({})
  useEffect(() => {
    axios
      .get(`${geoUrl}q=${capital.split(' ').join('')}&limit=1&appid=${api_key}`)
      .then(res => setGeo({lat: Math.floor(res.data[0].lat), lon: Math.floor(res.data[0].lon)}))
  }, [])

  useEffect(() => {
    axios
    .get(`${weatherUrl}lat=${geo.lat}&lon=${geo.lon}&appid=${api_key}`)
    .then(res => setCity(res.data))
  }, [geo])
  
  return (
    <div>
      <h1>Weather in {capital}</h1>
      <p>Temperature {(city.main.temp - 273.15).toFixed(2)} Celcius</p>
      <p>Wind: {city.wind.speed} m/s</p>

    </div>
  )
}

export default Weather
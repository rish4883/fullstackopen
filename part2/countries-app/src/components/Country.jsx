
import { useState } from "react";
import Weather from "./Weather";





const Country = ({display, setCountry, country}) => {
  console.log(display);
  
  if(display.length >= 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if(display.length > 1 && !country) {
    return (
      <div>
        {display.map((item, index) => {
          return (
            <div key={index}>{item.name.common} <button onClick={() => setCountry(display[index])}>show</button></div>
          )
        })}
      </div>
    )
  }
  else if(display.length == 1 && !country) {
    setCountry(display[0])
  }
  else if(country) {
    return (
      <DisplayCountry capital={country.capital[0]} area={country.area} flag={country.flags.png} langObj={country.languages} lat={country.latlng[0]} lon={country.latlng[1]}/>
    )
  }
  else
    return null
}

const DisplayCountry = ({capital, area, langObj, flag,lat,lon}) => {
  const languages = Object.values(langObj)
  return (
    <div>
      <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <h3>Languages:</h3>
        <ul>
          {languages.map((lang, i) => {
            return <li key={i}>{lang}</li>
          })}
        </ul>
        <img src={flag}/>
        <Weather capital={capital} lat={lat} lon={lon}/>
    </div>
  )
}

export default Country;
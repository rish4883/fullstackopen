import { useState } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {

  const [display, setDisplay] = useState([])
  const [country, setCountry] = useState(null)

  const searchCountry = (e)   => {
    setCountry(null)
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';
    const search = e.target.value.toLowerCase();
    if(!search) {
      setDisplay([])
      return
    }
    axios
      .get(`${baseUrl}/all`)
      .then(response => {
        const data = response.data;
        const displayData = data.filter(d => d.name.common.toLowerCase().substring(0, search.length) === search);
        
        setDisplay(displayData);
        console.log(display)
      })
  }

  return (
    <>
      <div>
        <label htmlFor="find">Find Countries</label>{':  '}
        <input type="text" id='find' onChange={searchCountry}/>
        <Country display={display} setCountry={setCountry} country={country}/>
      </div>
    </>
  )
}

export default App

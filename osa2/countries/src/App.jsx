import { useState, useEffect } from 'react'
import axios from 'axios'


const Find = (props) => {
  return (
    <div>
      find countries <input value={props.search} onChange={props.handleSearch} /> 
    </div>
  )
}

const Filter = (props) => {
  const {countriesToShow, search, handleShow, weathers} = props
  console.log('filter', countriesToShow)
  if (!search) {
    return
  }

  if (countriesToShow.length > 10) {
  return (
    <div>
      <p>too many matches, specify another filter</p>
    </div>
  ) }

 if (countriesToShow.length <=10 && countriesToShow.length > 1) {
  return (
  <div>
  {countriesToShow.map(country => (
    <div key={country.name.common}>
      <p>{country.name.common}</p>
    <button onClick={() => handleShow(country.name.common)}>show</button>
    </div>
    )) }
  </div>
    )
  }
  var temperature = '-'
  var icon = '-'
  var wind ='-'
    
  if (countriesToShow.length == 1) {
    
    console.log(temperature)  
    console.log('countriesshow', countriesToShow[0])
    const country = countriesToShow[0]
    const languages = Object.entries(country.languages)
    console.log(languages)
    console.log(Array.isArray(weathers))
    
    if (!Array.isArray(weathers) && weathers.length != 0) {
    console.log('weathershow', weathers)
    temperature = (weathers.main.feels_like-272.15).toFixed(2)
    icon = `https://openweathermap.org/img/wn/${weathers.weather[0].icon}@2x.png`
    wind = weathers.wind.speed
   }
    return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
      {languages.map((language, i) => (
    <li key={i}>{language[1]}</li>
    )) }
      </ul>
      <img src={country.flags['png']}/>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {temperature} Celcius</p>
      <img src={icon}/>
      <p>wind {wind} m/s</p>
    </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [weathers, setWeather] = useState([])
  const [search, setSearch] = useState('')
  const [showcountry, setShowCountry] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY


  useEffect(() => {
    console.log('effect run, countries', countries)
    console.log('showc',showcountry)
    
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.error(error)
      })
    }, [])
    

  console.log('countries', countries)
  console.log('weathers', weathers)
  console.log('showcountry capital1',showcountry?.capital[0]??"puuttuu")
  console.log('showcountry',showcountry)
  
  


  useEffect(() => {
    console.log('showcountry capital2',showcountry)
    if (showcountry) {
    console.log('showcountry capital3',showcountry?.capital[0])
    getweather(showcountry.capital)
    }
  }, [showcountry??"null"])

  const getweather = async(capital) => {
    await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })}
      

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value.toLowerCase())
    setShowCountry(null)
  }

  const handleShow = (countryName) => {
    const foundCountry = countries.find(country => country.name.common === countryName)
    setShowCountry(foundCountry)
    console.log('contry found', foundCountry)
  }  


  const countriesToShow = () =>{
  if (showcountry) {
    console.log('show', showcountry)
    return [showcountry]}
  
  if (search){ 
    const filtered_country = 
    countries.filter(country =>
    country.name.common.toLowerCase().includes(search))
    if (filtered_country.length == 1) {
      const f_country = filtered_country[0]
      setShowCountry(f_country)
      console.log('hello', f_country)}
    return filtered_country
    }
  else {return countries}}

  
  return (
    <div>
      <h2>Find countries</h2>
      <Find search={search} handleSearch={handleSearch}/> 
      <Filter countriesToShow={countriesToShow()} search={search} 
      handleShow={handleShow} weathers={weathers}/>
    </div>
  )
}


export default App

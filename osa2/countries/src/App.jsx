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
  const {countriesToShow, search, handleShow} = props
  console.log(countriesToShow)
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

  if (countriesToShow.length == 1) {
    console.log(countriesToShow[0])
    const country = countriesToShow[0]
    const languages = Object.entries(country.languages)
    console.log(languages)
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
    </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [showcountry, setShowCountry] = useState('')
  const api_key = import.meta.env.VITE_SOME_KEY


  useEffect(() => {
    console.log('effect run, countries', countries)

    if (search) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
        .catch(error => {
          console.error(error)
        })}
    }, [search])
    

  console.log('countries', countries)

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value.toLowerCase())
    setShowCountry('')
  }

  const handleShow = (countryName) => {
    const foundCountry = countries.find(country => country.name.common === countryName)
    setShowCountry(foundCountry)
  }  

  const countriesToShow = showcountry ? [showcountry]
  : search ? countries.filter(country =>
    country.name.common.toLowerCase().includes(search))
  : countries
  

  return (
    <div>
      <h2>Find countries</h2>
      <Find search={search} handleSearch={handleSearch}/> 
      <Filter countriesToShow={countriesToShow} search={search} 
      handleShow={handleShow}/>
    </div>
  )
}


export default App

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
  const {countriesToShow, search} = props
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
    <p key={country.name.common}>{country.name.common}</p>
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
    }

  const countriesToShow = search
  ? countries.filter(country =>
    country.name.common.toLowerCase().includes(search))
  : countries
  

  return (
    <div>
      <h2>Find countries</h2>
      <Find search={search} handleSearch={handleSearch}/> 
      <Filter countriesToShow={countriesToShow} search={search}/>
    </div>
  )
}


export default App

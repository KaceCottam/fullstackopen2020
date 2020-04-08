import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countryFilter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const onChangeFilter = event => { setFilter(event.target.value) }

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  const filteredCountries = countries.filter(
    ({name}) => name.toUpperCase().includes(countryFilter.toUpperCase())
  )

  useEffect(hook, [])

  const renderedCountries = () => {
    if(filteredCountries.length > 10) {
      return (<p>Too many matches, specify another filter</p>)
    }
    if(filteredCountries.length === 1) {
      const {name, capital, population, languages, flag} = filteredCountries[0]
      return (
        <div>
          <h1>{name}</h1>
          <p>capital {capital}</p>
          <p>population {population}</p>
          <h2>languages</h2>
          <ul>
            {languages.map((l, i) => (<li key={i}>{l.name}</li>))}
          </ul>
          <img src={flag} height="100"/>
        </div>
      )
    }
    return filteredCountries.map(({name}, i) => (<p key={i}>{name}</p>))
  }

  return (
    <div>
    <p>find countries</p>
    <input value={countryFilter} onChange={onChangeFilter} />
    {renderedCountries()}
    </div>
  )
}

export default App

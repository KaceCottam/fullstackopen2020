import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Render from './components/Render'

function App() {
  const [countryFilter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const onChangeFilter = event => { setFilter(event.target.value) }

  const filteredCountries = countries.filter(
    ({name}) => name.toUpperCase().includes(countryFilter.toUpperCase())
  )

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
    <p>find countries</p>
    <input value={countryFilter} onChange={onChangeFilter} />
    <Render filteredCountries={filteredCountries} setFilter={setFilter} />
    </div>
  )
}

export default App

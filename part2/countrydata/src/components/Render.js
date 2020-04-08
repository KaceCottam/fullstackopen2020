import React from 'react'
import Country from './Country'
import DetailedCountry from './DetailedCountry'

const Render = ({filteredCountries, setFilter}) => {
  if(filteredCountries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  }
  if(filteredCountries.length === 1) {
    return (<DetailedCountry country={filteredCountries[0]} />)
  }
  if(filteredCountries.length === 0) {
    return (<p>No countries found, specify another filter</p>)
  }
  return filteredCountries.map(({name}, i) => (
    <Country key={i} name={name} setFilter={setFilter} />
  ))
}

export default Render

import React from 'react'

const DetailedCountry = ({country}) => {
  const {name, capital, population, languages, flag} = country
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map((l, i) => (<li key={i}>{l.name}</li>))}
      </ul>
      <img src={flag} alt={`${name}'s flag`} height="100"/>
    </div>
  )
}

export default DetailedCountry

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DetailedCountry = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY

  const {name, capital, population, languages, flag} = country

  const [weatherData, setWeatherData] = useState({})


  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        console.log(response.data)
        setWeatherData(response.data)
      })
  }, [api_key, capital])

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
      <h2>Weather in {capital}</h2>
      {
        weatherData.current === undefined && weatherData.success === undefined
        ? (<p>No data retrieved.</p>)
        : weatherData.success !== undefined && weatherData.success === false
        ? (<p>Error retrieving weather data. Code: {weatherData.error.code}</p>)
        : (<div>
          <p><b>temperature:</b> {weatherData.current.temperature} Celcius</p>
          {
            weatherData.current.weather_icons.map((ico, i) => (
              <img key={i} src={ico} alt={`${capital}'s weather'`} />
            ))
          }
          <p><b>wind:</b> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir} </p>
        </div>)
      }
    </div>
  )
}

export default DetailedCountry

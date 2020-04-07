import React from 'react'
import Details from './Details'

const Render = ({ persons, newFilter }) => {
  const shownPersons = persons.filter(
    p => p.name.toUpperCase().includes(newFilter.toUpperCase())
  )

  return (
    <div>
      <h2>Numbers</h2>
      {shownPersons.map( ({ name, number }) => (<Details key={name} name={name} number={number} />) )}
    </div>
  )
}

export default Render

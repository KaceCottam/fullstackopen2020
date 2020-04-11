import React from 'react'
import Details from './Details'

const Render = ({ persons, newFilter, buttonCreation }) => {
  const shownPersons = persons.filter(
    p => p.name.toUpperCase().includes(newFilter.toUpperCase())
  )


  return (
    <div>
      <h2>Numbers</h2>
      {shownPersons.map(
        p => (<Details key={p.name} person={p} buttonCreation={buttonCreation} />)
      )}
    </div>
  )
}

export default Render

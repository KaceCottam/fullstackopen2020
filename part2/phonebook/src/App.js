import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const onNameChange = event => { setNewName(event.target.value) }

  const addName = event => {
    event.preventDefault()
    const newPerson = {name: newName}
    if(persons.filter(({name}) => name === newName).length !== 0) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( ({ name },i) => ( <p key={i}>{name}</p> ) )}
    </div>
  )
}

export default App

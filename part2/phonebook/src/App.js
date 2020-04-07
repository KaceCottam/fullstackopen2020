import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const onNameChange = event => { setNewName(event.target.value) }
  const onNumberChange = event => { setNewNumber(event.target.value) }
  const onFilterChange = event => { setNewFilter(event.target.value) }

  const addPerson = event => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber }

    if(persons.filter(({ name }) => name === newName).length !== 0) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const shownPersons = persons.filter(p => p.name.toUpperCase().includes(newFilter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>filter shown with</p>
        <input value={newFilter} onChange={onFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={onNameChange} /></div>
        <div>number: <input value={newNumber} onChange={onNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {shownPersons.map( ({ name, number },i) => ( <p key={i}>{name} {number}</p> ) )}
    </div>
  )
}

export default App

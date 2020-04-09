import React, { useState } from 'react'
import networker from '../service/networker'

const AdditionForm = ({ persons, setPersons }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const onNameChange = event => { setNewName(event.target.value) }
  const onNumberChange = event => { setNewNumber(event.target.value) }

  const addPerson = event => {
    event.preventDefault()

    const newPerson = { name: newName
      , number: newNumber
      , id: (persons.length + 1)
    }

    if(persons.filter(({ name }) => name === newName).length !== 0) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      networker
        .create(newPerson)
        .then(newPersonData => {
          setPersons(persons.concat(newPersonData))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={onNameChange} /></div>
        <div>number: <input value={newNumber} onChange={onNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

export default AdditionForm

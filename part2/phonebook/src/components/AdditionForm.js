import React, { useState } from 'react'
import networker from '../service/networker'

const AdditionForm = ({ persons, setPersons, setNotification }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const onNameChange = event => { setNewName(event.target.value) }
  const onNumberChange = event => { setNewNumber(event.target.value) }

  const addPerson = event => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber }

    const filteredPersons = persons.filter(({ name }) => name === newName)

    if(filteredPersons.length !== 0) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        networker
          .change(filteredPersons[0].id, newPerson)
          .then(r => {
            setPersons(
              persons.map(
                p => p.name !== newPerson.name
                  ? p
                  : { ...p, number: newPerson.number }
              )
            )
            setNewName('')
            setNewNumber('')
            setNotification(`Changed number of ${newName} to ${newNumber}`)
            setTimeout(() => setNotification(null), 5000)
          })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      networker
        .create(newPerson)
        .then(newPersonData => {
          setPersons(persons.concat(newPersonData))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newName}`)
          setTimeout(() => setNotification(null), 5000)
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

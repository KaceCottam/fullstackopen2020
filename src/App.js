import React, { useState, useEffect } from'react'
import Networker from './services/networker'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newPerson, setNewPerson ] = useState({ name: '', number: '' })
  const [ notification, setNotification ] = useState(null)
  const [ filter, setFilter ] = useState('')

  useEffect( () => {
    Networker.getAll().then(persons => setPersons(persons))
  }, [])

  const resetNewPerson = () => setNewPerson({ name: '', number: '' })

  const doNotify = style => content => {
    setTimeout(() => { setNotification(null) }, 5000)
    setNotification(<p style={style}>{content}</p>)
  }
  const notify = doNotify({ color: "green" })
  const error = doNotify({ color: "red" })

  const onSubmit = event => {
    event.preventDefault()

    const existingPerson = persons.find(({ name }) => name === newPerson.name)

    const replacePerson = ep =>
      window.confirm(`Do you want to replace ${ep.name}'s phone number ` +
        `with ${newPerson.number}?`)

    if (!existingPerson) {
      Networker.create(newPerson).then(newPerson => {
        setPersons( persons.concat(newPerson) )
        notify(`Added ${newPerson.name} to the phone book!`)
        resetNewPerson()
      })
    } else if (replacePerson(existingPerson)) {
      Networker.update(existingPerson.id, newPerson).then(newPerson => {
        setPersons( persons.map(p => p === existingPerson
          ? newPerson
          : existingPerson) )
        notify(`Changed ${newPerson.name}'s number to ${newPerson.number}!`)
        resetNewPerson()
      })
    } else {
      error(`${newPerson.name} already exists!`)
      resetNewPerson()
    }
  }

  const setName = content => setNewPerson({ ...newPerson, name: content })
  const setNumber = content => setNewPerson({ ...newPerson, number: content })
  const onChangeGenerator = fn => event => fn(event.target.value)

  return (
    <div>
      <div>
        <label htmlFor="filter">filter:</label>
        <input id="filter" value={filter}
          onChange={onChangeGenerator(setFilter)}/>
      </div>
      <h2>Phonebook</h2>
      {notification}
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='name'>name:</label>
          <input id='name' value={newPerson.name}
            onChange={onChangeGenerator(setName)} /><br />
          <label htmlFor='number'>number:</label>
          <input id='number' value={newPerson.number}
            onChange={onChangeGenerator(setNumber)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { persons
        .filter(({name}) => name.toUpperCase().includes(filter.toUpperCase()))
        .map((p, idx) => (<p key={idx}>{p.name} {p.number}</p>)) }
    </div>
  )
}

export default App

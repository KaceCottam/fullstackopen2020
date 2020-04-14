import React, { useState, useEffect } from 'react'
import Networker from './services/networker'
import Notification from './components/notification'
import Filter from './components/filter'
import AdditionForm from './components/additionForm'

const Header = () => (<h1>Phonebook</h1>)
const Footer = () => null

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const doNotify = type => content => {
    setNotification({ type, content })
    setTimeout(() => setNotification(null), 5000)
  }

  const notify = doNotify('good')
  const error = doNotify('error')

  useEffect(() => {
    Networker.getAll()
      .then(persons => setPersons(persons))
      .catch(_ => error('couldnt get persons'))
  })


  const addPerson = (person, resetForm) => event => {
    event.preventDefault()

    const confirmOverride = name =>
      window.confirm(`${name} is already added to phonebook,` +
        ' replace the old number with a new one?')

    const existingPerson = persons.find(p => p.name === person.name)

    if (!existingPerson) {
      Networker.create(person).then(newPerson => {
        setPersons(persons.concat(newPerson))
        notify(`${person.name} added to phonebook`)
        resetForm()
      })

    } else if (confirmOverride(person.name)) {
      Networker.change(existingPerson.id,
        { ...existingPerson, number: person.number }).then(changedPerson => {
          setPersons(persons.map(p => p.id === changedPerson.id ? changedPerson : p))
          notify(`${changedPerson.name}'s phonenumber changed to ${changedPerson.number}'`)
          resetForm()
        })
    } else {
      error(`${person.name} already exists!`)
      resetForm()
    }

  }

  return (
    <div>
      <Header />
      <Notification message={notify} />
      <Filter filter={filter} setFilter={setFilter} />
      <AdditionForm addPerson={addPerson} />
      <Footer />
    </div>
  )
}

export default App

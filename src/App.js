import React, { useState, useEffect } from 'react'
import Networker from './services/networker'
import Notification from './components/notification'
import Filter from './components/filter'
import AdditionForm from './components/additionForm'

const Header = () => (<h1>Phonebook</h1>)
const Footer = () => null

const App = () => {
  const [ state, setState ] = useState({
    persons: [],
    filter: '',
    notify: null
  })

  const setFilter = value => setState({ ...state, filter: value })
  const setPersons = value => setState({ ...state, persons: value })
  const setNotify = type => content => {
    setState({ ...state, notify: { type, content } })
    setTimeout(() => setState({ ...state, notify: null }), 5000)
  }

  const notify = setNotify('notification')
  const error = setNotify('error')

  useEffect(() => Networker.getAll().then(persons => setState(
    { ...state, persons: persons })))

  const confirmOverride = name =>
    window.confirm(`${name} is already added to phonebook,` +
      ' replace the old number with a new one?')



  const addPerson = (person, resetForm) => event => {
    event.preventDefault()

    const notifyReset = content => resetAnd(() => notify(content))
    const errorReset = content => resetAnd(() => error(content))

    const similarPerson = state.persons.find(p => p.name === person.name)
    const resetAnd = predicate => { predicate(); resetForm() }
    const modifyPersons = b => a => a.id === b.id ? a : b
    const changePerson  = person => confirmOverride()
      ? resetAnd(() => setPersons(state.persons.map(modifyPersons(person))))
      : resetForm()

    return similarPerson
      ? changePerson(similarPerson)
      : resetAnd(() => {
          setPersons(state.persons.concat(person))
          Networker.create(person)
        })
  }


  return (
    <div>
      <Header />
      <Notification message={state.notify} />
      <Filter filter={state.filter} setFilter={setFilter} />
      <AdditionForm addPerson={addPerson} />
      <Footer />
    </div>
  )
}

export default App

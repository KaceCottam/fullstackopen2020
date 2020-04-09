import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AdditionForm from './components/AdditionForm'
import Render from './components/Render'
import networker from './service/networker'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  const hook = () => {
    networker
      .getAll()
      .then(personData => setPersons(personData))
  }

  useEffect(hook, [])

  return (
    <div>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <AdditionForm persons={persons} setPersons={setPersons} />
      <Render persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App

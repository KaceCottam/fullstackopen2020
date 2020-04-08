import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AdditionForm from './components/AdditionForm'
import Render from './components/Render'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
          setPersons(response.data)
        })
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

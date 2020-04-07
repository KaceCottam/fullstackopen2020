import React, { useState } from 'react'
import Filter from './components/Filter'
import AdditionForm from './components/AdditionForm'
import Render from './components/Render'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  return (
    <div>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <AdditionForm persons={persons} setPersons={setPersons} />
      <Render persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App

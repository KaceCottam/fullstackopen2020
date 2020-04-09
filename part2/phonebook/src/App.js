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

  const buttonCreation = (id, name) => {
    const onDelete = () => {
      if(window.confirm(`Are you sure you want to delete ${name}?`)) {
        networker
          .deleteID(id)
          .then(personData => {
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    }

    return (<button onClick={onDelete}>delete</button>)
  }

  return (
    <div>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <AdditionForm persons={persons} setPersons={setPersons} />
      <Render persons={persons} newFilter={newFilter}
        buttonCreation={buttonCreation} />
    </div>
  )
}

export default App

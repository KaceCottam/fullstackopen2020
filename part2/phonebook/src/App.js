import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AdditionForm from './components/AdditionForm'
import Render from './components/Render'
import networker from './service/networker'
import makeNotifyComponent from './components/notification'
import './index.css'

const ErrorNotification = makeNotifyComponent('error')
const Notification = makeNotifyComponent('notify')

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ notification, setNotification ] = useState(null)

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
          .catch(error => {
            setErrorMessage(`Information of ${name} has already been removed from the server`)
            setTimeout(() => setErrorMessage(''), 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    }

    return (<button onClick={onDelete}>delete</button>)
  }

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <Notification message={notification} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <AdditionForm persons={persons} setPersons={setPersons} 
         setNotification={setNotification} setErrorMessage={setErrorMessage} />
      <Render persons={persons} newFilter={newFilter}
        buttonCreation={buttonCreation} />
    </div>
  )
}

export default App

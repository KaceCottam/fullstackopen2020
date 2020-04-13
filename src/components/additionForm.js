import React, { useState } from 'react'

const AdditionForm = ({ addPerson }) => {
  const [ name, setName ] = useState('')
  const [ number, setNumber ] = useState('')

  const isDisabled = () => name === '' || number === ''

  const onChange = fn => event => fn(event.target.value)
  const resetForm = () => { setName(''); setNumber('') }

  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addPerson({ name, number }, resetForm)}>
        <label htmlFor="name">name: </label>
        <input id="name" value={name}
          onChange={onChange(val => setName(val))} />
        <br />
        <label htmlFor="number">number: </label>
        <input id="num" value={number}
          onChange={onChange(val => setNumber(val))} />
        <br />
        <button type="submit" disabled={isDisabled()}>add</button>
      </form>
    </div>
  )
}

export default AdditionForm

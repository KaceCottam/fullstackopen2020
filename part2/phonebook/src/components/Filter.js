import React from 'react'

const Filter = ({ newFilter, setNewFilter }) => {
  const onFilterChange = event => { setNewFilter(event.target.value) }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>filter shown with</p>
        <input value={newFilter} onChange={onFilterChange} />
      </div>
    </div>
  )
}

export default Filter

import React from 'react'

const Filter = ({ filter, setFilter }) => {
  const onChangeValue = ({target}) => setFilter(target.value)

  return (
    <div>
      <label htmlFor="filter">filter shown with</label>
      <input id="filter" value={filter} onChange={onChangeValue} />
    </div>
  )
}

export default Filter

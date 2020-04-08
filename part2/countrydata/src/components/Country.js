import React from 'react'

const Country = ({name, setFilter}) => (
  <div>
    <p>{name}</p>
    <button onClick={() => {setFilter(name)}} >show</button>
  </div>
)

export default Country

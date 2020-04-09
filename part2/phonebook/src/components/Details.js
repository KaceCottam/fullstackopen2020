import React from 'react'

const Details = ({ person, buttonCreation }) => 
{
  const { name, number, id } = person
  return (
    <div key={id}>
    <p>{name} {number}</p>
    {buttonCreation(id, name)}
    </div>
  )
}

export default Details

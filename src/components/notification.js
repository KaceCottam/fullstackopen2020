import React from 'react'

const makeNotifyComponent = (className) => ({ message }) => {
  if (message === null) { return null }

  return (<div className={className}>{message}</div>)
}

export default makeNotifyComponent

import React from 'react'

const Notification = notification => notification
  ? (<div className={notification.type}>{notification.content}</div>)
  : null

export default Notification

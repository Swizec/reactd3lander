import React from 'react'

function DateText({ date, lastUpdated }) {
  const time = date === lastUpdated ? date : lastUpdated
  return <em>Last updated: {time}</em>
}

export default DateText

import React from 'react'

function DateText({ date, lastUpdated }) {
  const changed = date && lastUpdated && date !== lastUpdated
  return (
    <>
      {date}
      {changed ? <em>{` · Last updated: ${lastUpdated}`}</em> : null}
    </>
  )
}

export default DateText

import React from 'react'

interface PickerProps {
  date: string
  setDate(val: string): any
  today: string
}

export const DatePicker = ({ date, setDate, today }: PickerProps) => {
  return (
    <div>
      <input
        type='date'
        min='2018-01-01'
        max={today}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  )
}

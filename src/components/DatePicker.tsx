import React from 'react'

interface PickerProps {
  date: string
  setDate(val: string, val2: Date | null): any
  today: string
  setDisplayFav(val: boolean): any
}

export const DatePicker = ({
  date,
  setDate,
  today,
  setDisplayFav,
}: PickerProps) => {
  return (
    <div style={{ marginLeft: '3px' }}>
      <input
        type='date'
        min='2018-01-01'
        max={today}
        value={date}
        onClick={() => setDisplayFav(false)}
        onChange={(e) => setDate(e.target.value, e.target.valueAsDate)}
      />
    </div>
  )
}

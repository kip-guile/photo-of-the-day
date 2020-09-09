import React from 'react'
import moment from 'moment'
import { DatePicker, Space } from 'antd'

//Describes structure of props to DatePicker Component
interface PickerProps {
  date: string
  setDate(val: any, val2: any | null): any
  today: string
  setDisplayFav(val: boolean): any
}

export const DatePickerComp = ({
  date,
  setDate,
  today,
  setDisplayFav,
}: PickerProps) => {
  // sets date when date is selected
  function onChange(date: any, dateString: any) {
    setDate(date, dateString)
  }

  //set disabled portion of datepicker calendar
  function disabledDate(current: any) {
    // Can not select days after today and today
    return current > moment().endOf('day')
  }

  return (
    <Space direction='vertical'>
      <DatePicker
        allowClear={false}
        onClick={() => setDisplayFav(false)}
        disabledDate={disabledDate}
        onChange={onChange}
      />
    </Space>
  )
}

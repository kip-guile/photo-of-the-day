import React from 'react'
import moment from 'moment'
import { DatePicker, Space } from 'antd'

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
  function onChange(date: any, dateString: any) {
    setDate(date, dateString)
  }
  function disabledDate(current: any) {
    // Can not select days before today and today
    return current > moment().endOf('day')
  }
  return (
    <Space direction='vertical'>
      <DatePicker
        onClick={() => setDisplayFav(false)}
        disabledDate={disabledDate}
        onChange={onChange}
      />
    </Space>
  )
}

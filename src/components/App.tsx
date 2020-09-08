import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchPhotoObject, PhotoObject } from '../actions'
import { StoreState } from '../reducers'
import { DatePicker } from './DatePicker'

interface AppProps {
  photo: PhotoObject
  fetchPhotoObject(date: string): any
}

function App({ photo, fetchPhotoObject }: AppProps) {
  let today = new Date().toISOString().substr(0, 10)
  const [curDate, setCurDate] = useState(today)
  useEffect(() => {
    fetchPhotoObject(curDate)
  }, [fetchPhotoObject, curDate])
  console.log(photo)
  return (
    <div>
      {photo.title}
      <DatePicker date={curDate} setDate={setCurDate} today={today} />
    </div>
  )
}

const mapStateToProps = ({ photo }: StoreState) => {
  return { photo }
}

export default connect(mapStateToProps, { fetchPhotoObject })(App)

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchPhotoObject, PhotoObject } from '../actions'
import { StoreState } from '../reducers'
import { DatePicker } from './DatePicker'
import Frame from './Frame'
import Content from './Content'
import Header from './Header'
import { AppContainer } from '../styles/styles'
// import moment from 'moment'

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
  // let momd = moment()
  // const change = (diff: number) => {
  //   momd.add(diff, 'days')
  //   console.log(momd.format().substr(0, 10))
  // }
  // change(-10)

  return (
    <AppContainer>
      <Header title={photo.title} />
      <Frame imgurl={photo.hdurl} />
      <Content explanation={photo.explanation} />
      <DatePicker date={curDate} setDate={setCurDate} today={today} />
    </AppContainer>
  )
}

const mapStateToProps = ({ photo }: StoreState) => {
  return { photo }
}

export default connect(mapStateToProps, { fetchPhotoObject })(App)

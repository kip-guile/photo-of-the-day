import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { fetchPhotoObject, PhotoObject } from '../actions'
import { StoreState } from '../reducers'
import { DatePicker } from './DatePicker'
import Frame from './Frame'
import Content from './Content'
import Header from './Header'
import { AppContainer, ButtonContainer } from '../styles/styles'

interface AppProps {
  photo: PhotoObject
  fetchPhotoObject(date: string): any
}

function App({ photo, fetchPhotoObject }: AppProps) {
  let momd = moment()
  let today = new Date().toISOString().substr(0, 10)
  const [curDateObj, setCurDateObj] = useState(momd)
  const [curDate, setCurDate] = useState(today)

  const change = (diff: number) => {
    console.log(curDate)
    let temp = curDateObj.add(diff, 'days')
    setCurDateObj(temp)
    setCurDate(curDateObj.format().substr(0, 10))
  }

  useEffect(() => {
    fetchPhotoObject(curDate)
  }, [fetchPhotoObject, curDate])

  const dateSetup = (val: string, val2: Date) => {
    setCurDate(val)
    let dateObj = new Date(val2)
    let momentObj = moment(dateObj)
    setCurDateObj(momentObj)
  }

  return (
    <AppContainer>
      <Header title={photo.title} />
      <Frame change={change} imgurl={photo.hdurl} />
      <ButtonContainer>
        <button>Fav</button>
        <DatePicker date={curDate} setDate={dateSetup} today={today} />
      </ButtonContainer>
      <Content explanation={photo.explanation} />
    </AppContainer>
  )
}

const mapStateToProps = ({ photo }: StoreState) => {
  return { photo }
}

export default connect(mapStateToProps, { fetchPhotoObject })(App)

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  fetchPhotoObject,
  PhotoObject,
  addFavObject,
  FavObject,
} from '../actions'
import { StoreState } from '../reducers'
import { DatePicker } from './DatePicker'
import Frame from './Frame'
import Content from './Content'
import Header from './Header'
import { AppContainer, ButtonContainer, Button } from '../styles/styles'

interface AppProps {
  photo: PhotoObject
  favs: FavObject[]
  fetchPhotoObject(date: string): any
  addFavObject(fav: FavObject): any
}

function App({ photo, favs, fetchPhotoObject, addFavObject }: AppProps) {
  let momd = moment()
  let today = new Date().toISOString().substr(0, 10)
  const [curDateObj, setCurDateObj] = useState(momd)
  const [curDate, setCurDate] = useState(today)
  const [favPhotoDate, setFavPhotoDate] = useState({})
  const [displayFav, setDisplayFav] = useState(false)

  const change = (diff: number) => {
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

  const favConstruct = {
    date: photo.date,
    explanation: photo.explanation,
    hdurl: photo.hdurl,
    title: photo.title,
  }

  const handleChange = (e: any) => {
    let { value } = e.target
    setFavPhotoDate(value)
    setDisplayFav(true)
  }
  const favToDisplay = favs.filter(
    (fav: FavObject) => fav.date === favPhotoDate
  )

  let objToRender = displayFav ? favToDisplay[0] : photo

  return (
    <AppContainer>
      <Header title={objToRender.title} />
      <Frame
        setDisplayFav={setDisplayFav}
        change={change}
        imgurl={objToRender.hdurl}
      />
      <ButtonContainer>
        <Button onClick={() => addFavObject(favConstruct)}>Fav</Button>
        {favs.length === 0 ? null : (
          <select onChange={handleChange} style={{ marginLeft: '10px' }}>
            {favs.map((fav: FavObject) => (
              <option key={fav.date} value={fav.date}>
                {fav.title}
              </option>
            ))}
          </select>
        )}
        <DatePicker
          date={curDate}
          setDate={dateSetup}
          today={today}
          setDisplayFav={setDisplayFav}
        />
      </ButtonContainer>
      <Content explanation={objToRender.explanation} />
    </AppContainer>
  )
}

const mapStateToProps = ({ photo, favs }: StoreState) => {
  return { photo, favs }
}

export default connect(mapStateToProps, { fetchPhotoObject, addFavObject })(App)

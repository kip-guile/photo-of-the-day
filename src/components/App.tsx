import React, { useEffect, useState } from 'react'
import './App.css'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  fetchPhotoObject,
  PhotoObject,
  addFavObject,
  FavObject,
  deleteFav,
  getFavsFromDb,
  ErrorObject,
} from '../actions'
import { StoreState } from '../reducers'
import { DatePicker } from './DatePicker'
import FavSelect from './FavSelect'
import Frame from './Frame'
import Content from './Content'
import Header from './Header'
import { AppContainer, ButtonContainer, Button } from '../styles/styles'

interface AppProps {
  photo: PhotoObject
  favs: FavObject[]
  errors: ErrorObject
  fetchPhotoObject(date: string): any
  addFavObject(fav: FavObject): any
  deleteFav(date: string): any
  getFavsFromDb(): any
}

function App({
  photo,
  favs,
  errors,
  fetchPhotoObject,
  addFavObject,
  deleteFav,
  getFavsFromDb,
}: AppProps) {
  const localphoto = localStorage.getItem('photo')
  const persistedPhoto = localphoto ? JSON.parse(localphoto) : null
  let momd = moment()
  let today = new Date().toISOString().substr(0, 10)
  const [curDateObj, setCurDateObj] = useState(momd)
  const [curDate, setCurDate] = useState(today)
  const [favPhotoDate, setFavPhotoDate] = useState({})
  const [displayFav, setDisplayFav] = useState(false)

  // variable to disable next button
  const disableNext = curDate === today

  const errorArray = Object.values(errors)

  const change = (diff: number) => {
    let temp = curDateObj.add(diff, 'days')
    setCurDateObj(temp)
    setCurDate(curDateObj.format().substr(0, 10))
  }

  useEffect(() => {
    fetchPhotoObject(curDate)
    getFavsFromDb()
  }, [fetchPhotoObject, curDate, getFavsFromDb])

  const dateSetup = (val: string, val2: Date) => {
    setCurDate(val)
    let dateObj = new Date(val2)
    let momentObj = moment(dateObj)
    setCurDateObj(momentObj)
  }

  const favConstruct = {
    date: photo.date,
    explanation: photo.explanation,
    url: photo.url,
    title: photo.title,
    media_type: photo.media_type,
  }

  const favToDisplay = favs.filter(
    (fav: FavObject) => fav.date === favPhotoDate
  )

  let objToRender = displayFav
    ? favToDisplay[0]
    : photo.url
    ? photo
    : persistedPhoto

  const handleDelete = (date: string) => {
    setDisplayFav(false)
    deleteFav(date)
  }

  return (
    <AppContainer>
      <div>
        {errorArray.map((err, i) =>
          err ? (
            <p style={{ color: 'red' }} key={i}>
              {err}
            </p>
          ) : null
        )}
      </div>
      {objToRender ? (
        objToRender.url !== '' ? (
          <>
            <Header title={objToRender.title} />
            <FavSelect
              favs={favs}
              setDisplayFav={setDisplayFav}
              setFavPhotoDate={setFavPhotoDate}
              displayFav={displayFav}
              handleDelete={handleDelete}
              favToDisplay={favToDisplay}
            />
            <Frame
              disableNext={disableNext}
              mediaType={objToRender.media_type}
              setDisplayFav={setDisplayFav}
              change={change}
              imgurl={objToRender.url}
            />
            <ButtonContainer>
              <Button onClick={() => addFavObject(favConstruct)}>
                Set Favourite
              </Button>
              <DatePicker
                date={curDate}
                setDate={dateSetup}
                today={today}
                setDisplayFav={setDisplayFav}
              />
            </ButtonContainer>
            <Content explanation={objToRender.explanation} />
          </>
        ) : (
          <div>
            <p>{errors.nasaError}</p>
          </div>
        )
      ) : (
        <div>{errors.nasaError}</div>
      )}
    </AppContainer>
  )
}

const mapStateToProps = ({ photo, favs, errors }: StoreState) => {
  return { photo, favs, errors }
}

export default connect(mapStateToProps, {
  fetchPhotoObject,
  addFavObject,
  deleteFav,
  getFavsFromDb,
})(App)

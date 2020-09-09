import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
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
import { DatePickerComp } from './DatePicker'
import FavSelect from './FavSelect'
import Frame from './Frame'
import Content from './Content'
import Header from './Header'
import { AppContainer, GrayButtonContainer } from '../styles/styles'

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

  // variable to disable next GrayButton
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

  const dateSetup = (val: any, val2: string) => {
    setCurDate(val2)
    // let dateObj = new Date(val2)
    // let momentObj = moment(dateObj)
    setCurDateObj(val)
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
            <p>click image to expand</p>
            <GrayButtonContainer>
              <Button ghost onClick={() => addFavObject(favConstruct)}>
                Set Favourite
              </Button>
              <DatePickerComp
                date={curDate}
                setDate={dateSetup}
                today={today}
                setDisplayFav={setDisplayFav}
              />
            </GrayButtonContainer>
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

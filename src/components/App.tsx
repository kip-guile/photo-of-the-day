import React, { useEffect, useState } from 'react'
import { Button, Spin, Rate } from 'antd'
import { CompressOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import moment from 'moment'
import './App.css'
import {
  fetchPhotoObject,
  PhotoObject,
  addFavObject,
  FavObject,
  deleteFav,
  getFavsFromDb,
  prevAndNextPhotos,
  PreviewObj,
} from '../actions'
import { StoreState } from '../reducers'
import { DatePickerComp } from './DatePicker'
import FavSelect from './FavSelect'
import Frame from './Frame'
import Content from './Content'
import Header from './Header'
import { AppContainer, GrayButtonContainer } from '../styles/styles'

// Describe prop structure for App component
interface AppProps {
  photo: PhotoObject
  favs: FavObject[]
  fetchPhotoObject(date: string): any
  addFavObject(fav: FavObject): any
  deleteFav(date: string): any
  getFavsFromDb(): any
  prevAndNextPhotos(prev: string, next: string): any
  previews: PreviewObj
}

const antIcon = <CompressOutlined style={{ fontSize: 24 }} spin />

function App({
  photo,
  favs,
  fetchPhotoObject,
  addFavObject,
  deleteFav,
  getFavsFromDb,
  prevAndNextPhotos,
  previews,
}: AppProps) {
  //Get persisted photo from localStorage and then parse to JSON
  const localphoto = localStorage.getItem('photo')
  const persistedPhoto = localphoto ? JSON.parse(localphoto) : null

  //moment.js initializations
  let momd = moment()
  let today = new Date().toISOString().substr(0, 10)

  // local slices of state and setters
  const [curDateObj, setCurDateObj] = useState(momd)
  const [curDate, setCurDate] = useState(today)
  const [favPhotoDate, setFavPhotoDate] = useState({})
  const [displayFav, setDisplayFav] = useState(false)

  // variable to disable next button
  const disableNext = curDate === today

  // helper for incrementing and decrementing date with side effects
  const change = (diff: number) => {
    let temp = curDateObj.add(diff, 'days')
    setCurDateObj(temp)
    setCurDate(curDateObj.format().substr(0, 10))
  }

  // increment and decrement date without side effects
  const handlePreview = (diff: number) => {
    let temp = curDateObj.add(diff, 'days')
    return temp.format().substr(0, 10)
  }

  useEffect(() => {
    //fetch photo object from NASA API
    fetchPhotoObject(curDate)
    //fetch favorite photos from noSQL database
    getFavsFromDb()
    // fetch previous and next photos from NASA API
    prevAndNextPhotos(handlePreview(-1), handlePreview(disableNext ? 1 : 2))
  }, [fetchPhotoObject, curDate, getFavsFromDb])

  // control photochsnges with date picker
  const dateSetup = (val: any, val2: string) => {
    setCurDate(val2)
    setCurDateObj(val)
  }

  // prepare favObject to be saved to noSQL database
  const favConstruct = {
    date: photo.date,
    explanation: photo.explanation,
    url: photo.url,
    title: photo.title,
    media_type: photo.media_type,
  }

  // get favorite image to display by filtering through favorites in the reducer, using date
  const favToDisplay = favs.filter(
    (fav: FavObject) => fav.date === favPhotoDate
  )

  // logic to determine what photo object gets rendered.
  let objToRender = displayFav
    ? favToDisplay[0]
    : photo.url
    ? photo
    : persistedPhoto

  // helper to handle deleting a favorited photo
  const handleDelete = (date: string) => {
    setDisplayFav(false)
    deleteFav(date)
  }
  return (
    <AppContainer>
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
            {displayFav ? (
              <div style={{ marginTop: '2rem' }}>
                <Rate disabled defaultValue={5} />
              </div>
            ) : null}
            <Frame
              disableNext={disableNext}
              mediaType={objToRender.media_type}
              setDisplayFav={setDisplayFav}
              change={change}
              imgurl={objToRender.url}
              title={objToRender.title}
              previews={previews}
              loading={photo.loading}
            />
            <p>Click images to expand</p>
            <GrayButtonContainer>
              <Button
                ghost
                disabled={displayFav}
                onClick={() => addFavObject(favConstruct)}
              >
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
            <Spin indicator={antIcon} />
          </div>
        )
      ) : (
        <Spin indicator={antIcon} />
      )}
    </AppContainer>
  )
}

const mapStateToProps = ({ photo, favs, previews }: StoreState) => {
  return { photo, favs, previews }
}

export default connect(mapStateToProps, {
  fetchPhotoObject,
  addFavObject,
  deleteFav,
  getFavsFromDb,
  prevAndNextPhotos,
})(App)

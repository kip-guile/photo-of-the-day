import React, { useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import { CompressOutlined } from '@ant-design/icons'
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

  const change = (diff: number) => {
    let temp = curDateObj.add(diff, 'days')
    setCurDateObj(temp)
    setCurDate(curDateObj.format().substr(0, 10))
  }

  const handlePreview = (diff: number) => {
    let temp = curDateObj.add(diff, 'days')
    return temp.format().substr(0, 10)
  }

  useEffect(() => {
    fetchPhotoObject(curDate)
    getFavsFromDb()
    prevAndNextPhotos(handlePreview(-1), handlePreview(disableNext ? 1 : 2))
  }, [fetchPhotoObject, curDate, getFavsFromDb])

  const dateSetup = (val: any, val2: string) => {
    setCurDate(val2)
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
              title={objToRender.title}
              previews={previews}
              loading={photo.loading}
            />
            <p>Click images to expand</p>
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

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
  deleteFav(date: string): any
  getFavsFromDb(): any
}

function App({
  photo,
  favs,
  fetchPhotoObject,
  addFavObject,
  deleteFav,
  getFavsFromDb,
}: AppProps) {
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

  const handleChange = (e: any) => {
    let { value } = e.target
    setFavPhotoDate(value)
    setDisplayFav(true)
  }
  const favToDisplay = favs.filter(
    (fav: FavObject) => fav.date === favPhotoDate
  )

  let objToRender = displayFav ? favToDisplay[0] : photo

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
            <Frame
              mediaType={objToRender.media_type}
              setDisplayFav={setDisplayFav}
              change={change}
              imgurl={objToRender.url}
            />
            {displayFav ? (
              <button onClick={() => handleDelete(favToDisplay[0].date)}>
                Delete Fav
              </button>
            ) : null}
            <ButtonContainer>
              <Button onClick={() => addFavObject(favConstruct)}>
                Set Favourite
              </Button>
              {favs.length === 0 ? null : (
                <label>
                  {' '}
                  Favorites:
                  <select
                    onChange={handleChange}
                    style={{ marginLeft: '10px' }}
                  >
                    <option selected>Select</option>
                    {favs.map((fav: FavObject) => (
                      <option key={fav.date} value={fav.date}>
                        {fav.title}
                      </option>
                    ))}
                  </select>
                </label>
              )}
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
            <h1>Loading...</h1>
          </div>
        )
      ) : (
        <div>Reload</div>
      )}
    </AppContainer>
  )
}

const mapStateToProps = ({ photo, favs }: StoreState) => {
  return { photo, favs }
}

export default connect(mapStateToProps, {
  fetchPhotoObject,
  addFavObject,
  deleteFav,
  getFavsFromDb,
})(App)

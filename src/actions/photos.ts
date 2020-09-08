import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionTypes } from './types'

const key = process.env.REACT_APP_NASA_API

export interface FavObject {
  date: string
  explanation: string
  url: string
  title: string
}

export interface PhotoObject {
  copyright: string
  date: string
  explanation: string
  hdurl: string
  media_type: string
  service_version: string
  title: string
  url: string
}

export interface fetchPhotoAction {
  type: ActionTypes.fetchPhoto
  payload: PhotoObject
}

export interface addFavAction {
  type: ActionTypes.addFav
  payload: FavObject
}

export interface deleteFavAction {
  type: ActionTypes.deleteFav
  payload: string
}

export const fetchPhotoObject = (date: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<PhotoObject>(
      `https://api.nasa.gov/planetary/apod?api_key=${key}&hd=false&date=${date}`
    )
    dispatch<fetchPhotoAction>({
      type: ActionTypes.fetchPhoto,
      payload: response.data,
    })
  }
}

export const addFavObject = (fav: FavObject): addFavAction => {
  return {
    type: ActionTypes.addFav,
    payload: fav,
  }
}

export const deleteFav = (date: string): deleteFavAction => {
  return {
    type: ActionTypes.deleteFav,
    payload: date,
  }
}

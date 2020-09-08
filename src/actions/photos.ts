import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionTypes } from './types'

const key = process.env.REACT_APP_NASA_API

export interface ErrorObject {
  deleteError: string
  addError: string
  nasaError: string
  getError: string
}

export interface FavObject {
  _id?: string
  date: string
  explanation: string
  url: string
  title: string
  media_type: string
  __v?: number
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
  payload: FavObject[]
}

export interface getFavsAction {
  type: ActionTypes.getFavs
  payload: FavObject[]
}

export interface addErrorAction {
  type:
    | ActionTypes.addGetError
    | ActionTypes.addNasaError
    | ActionTypes.addError
    | ActionTypes.addDeleteError
    | ActionTypes.addFav
    | ActionTypes.deleteFav
    | ActionTypes.fetchPhoto
    | ActionTypes.getFavs
  payload: string
}

export const fetchPhotoObject = (date: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<PhotoObject>(
        `https://api.nasa.gov/planetary/apod?api_key=${key}&hd=false&date=${date}`
      )
      window.localStorage.setItem('photo', JSON.stringify(response.data))
      dispatch<fetchPhotoAction>({
        type: ActionTypes.fetchPhoto,
        payload: response.data,
      })
    } catch (err) {
      dispatch<addErrorAction>({
        type: ActionTypes.addNasaError,
        payload: err.message,
      })
    }
  }
}

export const getFavsFromDb = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        'https://potd-server.herokuapp.com/api/photos'
      )
      dispatch<getFavsAction>({
        type: ActionTypes.getFavs,
        payload: response.data,
      })
    } catch (err) {
      dispatch<addErrorAction>({
        type: ActionTypes.addGetError,
        payload: err.message,
      })
    }
  }
}

export const addFavObject = (fav: FavObject) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `https://potd-server.herokuapp.com/api/photos/`,
        fav
      )
      dispatch<addFavAction>({
        type: ActionTypes.addFav,
        payload: response.data,
      })
    } catch (err) {
      dispatch<addErrorAction>({
        type: ActionTypes.addError,
        payload: err.message,
      })
    }
  }
}

export const deleteFav = (date: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.delete(
        `https://potd-server.herokuapp.com/api/photos/${date}`
      )
      dispatch<deleteFavAction>({
        type: ActionTypes.deleteFav,
        payload: response.data,
      })
    } catch (err) {
      dispatch<addErrorAction>({
        type: ActionTypes.addDeleteError,
        payload: err.message,
      })
    }
  }
}

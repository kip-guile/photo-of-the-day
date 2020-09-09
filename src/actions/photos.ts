import axios from 'axios'
import { message } from 'antd'
import { Dispatch } from 'redux'
import { ActionTypes } from './types'

const key = process.env.REACT_APP_NASA_API

//INTERFACE DESCRIPTIONS
export interface FavObject {
  _id?: string
  date: string
  explanation: string
  url: string
  title: string
  media_type: string
  __v?: number
}

export interface PreviewObj {
  previous: string
  next: string
}

export interface PhotoReducerObject {
  copyright: string
  date: string
  explanation: string
  hdurl: string
  media_type: string
  service_version: string
  title: string
  url: string
  loading: boolean
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
  loading?: boolean
}

//ACTION INTERFACES
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

export interface addPrevAndNext {
  type: ActionTypes.addPreview
  payload: PreviewObj
}

export interface isLoadingAction {
  type: ActionTypes.isLoading
}

export interface failedRequest {
  type: ActionTypes.failedRequest
}

//ERROR MESSAGE DISPLAY HELPERS
const success = (msg: string) => {
  message.success(msg, 3)
}

const error = (err: string, msg: string) => {
  message.error(`${err}: ${msg}`, 5)
}

// Fetch photo data object from NASA api
export const fetchPhotoObject = (date: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<isLoadingAction>({
      type: ActionTypes.isLoading,
    })
    try {
      const response = await axios.get<PhotoObject>(
        `https://api.nasa.gov/planetary/apod?api_key=${key}&hd=false&date=${date}`
      )
      // persist response in localStorage
      window.localStorage.setItem('photo', JSON.stringify(response.data))
      // dispatch response to reducers
      dispatch<fetchPhotoAction>({
        type: ActionTypes.fetchPhoto,
        payload: response.data,
      })
    } catch (err) {
      // catch and handle errors
      error(err.message, 'request from nasa api failed')
      dispatch<failedRequest>({
        type: ActionTypes.failedRequest,
      })
    }
  }
}

// get favorite photos from noSQL database
export const getFavsFromDb = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        'https://potd-server.herokuapp.com/api/photos'
      )
      // dispatch response to reducers
      dispatch<getFavsAction>({
        type: ActionTypes.getFavs,
        payload: response.data,
      })
    } catch (err) {
      // catch and handle errors
      error(err.message, 'request from nosql database failed')
    }
  }
}

// save photoObject to noSQL database
export const addFavObject = (fav: FavObject) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `https://potd-server.herokuapp.com/api/photos/`,
        fav
      )
      // dispatch response to reducers
      dispatch<addFavAction>({
        type: ActionTypes.addFav,
        payload: response.data,
      })
      success('saved')
    } catch (err) {
      // catch and handle errors
      error(err.message, 'failed to save photo')
    }
  }
}

// delete a photo saved to noSQL Database
export const deleteFav = (date: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.delete(
        `https://potd-server.herokuapp.com/api/photos/${date}`
      )
      // dispatch response to reducers
      dispatch<deleteFavAction>({
        type: ActionTypes.deleteFav,
        payload: response.data,
      })
      success('deleted')
    } catch (err) {
      // catch and handle errors
      error(err.message, 'failed to delete photo')
    }
  }
}

// get previous and next photos from NASA API
export const prevAndNextPhotos = (prev: string, next: string) => {
  // async function that resolves only when both calls are successful
  return async (dispatch: Dispatch) => {
    try {
      const prevPromise = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${key}&hd=false&date=${prev}`
      )
      const nextPromise = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${key}&hd=false&date=${next}`
      )
      // dispatch response to reducers
      dispatch<addPrevAndNext>({
        type: ActionTypes.addPreview,
        payload: {
          previous: prevPromise.data.url,
          next: nextPromise.data.url,
        },
      })
    } catch (err) {
      // catch and handle errors
      error(err.message, 'failed to retrieve previews')
    }
  }
}

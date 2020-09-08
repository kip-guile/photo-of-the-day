import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionTypes } from './types'

const key = process.env.REACT_APP_NASA_API

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

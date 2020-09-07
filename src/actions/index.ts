import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionTypes } from './types'

interface PhotoObject {
  copyright: string
  date: string
  explanation: string
  hdurl: string
  media_type: string
  service_version: string
  title: string
  url: string
}

export const fetchPhotoObject = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<PhotoObject[]>(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`
    )
    dispatch({
      type: ActionTypes.fetchPhoto,
      payload: response.data,
    })
  }
}

import { PhotoObject, fetchPhotoAction } from '../actions'
import { ActionTypes } from '../actions/types'

const initialState = {
  copyright: '',
  date: '',
  explanation: '',
  hdurl: '',
  media_type: '',
  service_version: '',
  title: '',
  url: '',
}

export const photoReducer = (
  state: PhotoObject = initialState,
  action: fetchPhotoAction
) => {
  switch (action.type) {
    case ActionTypes.fetchPhoto:
      return action.payload
    default:
      return state
  }
}

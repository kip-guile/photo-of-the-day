import {
  PhotoReducerObject,
  fetchPhotoAction,
  isLoadingAction,
  failedRequest,
} from '../actions'
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
  loading: false,
}

export const photoReducer = (
  state: PhotoReducerObject = initialState,
  action: fetchPhotoAction | isLoadingAction | failedRequest
) => {
  switch (action.type) {
    case ActionTypes.isLoading:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.fetchPhoto:
      return {
        ...action.payload,
        loading: false,
      }
    case ActionTypes.failedRequest:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

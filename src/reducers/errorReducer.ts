import { addErrorAction, ErrorObject } from '../actions'
import { ActionTypes } from '../actions/types'

const initialState = {
  deleteError: '',
  addError: '',
  nasaError: '',
  getError: '',
}

export const errorReducer = (
  state: ErrorObject = initialState,
  action: addErrorAction
) => {
  switch (action.type) {
    case ActionTypes.addError:
      return { ...state, addError: action.payload }
    case ActionTypes.addDeleteError:
      return { ...state, deleteError: action.payload }
    case ActionTypes.addGetError:
      return { ...state, getError: action.payload }
    case ActionTypes.addNasaError:
      return { ...state, nasaError: action.payload }
    case ActionTypes.fetchPhoto:
      return { ...initialState }
    case ActionTypes.getFavs:
      return { ...initialState }
    case ActionTypes.deleteFav:
      return { ...initialState }
    case ActionTypes.addFav:
      return { ...initialState }
    default:
      return state
  }
}

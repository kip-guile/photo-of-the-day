import { FavObject, addFavAction } from '../actions'
import { ActionTypes } from '../actions/types'

export const favReducer = (state: FavObject[] = [], action: addFavAction) => {
  switch (action.type) {
    case ActionTypes.addFav:
      return [...state, action.payload]
    default:
      return state
  }
}

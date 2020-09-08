import {
  FavObject,
  addFavAction,
  deleteFavAction,
  getFavsAction,
} from '../actions'
import { ActionTypes } from '../actions/types'

export const favReducer = (
  state: FavObject[] = [],
  action: addFavAction | deleteFavAction | getFavsAction
) => {
  switch (action.type) {
    case ActionTypes.getFavs:
      return action.payload
    case ActionTypes.addFav:
      return [...state, action.payload]
    case ActionTypes.deleteFav:
      return action.payload
    default:
      return state
  }
}

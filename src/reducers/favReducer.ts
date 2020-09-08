import { FavObject, addFavAction, deleteFavAction } from '../actions'
import { ActionTypes } from '../actions/types'

export const favReducer = (
  state: FavObject[] = [],
  action: addFavAction | deleteFavAction
) => {
  switch (action.type) {
    case ActionTypes.addFav:
      return [...state, action.payload]
    case ActionTypes.deleteFav:
      return state.filter((fav: FavObject) => fav.date !== action.payload)
    default:
      return state
  }
}

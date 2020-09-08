import { combineReducers } from 'redux'
import { photoReducer } from './photoReducer'
import { favReducer } from './favReducer'
import { errorReducer } from './errorReducer'
import { PhotoObject, FavObject, ErrorObject } from '../actions'

export interface StoreState {
  photo: PhotoObject
  favs: FavObject[]
  errors: ErrorObject
}

export const rootReducer = combineReducers<StoreState>({
  photo: photoReducer,
  favs: favReducer,
  errors: errorReducer,
})

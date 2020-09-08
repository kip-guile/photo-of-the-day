import { combineReducers } from 'redux'
import { photoReducer } from './photoReducer'
import { favReducer } from './favReducer'
import { PhotoObject, FavObject } from '../actions'

export interface StoreState {
  photo: PhotoObject
  favs: FavObject[]
}

export const rootReducer = combineReducers<StoreState>({
  photo: photoReducer,
  favs: favReducer,
})

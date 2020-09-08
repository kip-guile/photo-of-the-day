import { combineReducers } from 'redux'
import { photoReducer } from './photoReducer'
import { PhotoObject } from '../actions'

export interface StoreState {
  photo: PhotoObject
}

export const rootReducer = combineReducers<StoreState>({
  photo: photoReducer,
})

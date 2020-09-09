import { combineReducers } from 'redux'
import { photoReducer } from './photoReducer'
import { favReducer } from './favReducer'
import { previewReducer } from './previewReducer'
import { PhotoReducerObject, FavObject, PreviewObj } from '../actions'

export interface StoreState {
  photo: PhotoReducerObject
  favs: FavObject[]
  previews: PreviewObj
}

export const rootReducer = combineReducers<StoreState>({
  photo: photoReducer,
  favs: favReducer,
  previews: previewReducer,
})

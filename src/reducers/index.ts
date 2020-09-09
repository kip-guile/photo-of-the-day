import { combineReducers } from 'redux'
import { photoReducer } from './photoReducer'
import { favReducer } from './favReducer'
import { errorReducer } from './errorReducer'
import { previewReducer } from './previewReducer'
import { PhotoObject, FavObject, ErrorObject, PreviewObj } from '../actions'

export interface StoreState {
  photo: PhotoObject
  favs: FavObject[]
  errors: ErrorObject
  previews: PreviewObj
}

export const rootReducer = combineReducers<StoreState>({
  photo: photoReducer,
  favs: favReducer,
  errors: errorReducer,
  previews: previewReducer,
})

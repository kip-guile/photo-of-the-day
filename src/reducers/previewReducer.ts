import { addPrevAndNext, PreviewObj } from '../actions'
import { ActionTypes } from '../actions/types'

const initialState = {
  previous: '',
  next: '',
}

export const previewReducer = (
  state: PreviewObj = initialState,
  action: addPrevAndNext
) => {
  switch (action.type) {
    case ActionTypes.addPreview:
      return {
        next: action.payload.next,
        previous: action.payload.previous,
      }
    default:
      return state
  }
}

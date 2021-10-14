import {
  CLIENT_GET_REQUEST,
  CLIENT_GET_SUCCESS,
  CLIENT_GET_FAIL,
} from '../constants/clientConstants'

export const getClientReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENT_GET_REQUEST:
      return { loading: true }
    case CLIENT_GET_SUCCESS:
      return { loading: false, clientInfo: action.payload }
    case CLIENT_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

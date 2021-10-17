import {
  CLIENT_GET_REQUEST,
  CLIENT_GET_SUCCESS,
  CLIENT_GET_FAIL,
  CLIENT_ALL_GET_REQUEST,
  CLIENT_ALL_GET_SUCCESS,
  CLIENT_ALL_GET_FAIL,
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

export const getAllClientsReducer = (state = { allClients: [] }, action) => {
  switch (action.type) {
    case CLIENT_ALL_GET_REQUEST:
      return { loading: true }
    case CLIENT_ALL_GET_SUCCESS:
      return { loading: false, allClients: action.payload }
    case CLIENT_ALL_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

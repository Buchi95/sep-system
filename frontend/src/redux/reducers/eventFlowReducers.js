import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  GET_EVENT_BY_STATUS_REQUEST,
  GET_EVENT_BY_STATUS_SUCCESS,
  GET_EVENT_BY_STATUS_FAIL,
  UPDATE_EVENT_REQUEST_STATUS_REQUEST,
  UPDATE_EVENT_REQUEST_STATUS_SUCCESS,
  UPDATE_EVENT_REQUEST_STATUS_FAIL,
} from '../constants/eventFlowConstants'

export const createEventRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
      return { loading: true }
    case CREATE_EVENT_SUCCESS:
      return { loading: false, success: true, eventRequestInfo: action.payload }
    case CREATE_EVENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getEventRequestStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT_BY_STATUS_REQUEST:
      return { loading: true }
    case GET_EVENT_BY_STATUS_SUCCESS:
      return { loading: false, eventRequestInfoByStatus: action.payload }
    case GET_EVENT_BY_STATUS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateEventRequestStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EVENT_REQUEST_STATUS_REQUEST:
      return { loading: true }
    case UPDATE_EVENT_REQUEST_STATUS_SUCCESS:
      return { loading: false, updatedEventRequest: action.payload }
    case UPDATE_EVENT_REQUEST_STATUS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

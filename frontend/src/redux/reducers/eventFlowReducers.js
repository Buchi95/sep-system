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
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAIL,
  EVENT_STATUS_REQUEST,
  EVENT_STATUS_SUCCESS,
  EVENT_STATUS_FAIL,
  EVENT_BY_ID_REQUEST,
  EVENT_BY_ID_SUCCESS,
  EVENT_BY_ID_FAIL,
} from '../constants/eventFlowConstants'

// request for event
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

// event creation after request is approved
export const createEventReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_REQUEST:
      return { loading: true }
    case EVENT_SUCCESS:
      return { loading: false, success: true, eventInfo: action.payload }
    case EVENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getEventStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_STATUS_REQUEST:
      return { loading: true }
    case EVENT_STATUS_SUCCESS:
      return { loading: false, eventInfoByStatus: action.payload }
    case EVENT_STATUS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getEventByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_BY_ID_REQUEST:
      return { loading: true }
    case EVENT_BY_ID_SUCCESS:
      return { loading: false, eventbyId: action.payload }
    case EVENT_BY_ID_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
} from '../constants/eventFlowConstants'

export const createEventRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
      return { loading: true }
    case CREATE_EVENT_SUCCESS:
      return { loading: false, eventRequestInfo: action.payload }
    case CREATE_EVENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

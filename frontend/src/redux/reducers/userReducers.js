import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  DPT_USERS_REQUEST,
  DPT_USERS_SUCCESS,
  DPT_USERS_FAIL,
  ASSIGN_TASK_REQUEST,
  ASSIGN_TASK_SUCCESS,
  ASSIGN_TASK_FAIL,
  GET_ALL_TASKS_FOR_EVENT_REQUEST,
  GET_ALL_TASKS_FOR_EVENT_SUCCESS,
  GET_ALL_TASKS_FOR_EVENT_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const dptUsersReducer = (state = { dpUsers: [] }, action) => {
  switch (action.type) {
    case DPT_USERS_REQUEST:
      return { ...state, loading: true }
    case DPT_USERS_SUCCESS:
      return { loading: false, dpUsers: action.payload }
    case DPT_USERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const assignTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSIGN_TASK_REQUEST:
      return { loading: true }
    case ASSIGN_TASK_SUCCESS:
      return { loading: false, success: true, message: action.payload }
    case ASSIGN_TASK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getAllTasksReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case GET_ALL_TASKS_FOR_EVENT_REQUEST:
      return { loading: true }
    case GET_ALL_TASKS_FOR_EVENT_SUCCESS:
      return { loading: false, tasks: action.payload }
    case GET_ALL_TASKS_FOR_EVENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

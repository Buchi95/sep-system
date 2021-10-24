import {
  // post
  EXTRA_BUDGET_REQUEST,
  EXTRA_BUDGET_SUCCESS,
  EXTRA_BUDGET_FAIL,
  EXTRA_STAFF_REQUEST,
  EXTRA_STAFF_SUCCESS,
  EXTRA_STAFF_FAIL,
  // get
  GET_BUDGETS_REQUEST,
  GET_BUDGETS_SUCCESS,
  GET_BUDGETS_FAIL,
  GET_STAFFS_REQUEST,
  GET_STAFFS_SUCCESS,
  GET_STAFFS_FAIL,
  // update
  UPDATE_BUDGET_REQUEST,
  UPDATE_BUDGET_SUCCESS,
  UPDATE_BUDGET_FAIL,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_FAIL,
} from '../constants/requestConstants'

export const extraBudgetReducer = (state = {}, action) => {
  switch (action.type) {
    case EXTRA_BUDGET_REQUEST:
      return { loading: true }
    case EXTRA_BUDGET_SUCCESS:
      return { loading: false, budget: action.payload }
    case EXTRA_BUDGET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const extraStaffReducer = (state = {}, action) => {
  switch (action.type) {
    case EXTRA_STAFF_REQUEST:
      return { loading: true }
    case EXTRA_STAFF_SUCCESS:
      return { loading: false, staff: action.payload }
    case EXTRA_STAFF_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getExtraBudgetsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BUDGETS_REQUEST:
      return { loading: true }
    case GET_BUDGETS_SUCCESS:
      return { loading: false, budgets: action.payload }
    case GET_BUDGETS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getExtraStaffsReducer = (state = { allClients: [] }, action) => {
  switch (action.type) {
    case GET_STAFFS_REQUEST:
      return { loading: true }
    case GET_STAFFS_SUCCESS:
      return { loading: false, staffs: action.payload }
    case GET_STAFFS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateExtraStaffRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STAFF_REQUEST:
      return { loading: true }
    case UPDATE_STAFF_SUCCESS:
      return { loading: false, message: action.payload }
    case UPDATE_STAFF_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateExtraBudgetRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BUDGET_REQUEST:
      return { loading: true }
    case UPDATE_BUDGET_SUCCESS:
      return { loading: false, message: action.payload }
    case UPDATE_BUDGET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

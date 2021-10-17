import {
  EXTRA_BUDGET_REQUEST,
  EXTRA_BUDGET_SUCCESS,
  EXTRA_BUDGET_FAIL,
  EXTRA_STAFF_REQUEST,
  EXTRA_STAFF_SUCCESS,
  EXTRA_STAFF_FAIL,
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

export const extraStaffReducer = (state = { allClients: [] }, action) => {
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

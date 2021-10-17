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
} from '../constants/requestConstants'

import axios from 'axios'

// post budget and staff

export const addExtraBudgetRequest =
  ({ requestingDepartment, projectRef, requiredAmount, reason, status }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EXTRA_BUDGET_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/request/budget`,
        { requestingDepartment, projectRef, requiredAmount, reason, status },
        config
      )

      dispatch({
        type: EXTRA_BUDGET_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EXTRA_BUDGET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const addExtraStaffRequest =
  ({
    requestingDepartment,
    projectRef,
    contract,
    experience,
    jobTitle,
    jobDescription,
    status,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EXTRA_STAFF_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/request/staff`,
        {
          requestingDepartment,
          projectRef,
          contract,
          experience,
          jobTitle,
          jobDescription,
          status,
        },
        config
      )

      dispatch({
        type: EXTRA_STAFF_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EXTRA_STAFF_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

// get budget and staff

export const getExtraBudgetsRequest = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_BUDGETS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/request/budget`, config)

    dispatch({
      type: GET_BUDGETS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_BUDGETS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getExtraStaffsRequest = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_STAFFS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/request/staff`, config)

    dispatch({
      type: GET_STAFFS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_STAFFS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

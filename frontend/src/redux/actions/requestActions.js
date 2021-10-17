import {
  EXTRA_BUDGET_REQUEST,
  EXTRA_BUDGET_SUCCESS,
  EXTRA_BUDGET_FAIL,
  EXTRA_STAFF_REQUEST,
  EXTRA_STAFF_SUCCESS,
  EXTRA_STAFF_FAIL,
} from '../constants/requestConstants'

import axios from 'axios'

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

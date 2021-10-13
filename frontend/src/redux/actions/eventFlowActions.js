import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  GET_EVENT_BY_STATUS_REQUEST,
  GET_EVENT_BY_STATUS_SUCCESS,
  GET_EVENT_BY_STATUS_FAIL,
} from '../constants/eventFlowConstants'

import axios from 'axios'

export const createEventReq =
  (
    clientName,
    clientContact,
    eventType,
    from,
    to,
    numOfAttendees,
    expectedBudget,
    preferences,
    eventRequestStatus = 1,
    employee
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_EVENT_REQUEST,
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
        '/api/event/request',
        {
          clientName,
          clientContact,
          eventType,
          from,
          to,
          numOfAttendees,
          expectedBudget,
          preferences,
          eventRequestStatus,
          employee,
        },
        config
      )

      dispatch({
        type: CREATE_EVENT_SUCCESS,
        payload: data,
      })

      localStorage.setItem('eventRequestInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: CREATE_EVENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getEventRequestStatus =
  (eventRequestStatus) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_EVENT_BY_STATUS_REQUEST,
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

      const { data } = await axios.get(
        `/api/event/request/${eventRequestStatus}`,
        config
      )

      dispatch({
        type: GET_EVENT_BY_STATUS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: GET_EVENT_BY_STATUS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

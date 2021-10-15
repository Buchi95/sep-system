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
} from '../constants/eventFlowConstants'

import axios from 'axios'

// // request for event
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

      const { data } =
        eventRequestStatus !== '1' && eventRequestStatus !== '3'
          ? await axios.get(`/api/event/request/${eventRequestStatus}`, config)
          : await axios.get(`/api/event/request`, config)

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

export const updateEventRequestStatus =
  (id, eventRequestStatus) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_EVENT_REQUEST_STATUS_REQUEST,
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

      const { data } = await axios.put(
        `/api/event/request`,
        { id, eventRequestStatus },
        config
      )

      dispatch({
        type: UPDATE_EVENT_REQUEST_STATUS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_EVENT_REQUEST_STATUS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

// event creation after request is approved
export const createEve =
  (
    clientName,
    clientContact,
    eventType,
    description,
    from,
    to,
    numOfAttendees,
    plannedBudget,
    preferences,
    eventStatus,
    employee
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EVENT_REQUEST,
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
        '/api/detailedevent',
        {
          clientName,
          clientContact,
          eventType,
          description,
          from,
          to,
          numOfAttendees,
          plannedBudget,
          preferences,
          eventStatus,
          employee,
        },
        config
      )

      dispatch({
        type: EVENT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EVENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

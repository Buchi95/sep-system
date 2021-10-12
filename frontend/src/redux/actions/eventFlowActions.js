import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
} from '../constants/eventFlowConstants'

import axios from 'axios'

export const createEvent =
  (
    clientName,
    clientContact,
    eventType,
    from,
    to,
    numOfAttendees,
    expectedBudget,
    preferences,
    eventRequestStatus = 1
  ) =>
  async (dispatch) => {
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

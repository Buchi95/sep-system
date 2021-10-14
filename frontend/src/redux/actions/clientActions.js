import {
  CLIENT_GET_REQUEST,
  CLIENT_GET_SUCCESS,
  CLIENT_GET_FAIL,
} from '../constants/clientConstants'

import axios from 'axios'

export const getClientInfo = (client) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_GET_REQUEST,
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

    const { data } = await axios.get(`/api/client/${client}`, config)

    dispatch({
      type: CLIENT_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CLIENT_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

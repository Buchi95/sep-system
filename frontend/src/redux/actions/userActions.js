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
  EDIT_TASK_REQUEST,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAIL,
} from '../constants/userConstants'

import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')

  dispatch({
    type: USER_LOGOUT,
  })

  dispatch({
    type: USER_DETAILS_RESET,
  })
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// get users by dpt
export const getDptUsers = (dpt) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DPT_USERS_REQUEST,
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

    const { data } = await axios.get(`/api/users/dpt/${dpt}`, config)

    dispatch({
      type: DPT_USERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DPT_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// assign task to employee
export const assignTaskToEmployee =
  ({ employee, subject, description, priority, active, projectRef }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ASSIGN_TASK_REQUEST,
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
        `/api/users`,
        { employee, subject, description, priority, active, projectRef },
        config
      )

      dispatch({
        type: ASSIGN_TASK_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ASSIGN_TASK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

// get all tasks for event
export const getAllTasksforEvent = (id, dpt) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_TASKS_FOR_EVENT_REQUEST,
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
      `/api/users/tasks/all/${id}&${dpt}`,
      config
    )

    dispatch({
      type: GET_ALL_TASKS_FOR_EVENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_TASKS_FOR_EVENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// edit task to employee
export const editTaskEmployee =
  ({ employee, taskid, extra, planned, feedback }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_TASK_REQUEST,
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
        `/api/users/task/`,
        { employee, taskid, extra, planned, feedback },
        config
      )

      dispatch({
        type: EDIT_TASK_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EDIT_TASK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

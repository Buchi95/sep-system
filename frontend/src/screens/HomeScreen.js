import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const HomeScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <>
      <h1>Home</h1>
      {userInfo && userInfo.role === 'Customer_Service' && (
        <Link className='btn btn-dark my-3' to='/event/request/create'>
          Create New Event Request
        </Link>
      )}

      {userInfo && userInfo.role === 'Senior_Customer_Service_Officer' && (
        <Link className='btn btn-dark my-3' to='/event/request/review/1'>
          Event Requests Review
        </Link>
      )}

      {userInfo && userInfo.role === 'Financial_Manager' && (
        <Link className='btn btn-dark my-3' to='/event/request/review/2'>
          Event Requests Review
        </Link>
      )}

      {userInfo && userInfo.role === 'Administration_Manager' && (
        <Link className='btn btn-dark my-3' to='/event/request/review/3'>
          Event Requests Review
        </Link>
      )}
    </>
  )
}

export default HomeScreen

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

const HomeScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
    }
  }, [history, userInfo])

  return (
    <>
      <h1>Home</h1>
      <Link className='btn btn-dark my-3' to='/event/request/create'>
        Create New Event Request
      </Link>
    </>
  )
}

export default HomeScreen

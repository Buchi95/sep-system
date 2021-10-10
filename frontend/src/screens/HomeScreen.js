import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

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
    </>
  )
}

export default HomeScreen

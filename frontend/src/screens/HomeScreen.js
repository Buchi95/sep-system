import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ClientRequestDetails from './ClientRequestDetails'
import RecruitmentRequestScreen from './RecruitmentRequestScreen'
import MyTasksScreen from './MyTasksScreen'
import ManagerTasksScreen from './ManagerTasksScreen'

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
      <ManagerTasksScreen />
    </>
  )
}

export default HomeScreen

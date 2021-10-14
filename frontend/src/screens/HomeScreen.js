import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ClientRequestDetails from './ClientRequestDetails'
import RecruitmentRequestScreen from './RecruitmentRequestScreen'
import SubTeamTasksScreen from './SubTeamTasksScreen'

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
      <SubTeamTasksScreen />
      <ClientRequestDetails />
    </>
  )
}

export default HomeScreen

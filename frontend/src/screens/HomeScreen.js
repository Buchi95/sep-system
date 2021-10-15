import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Row } from 'react-bootstrap'

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
      <h4>{`${userInfo && userInfo.department.replaceAll('_', ' ')}`}</h4>
      {userInfo && userInfo.role === 'Customer_Service' && (
        <>
          <br />
          <Row md={3}>
            <Link className='btn btn-dark my-3' to='/event/request/create'>
              Create New Event Request
            </Link>
          </Row>
          <br />
        </>
      )}

      {userInfo && userInfo.role === 'Senior_Customer_Service_Officer' && (
        <>
          <br />
          <Row md={3}>
            <Link className='btn btn-dark my-3' to='/event/requests/1'>
              Event Requests Review
            </Link>
          </Row>
          <br />
          <Row md={3}>
            <Link className='btn btn-dark my-3' to='/'>
              Client Records
            </Link>
          </Row>
        </>
      )}

      {userInfo && userInfo.role === 'Financial_Manager' && (
        <Link className='btn btn-dark my-3' to='/event/requests/2'>
          Event Requests Review
        </Link>
      )}

      {userInfo && userInfo.role === 'Administration_Manager' && (
        <Link className='btn btn-dark my-3' to='/event/requests/3'>
          Event Requests Review
        </Link>
      )}

      {userInfo &&
        (userInfo.role === 'Production_Manager' ||
          userInfo.role === 'Services_Manager') && (
          <>
            <br />
            <Row>
              <Row md={3}>
                <Link className='btn btn-dark my-3' to='/events'>
                  Current Events
                </Link>
              </Row>
              <br />
              <Row md={3}>
                <Link className='btn btn-dark my-3' to='/events/subteam'>
                  Initiate Sub Team Tasks
                </Link>
              </Row>
              <br />
              <Row md={3}>
                <Link className='btn btn-dark my-3' to='/'>
                  New Resource Request
                </Link>
              </Row>
              <br />
              <Row md={3}>
                <Link className='btn btn-dark my-3' to='/'>
                  Extra Budget Requests
                </Link>
              </Row>
              <br />
              <Row md={3}>
                <Link className='btn btn-dark my-3' to='/'>
                  Staff Schedule
                </Link>
              </Row>
            </Row>
          </>
        )}
    </>
  )
}

export default HomeScreen

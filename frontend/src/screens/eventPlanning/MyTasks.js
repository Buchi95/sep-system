import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Button, Table } from 'react-bootstrap'

import { getUserDetails } from '../../redux/actions/userActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const MyTasks = ({ history }) => {
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || userInfo.subdepartment.length === 0) {
      history.push('/login')
    } else {
      dispatch(getUserDetails('profile'))
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Link className='btn btn-dark' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>My Tasks</h1>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>TASK SUBJECT</th>
                  <th>Priority</th>
                  <th>Sender</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {user &&
                  user.tasks &&
                  user.tasks.length > 0 &&
                  user.tasks.map((task) => (
                    <tr key={task._id}>
                      <td>{task.subject}</td>
                      <td>{task.priority}</td>
                      <td>
                        {userInfo.department === 'Production_Department'
                          ? 'Jack'
                          : 'Natalie'}
                      </td>
                      <td>
                        <Button variant='primary' className='btn-sm'>
                          <i className='fas fa-info-circle'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </>
      )}
    </>
  )
}

export default MyTasks

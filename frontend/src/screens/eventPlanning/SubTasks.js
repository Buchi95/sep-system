import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'

import { getAllTasksforEvent } from '../../redux/actions/userActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const SubTasks = ({ history }) => {
  const dispatch = useDispatch()

  const location = useLocation()

  const { event } = location.state ? location.state : {}

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getAllTasks = useSelector((state) => state.getAllTasks)
  const { loading: loadingT, error: errorT, tasks } = getAllTasks

  console.log(tasks)

  useEffect(() => {
    if (
      !userInfo ||
      (userInfo.role !== 'Production_Manager' &&
        userInfo.role !== 'Services_Manager')
    ) {
      history.push('/login')
    } else {
      if (userInfo.role === 'Production_Manager') {
        dispatch(getAllTasksforEvent(event._id, 'Production_Department'))
      } else if (userInfo.role === 'Services_Manager') {
        dispatch(getAllTasksforEvent(event._id, 'Services_Department'))
      }
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Link className='btn btn-primary my-3' to='/events'>
        Go Back
      </Link>
      <Link
        style={{ float: 'right' }}
        className='btn btn-primary my-3'
        to={{
          pathname: `subtasks/create`,
          state: {
            event: event,
          },
        }}
      >
        Create a New Task
      </Link>
      <br /> <br />
      <Row mb={3}>
        <Row>
          <h2>Event Info</h2>
        </Row>
        <Row>
          <Col>
            <h5>{event.description}</h5>
          </Col>
          <Col>
            <h5>{event.eventType}</h5>
          </Col>
          <Col>
            <h5>{event.from.substring(0, 10)}</h5>
          </Col>
          <Col>
            <h5>{event.to.substring(0, 10)}</h5>
          </Col>
        </Row>
      </Row>
      <br /> <br />
      {loadingT ? (
        <Loader />
      ) : errorT ? (
        <Message variant='danger'>{errorT}</Message>
      ) : (
        <>
          <Row className='align-items-center'>
            <Col>
              <h2>Current Event Sub Tasks</h2>
            </Col>
          </Row>

          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>TASK SUBJECT</th>
                <th>PRIORITY</th>
                <th>ASSIGNED TO</th>
                <th>STATUS</th>
                <th>REVIEW</th>
              </tr>
            </thead>
            <tbody>
              {tasks &&
                tasks.map((task) => (
                  <tr key={task['task']._id}>
                    <td>{task['task'].subject}</td>
                    <td>{task['task'].priority}</td>
                    <td>{task.user}</td>
                    <td>
                      <i
                        style={{
                          color:
                            task['task'].feedback === 0
                              ? 'grey'
                              : task['task'].feedback === 1
                              ? 'green'
                              : task['task'].feedback === 2
                              ? 'red'
                              : task['task'].feedback === 22
                              ? 'green'
                              : 'green',
                        }}
                        className='fas fa-circle fa-2x fa-align-justify'
                      ></i>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: `events/subtasks/review`,
                          state: {
                            task: task,
                          },
                        }}
                      >
                        <Button variant='primary' className='btn-sm'>
                          <i className='fas fa-info-circle'></i>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default SubTasks

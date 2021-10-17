import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Row, Col, ListGroup, Container } from 'react-bootstrap'

const ReviewSubTask = ({ history }) => {
  const location = useLocation()

  const { task } = location.state ? location.state : {}
  const { event } = location.state ? location.state : {}

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (
      !userInfo ||
      (userInfo.role !== 'Production_Manager' &&
        userInfo.role !== 'Services_Manager')
    ) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <>
      <Link
        style={{ position: 'absolute', marginTop: 0 }}
        className='btn btn-primary my-1'
        to={{
          pathname: `/events/subtasks`,
          state: {
            task: task,
            event: event,
          },
        }}
      >
        Go Back
      </Link>

      <>
        <Container>
          <Row className='justify-content-md-center'>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row md={1}>
                    <Col md={4}>
                      <h4>Task</h4>
                      <p>{task['task'].subject}</p>
                    </Col>
                    <Col>
                      <h4>Task Status</h4>
                      <Row>
                        <Col>
                          <p>
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
                                marginRight: 10,
                              }}
                              className='fas fa-circle fa-2x fa-align-justify'
                            ></i>
                          </p>
                        </Col>
                        <Col>
                          {task['task'].feedback === 0
                            ? 'Initiated'
                            : task['task'].feedback === 1
                            ? 'Fine and Nothing needed'
                            : task['task'].feedback === 2
                            ? 'Extra Resources Required'
                            : task['task'].feedback === 22
                            ? 'Fine and Requests resolved'
                            : 'Closed'}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col md={4}>
                      <h4>Task Assigned To</h4>
                      <p>{task.user}</p>
                    </Col>
                    <Col md={4}>
                      <h4>Task Priority</h4>
                      <p>{task['task'].priority}</p>
                    </Col>
                    <Col md={4}>
                      <h4>Task Progress</h4>
                      <p>{task['task'].active === true ? 'Active' : 'Done'}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h4>Description</h4>
                      <p>{task['task'].description}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>Extra Requirements</h4>
                      <p>{task['task'].extra}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h4>Planned Activities</h4>
                      <p>{task['task'].planned}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </>
    </>
  )
}

export default ReviewSubTask

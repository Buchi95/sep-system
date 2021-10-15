import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, ListGroup, Container } from 'react-bootstrap'

import { getClientInfo } from '../../redux/actions/clientActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const EventDetail = ({ history }) => {
  const dispatch = useDispatch()

  const location = useLocation()

  const { event } = location.state ? location.state : {}
  const { client } = location.state ? location.state : {}

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getClient = useSelector((state) => state.getClient)
  const { loading, error, clientInfo } = getClient

  useEffect(() => {
    if (
      !userInfo ||
      (userInfo.role !== 'Senior_Customer_Service_Officer' &&
        userInfo.role !== 'Financial_Manager' &&
        userInfo.role !== 'Administration_Manager' &&
        userInfo.role !== 'Production_Manager' &&
        userInfo.role !== 'Services_Manager')
    ) {
      history.push('/login')
    }

    if (client) {
      dispatch(getClientInfo(client))
    }
  }, [dispatch, history, userInfo, client])

  return (
    <>
      <Link
        style={{ position: 'absolute', marginTop: 0 }}
        className='btn btn-primary my-1'
        to={`/events`}
      >
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : client && event ? (
        <>
          <Container>
            <Row className='justify-content-md-center'>
              <Col md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col md={4}>
                        <h4>Event</h4>
                        <p>{event.eventType}</p>
                      </Col>
                      <Col md={4}>
                        <h4>Request Status</h4>
                        <p>
                          {event.eventStatus === 1
                            ? 'Initiated'
                            : event.eventStatus === 2
                            ? 'Tasks Divided'
                            : event.eventStatus === 3
                            ? 'Plans submitted'
                            : event.eventStatus === 4
                            ? 'Extras Request Submitted'
                            : event.eventStatus === 5
                            ? 'Under Review by FM'
                            : 'Closed'}
                        </p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <br />
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h4>Description</h4>
                        <p>{event.description}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <br />
                  <ListGroup.Item>
                    <Row>
                      <Col md={4}>
                        <h4>Client</h4>
                        <p>{clientInfo.clientName}</p>
                      </Col>
                      <Col md={4}>
                        <h4>Client Contact</h4>
                        <p>{clientInfo.clientContact}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <br />
                  <ListGroup.Item>
                    <Row>
                      <Col md={4}>
                        <h4>From</h4>
                        <p>{event.from.substring(0, 10)} </p>
                      </Col>
                      <Col md={4}>
                        <h4>To</h4>
                        <p>{event.to.substring(0, 10)} </p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <br />
                  <ListGroup.Item>
                    <Row>
                      <Col md={4}>
                        <h4>Attendees</h4>
                        <p>{event.numOfAttendees} </p>
                      </Col>
                      <Col md={4}>
                        <h4>Planned Budget</h4>
                        <p>{event.plannedBudget} </p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <br />
                  <ListGroup.Item>
                    <h4>Preferences</h4>
                    <br />
                    <Row>
                      {event &&
                        Object.keys(event.preferences).map(
                          (item, index) =>
                            item !== null && (
                              <Row>
                                <Col key={index}>
                                  {/* <Form.Check
                                  disabled
                                  type={'checkbox'}
                                  id={`default-checkbox`}
                                  label={item}
                                  checked={true}
                                /> */}
                                  <h4>{item.replaceAll('_', ' ')}</h4>
                                  <p>{event.preferences[item]}</p>
                                </Col>
                              </Row>
                            )
                        )}
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <br />
      )}
    </>
  )
}

export default EventDetail

import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, ListGroup, Container, Form } from 'react-bootstrap'

import { getClientInfo } from '../../redux/actions/clientActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const EventRequestDetailScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const location = useLocation()

  const { eventRequest } = location.state ? location.state : {}
  const { client } = location.state ? location.state : {}

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getClient = useSelector((state) => state.getClient)
  const { loading, error, clientInfo } = getClient

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (client) {
      dispatch(getClientInfo(client))
    }
  }, [userInfo, eventRequest])

  return (
    <>
      <Link
        style={{ position: 'absolute', marginTop: 0 }}
        className='btn btn-primary my-1'
        to={`/event/request/review/${match.params.id}`}
      >
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        client &&
        eventRequest(
          <>
            <Container>
              <Row className='justify-content-md-center'>
                <Col md={8}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col md={4}>
                          <h4>Event</h4>
                          <p>Celebration </p>
                        </Col>
                        <Col md={4}>
                          <h4>Request Status</h4>
                          <p>Status</p>
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
                          <p>{eventRequest.from.substring(0, 10)} </p>
                        </Col>
                        <Col md={4}>
                          <h4>To</h4>
                          <p>{eventRequest.to.substring(0, 10)} </p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <br />
                    <ListGroup.Item>
                      <Row>
                        <Col md={4}>
                          <h4>Attendees</h4>
                          <p>{eventRequest.numOfAttendees} </p>
                        </Col>
                        <Col md={4}>
                          <h4>Expected Budget</h4>
                          <p>{eventRequest.expectedBudget} </p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <br />
                    <ListGroup.Item>
                      <h4>Preferences</h4>
                      <Row>
                        {eventRequest &&
                          eventRequest.preferences.map(
                            (item, index) =>
                              item !== null && (
                                <Col key={index} md={2}>
                                  <Form.Check
                                    disabled
                                    type={'checkbox'}
                                    id={`default-checkbox`}
                                    label={item}
                                    checked={true}
                                  />
                                </Col>
                              )
                          )}
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Container>
          </>
        )
      )}
    </>
  )
}

export default EventRequestDetailScreen

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'

import {
  getEventRequestStatus,
  updateEventRequestStatus,
} from '../../redux/actions/eventFlowActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const EventRequests = ({ history, match }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getEventReqStatus = useSelector((state) => state.getEventReqStatus)
  const { error, loading, eventRequestInfoByStatus: events } = getEventReqStatus

  const updateEventReqStatus = useSelector(
    (state) => state.updateEventRequestStatus
  )
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    updatedEventRequest,
  } = updateEventReqStatus

  useEffect(() => {
    if (
      !userInfo ||
      (userInfo.role !== 'Senior_Customer_Service_Officer' &&
        userInfo.role !== 'Financial_Manager' &&
        userInfo.role !== 'Administration_Manager')
    ) {
      history.push('/login')
    } else {
      dispatch(getEventRequestStatus(match.params.id))
    }
  }, [dispatch, history, userInfo, match, updatedEventRequest])

  const approveRequest = (id, status) => {
    if (
      userInfo &&
      userInfo.role === 'Senior_Customer_Service_Officer' &&
      status === 1
    ) {
      if (window.confirm('Are you sure to approve request?'))
        dispatch(updateEventRequestStatus(id, 2))
    }

    if (userInfo && userInfo.role === 'Financial_Manager' && status === 2) {
      if (window.confirm('Are you sure to approve request?'))
        dispatch(updateEventRequestStatus(id, 3))
    }

    if (
      userInfo &&
      userInfo.role === 'Administration_Manager' &&
      status === 3
    ) {
      if (window.confirm('Are you sure to approve request?'))
        dispatch(updateEventRequestStatus(id, 4))
    }
  }

  const rejectRequest = (id, status) => {
    if (
      userInfo &&
      userInfo.role === 'Senior_Customer_Service_Officer' &&
      status === 1
    ) {
      if (window.confirm('Are you sure to reject request?'))
        dispatch(updateEventRequestStatus(id, 11))
    }

    if (userInfo && userInfo.role === 'Financial_Manager' && status === 2) {
      if (window.confirm('Are you sure to reject request?'))
        dispatch(updateEventRequestStatus(id, 22))
    }

    if (
      userInfo &&
      userInfo.role === 'Administration_Manager' &&
      status === 3
    ) {
      if (window.confirm('Are you sure to reject request?'))
        dispatch(updateEventRequestStatus(id, 33))
    }
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='align-items-center'>
            <Col>
              <h1>Event Requests</h1>
            </Col>
          </Row>

          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>EVENT TYPE</th>
                <th>FROM</th>
                <th>TO</th>
                <th>STATUS</th>
                <th>APPROVE/REJECT</th>
                <th>DETAIL VIEW</th>
              </tr>
            </thead>
            <tbody>
              {events &&
                events.map((event) => (
                  <tr key={event._id}>
                    <td>{event.eventType}</td>
                    <td>{event.from.substring(0, 10)}</td>
                    <td>{event.to.substring(0, 10)}</td>
                    <td>
                      {event.eventRequestStatus === 1 ? (
                        'Under Review by SCS'
                      ) : event.eventRequestStatus === 11 ? (
                        'Rejected by SCS'
                      ) : event.eventRequestStatus === 2 ? (
                        'Under Review by FM'
                      ) : event.eventRequestStatus === 22 ? (
                        'Rejected by FM'
                      ) : event.eventRequestStatus === 3 ? (
                        'Under Review by AM'
                      ) : event.eventRequestStatus === 33 ? (
                        'Rejected by AM'
                      ) : event.eventRequestStatus === 4 &&
                        userInfo &&
                        userInfo.role === 'Senior_Customer_Service_Officer' ? (
                        <Row>
                          <Col>Approved</Col>
                          <Col>
                            <Link
                              to={{
                                pathname: `/event/specification`,
                                state: {
                                  eventRequest: event,
                                  client: event.client,
                                },
                              }}
                            >
                              <Button variant='success' className='btn-sm'>
                                {'Create Event'}
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      ) : event.eventRequestStatus === 4 ? (
                        'Approved'
                      ) : event.eventRequestStatus === 5 ? (
                        'Event Created'
                      ) : event.eventRequestStatus === 0 ? (
                        'Event Closed'
                      ) : (
                        'SEP Event'
                      )}
                    </td>
                    <td>
                      {(userInfo &&
                        userInfo.role === 'Senior_Customer_Service_Officer' &&
                        event.eventRequestStatus === 1) ||
                      (userInfo &&
                        userInfo.role === 'Financial_Manager' &&
                        event.eventRequestStatus === 2) ||
                      (userInfo &&
                        userInfo.role === 'Administration_Manager' &&
                        event.eventRequestStatus === 3) ? (
                        <>
                          <Button
                            variant='success'
                            className='btn-sm'
                            onClick={() =>
                              approveRequest(
                                event._id,
                                event.eventRequestStatus
                              )
                            }
                          >
                            <i className='fas fa-check-circle'></i>
                          </Button>
                          <Button
                            style={{ marginLeft: 20 }}
                            variant='danger'
                            className='btn-sm'
                            onClick={() =>
                              rejectRequest(event._id, event.eventRequestStatus)
                            }
                          >
                            <i className='fas fa-times-circle'></i>
                          </Button>
                        </>
                      ) : event.eventRequestStatus === 4 ? (
                        'Approved'
                      ) : event.eventRequestStatus === 5 ? (
                        'Event Created'
                      ) : (
                        'Processing...'
                      )}
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: `/event/request/detail/${match.params.id}`,
                          state: {
                            eventRequest: event,
                            client: event.client,
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

export default EventRequests

// https://ui.dev/react-router-pass-props-to-link/

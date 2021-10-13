import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'

import { getEventRequestStatus } from '../../redux/actions/eventFlowActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const EventRequestReviewScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getEventReqStatus = useSelector((state) => state.getEventReqStatus)
  const { error, loading, eventRequestInfoByStatus: events } = getEventReqStatus

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getEventRequestStatus(match.params.id))
    }
  }, [dispatch, history, userInfo, match])

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
                      {event.eventRequestStatus === 1
                        ? 'Under Review by SCS'
                        : event.eventRequestStatus === 2
                        ? 'Under Review by FM'
                        : 'Under Review by AM'}
                    </td>
                    <td>
                      <Button
                        variant='success'
                        className='btn-sm'
                        onClick={() => console.log('hello')}
                      >
                        <i class='fas fa-check-circle'></i>
                      </Button>
                      <Button
                        style={{ marginLeft: 20 }}
                        variant='danger'
                        className='btn-sm'
                        onClick={() => console.log('hello2')}
                      >
                        <i class='fas fa-times-circle'></i>
                      </Button>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: `/event/request/detail/${match.params.id}`,
                          state: {
                            event: event,
                            client: event.client,
                          },
                        }}
                      >
                        <Button variant='primary' className='btn-sm'>
                          <i class='fas fa-info-circle'></i>
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

export default EventRequestReviewScreen

// https://ui.dev/react-router-pass-props-to-link/

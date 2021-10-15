import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'

import { getEventStatus } from '../../redux/actions/eventFlowActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const Events = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getEveStatus = useSelector((state) => state.getEveStatus)
  const { error, loading, eventInfoByStatus: events } = getEveStatus

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
    } else {
      dispatch(getEventStatus(0))
    }
  }, [dispatch, history, userInfo])

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
              <h1>All Events</h1>
            </Col>
          </Row>

          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>EVENT TYPE</th>
                <th>Description</th>
                <th>FROM</th>
                <th>TO</th>
                <th>STATUS</th>
                <th>DETAIL VIEW</th>
              </tr>
            </thead>
            <tbody>
              {events &&
                events.map((event) => (
                  <tr key={event._id}>
                    <td>{event.eventType}</td>
                    <td>{event.description}</td>
                    <td>{event.from.substring(0, 10)}</td>
                    <td>{event.to.substring(0, 10)}</td>
                    <td>
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
                    </td>

                    <td>
                      <Link
                        to={{
                          pathname: `/events/detail`,
                          state: {
                            event: event,
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

export default Events

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'

import { getExtraBudgetsRequest } from '../../redux/actions/requestActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const ViewFinancialRequests = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getExtraBudgets = useSelector((state) => state.getExtraBudgets)
  const { loading, error, budgets } = getExtraBudgets

  console.log(budgets)

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'Financial_Manager') {
      history.push('/login')
    } else {
      dispatch(getExtraBudgetsRequest())
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
        <Message variant='danger'>{error ? error : 'Error'}</Message>
      ) : (
        <>
          <Row className='align-items-center'>
            <Col>
              <h1>All Financial Requests</h1>
            </Col>
          </Row>

          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>EVENT</th>
                <th>AMOUNT REQUIRED</th>
                <th>REASON FOR REQUEST</th>
                <th>REQUESTED BY</th>
                <th>CREATED AT</th>
                <th>STATUS</th>
                <th>APPROVE/REJECT</th>
              </tr>
            </thead>
            <tbody>
              {budgets &&
                budgets.map((budget) => (
                  <tr key={budget['request']._id}>
                    <td>{`${budget['event'].description} - ${budget['event'].eventType}`}</td>
                    <td>{budget['request'].requiredAmount}</td>
                    <td>{budget['request'].reason}</td>
                    <td>{`${budget['request'].requestingDepartment} Dpt`}</td>
                    <td>{budget['request'].createdAt.substring(0, 10)}</td>
                    <td>
                      {budget['request'].status === 1
                        ? 'Initiated'
                        : budget['request'].status === 2
                        ? 'Closed'
                        : 'Done'}
                    </td>

                    <td>
                      <>
                        <Button variant='success' className='btn-sm'>
                          <i className='fas fa-check-circle'></i>
                        </Button>
                        <Button
                          style={{ marginLeft: 20 }}
                          variant='danger'
                          className='btn-sm'
                        >
                          <i className='fas fa-times-circle'></i>
                        </Button>
                      </>
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

export default ViewFinancialRequests

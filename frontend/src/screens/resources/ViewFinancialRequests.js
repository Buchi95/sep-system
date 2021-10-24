import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'

import {
  getExtraBudgetsRequest,
  updateExtraBudgetRequest,
} from '../../redux/actions/requestActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const ViewFinancialRequests = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getExtraBudgets = useSelector((state) => state.getExtraBudgets)
  const { loading, error, budgets } = getExtraBudgets

  const updateBudget = useSelector((state) => state.updateBudget)
  const { loading: lUpdate, error: eUpdate, message } = updateBudget

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'Financial_Manager') {
      history.push('/login')
    } else {
      dispatch(getExtraBudgetsRequest())
    }
  }, [dispatch, history, userInfo])

  const handleUpdateStatus = (id, status) => {
    if (window.confirm('Are you sure to create job ad request?')) {
      dispatch(updateExtraBudgetRequest(id, status))

      alert('Request Updated successfully')
      history.push('/')
    }
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading || lUpdate ? (
        <Loader />
      ) : error || eUpdate ? (
        <Message variant='danger'>
          {error ? error : eUpdate ? eUpdate : 'Error!'}
        </Message>
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
                      {budget['request'].status === 1 ? (
                        <>
                          <Button
                            type='button'
                            onClick={() =>
                              handleUpdateStatus(budget['request']._id, 2)
                            }
                            variant='success'
                            className='btn-sm'
                          >
                            <i className='fas fa-check-circle'></i>
                          </Button>
                          <Button
                            type='button'
                            onClick={() =>
                              handleUpdateStatus(budget['request']._id, 3)
                            }
                            style={{ marginLeft: 20 }}
                            variant='danger'
                            className='btn-sm'
                          >
                            <i className='fas fa-times-circle'></i>
                          </Button>
                        </>
                      ) : budget['request'].status === 2 ? (
                        'Approved'
                      ) : (
                        'rejected'
                      )}
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

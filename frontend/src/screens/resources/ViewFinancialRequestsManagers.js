import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Row, Col } from 'react-bootstrap'

import { getExtraBudgetsRequest } from '../../redux/actions/requestActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const ViewFinancialRequestsManagers = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getExtraBudgets = useSelector((state) => state.getExtraBudgets)
  const { loading, error, budgets } = getExtraBudgets

  useEffect(() => {
    if (
      !userInfo ||
      (userInfo.role !== 'Services_Manager' &&
        userInfo.role !== 'Production_Manager')
    ) {
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
        <Message variant='danger'>{error ? error : 'Error!'}</Message>
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
                budgets.map((budget) =>
                  userInfo &&
                  userInfo.role === 'Services_Manager' &&
                  budget['request'].requestingDepartment === 'Services' ? (
                    <tr key={budget['request']._id}>
                      <td>{`${budget['event'].description} - ${budget['event'].eventType}`}</td>
                      <td>{budget['request'].requiredAmount}</td>
                      <td>{budget['request'].reason}</td>
                      <td>{`Services Department`}</td>
                      <td>{budget['request'].createdAt.substring(0, 10)}</td>
                      <td>
                        {budget['request'].status === 1
                          ? 'Initiated'
                          : budget['request'].status === 2
                          ? 'Closed'
                          : 'Done'}
                      </td>

                      <td>
                        {budget['request'].status === 2
                          ? 'Approved'
                          : budget['request'].status === 3
                          ? 'Rejected'
                          : '-'}
                      </td>
                    </tr>
                  ) : userInfo &&
                    userInfo.role === 'Production_Manager' &&
                    budget['request'].requestingDepartment === 'Production' ? (
                    <tr key={budget['request']._id}>
                      <td>{`${budget['event'].description} - ${budget['event'].eventType}`}</td>
                      <td>{budget['request'].requiredAmount}</td>
                      <td>{budget['request'].reason}</td>
                      <td>{`Production Department`}</td>
                      <td>{budget['request'].createdAt.substring(0, 10)}</td>
                      <td>
                        {budget['request'].status === 1
                          ? 'Initiated'
                          : budget['request'].status === 2
                          ? 'Closed'
                          : 'Done'}
                      </td>

                      <td>
                        {budget['request'].status === 2
                          ? 'Approved'
                          : budget['request'].status === 3
                          ? 'Rejected'
                          : '-'}
                      </td>
                    </tr>
                  ) : null
                )}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ViewFinancialRequestsManagers

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Row, Col } from 'react-bootstrap'

import { getExtraStaffsRequest } from '../../redux/actions/requestActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const ViewStaffRequestsManagers = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getExtraStaffs = useSelector((state) => state.getExtraStaffs)
  const { loading, error, staffs } = getExtraStaffs

  useEffect(() => {
    if (
      !userInfo ||
      (userInfo.role !== 'Services_Manager' &&
        userInfo.role !== 'Production_Manager')
    ) {
      history.push('/login')
    } else {
      dispatch(getExtraStaffsRequest())
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
              <h1>All Resources Requests</h1>
            </Col>
          </Row>

          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>EVENT</th>
                <th>JOB TITLE</th>
                <th>CONTRACT</th>
                <th>REQUESTED BY</th>
                <th>CREATED AT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {staffs &&
                staffs.map((staff) =>
                  userInfo &&
                  userInfo.role === 'Services_Manager' &&
                  staff['request'].requestingDepartment === 'Services' ? (
                    <tr key={staff['request']._id}>
                      <td>{`${staff['event'].description} - ${staff['event'].eventType}`}</td>
                      <td>{staff['request'].jobTitle}</td>
                      <td>{staff['request'].contract.replaceAll('_', ' ')}</td>
                      <td>{`${staff['request'].requestingDepartment} Dpt`}</td>
                      <td>{staff['request'].createdAt.substring(0, 10)}</td>
                      <td>
                        {staff['request'].status === 1
                          ? 'Initiated'
                          : staff['request'].status === 2
                          ? 'Resolved'
                          : 'Done'}
                      </td>

                      <td>
                        <>
                          {staff['request'].status === 2
                            ? 'Job Ad Posted'
                            : '-'}
                        </>
                      </td>
                    </tr>
                  ) : (
                    userInfo &&
                    userInfo.role === 'Production_Manager' &&
                    staff['request'].requestingDepartment === 'Production'
                  )
                )}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ViewStaffRequestsManagers

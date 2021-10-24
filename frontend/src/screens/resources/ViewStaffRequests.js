import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'

import {
  getExtraStaffsRequest,
  updateExtraStaffRequest,
} from '../../redux/actions/requestActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const ViewStaffRequests = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getExtraStaffs = useSelector((state) => state.getExtraStaffs)
  const { loading, error, staffs } = getExtraStaffs

  const updateStaff = useSelector((state) => state.updateStaff)
  const { loading: lUpdate, error: eUpdate, message } = updateStaff

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'Senior_HR_Manager') {
      history.push('/login')
    } else {
      dispatch(getExtraStaffsRequest())
    }
  }, [dispatch, history, userInfo])

  const handleUpdateStatus = (id) => {
    if (window.confirm('Are you sure to create job ad request?')) {
      dispatch(updateExtraStaffRequest(id, 2))
    }

    alert('Request Updated successfully')
    history.push('/')
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
                staffs.map((staff) => (
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
                        {staff['request'].status === 1 ? (
                          <Button
                            type='button'
                            onClick={() =>
                              handleUpdateStatus(staff['request']._id)
                            }
                            variant='success'
                            className='btn-sm'
                          >
                            Create Job Ad
                          </Button>
                        ) : (
                          'Done'
                        )}
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

export default ViewStaffRequests

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Button, Table } from 'react-bootstrap'

import { getAllClientsInfo } from '../../redux/actions/clientActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

const Clients = ({ history }) => {
  const dispatch = useDispatch()

  const getAllClients = useSelector((state) => state.getAllClients)
  const { loading, error, allClients } = getAllClients

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (
      !userInfo ||
      (userInfo.role !== 'Senior_Customer_Service_Officer' &&
        userInfo.role !== 'Administration_Manager' &&
        userInfo.role !== 'Marketing_Officer' &&
        userInfo.role !== 'Financial_Manager')
    ) {
      history.push('/login')
    } else {
      dispatch(getAllClientsInfo())
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Link className='btn btn-dark' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <>
          <br />
          <br />
          <Message variant='danger'>{error}</Message>
        </>
      ) : (
        <>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>All Clients</h1>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>CONTACT</th>
                  <th>CREATED AT</th>
                </tr>
              </thead>
              <tbody>
                {allClients &&
                  allClients.length > 0 &&
                  allClients.map((client) => (
                    <tr key={client._id}>
                      <td>{client.clientName}</td>
                      <td>{client.clientContact}</td>
                      <td>{client.createdAt.substring(0, 10)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </>
      )}
    </>
  )
}

export default Clients

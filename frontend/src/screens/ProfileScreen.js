import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { getUserDetails } from '../redux/actions/userActions'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [dpt, setDpt] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
        setRole(user.role)
        setDpt(user.department)
      }
    }
  }, [dispatch, history, userInfo, user])

  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   setMessage('Update Profile Functionality will be added for later realease')
  // }

  // onSubmit={submitHandler}

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Button
          disabled
          style={{ marginTop: 20, marginBottom: 20 }}
          type='submit'
          variant='primary'
        >
          {user && user.department && dpt.replaceAll('_', ' ')}
        </Button>
        <Form>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='name'
              value={name}
              disabled
              //onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group style={{ marginTop: 20 }} controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='email'
              value={email}
              disabled
              //onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group style={{ marginTop: 20 }} controlId='role'>
            <Form.Label>Role</Form.Label>
            <Form.Control
              type='role'
              placeholder='role'
              value={role && role.replaceAll('_', ' ')}
              disabled
              //onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

export default ProfileScreen

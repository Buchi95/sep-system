import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'

import { getEventStatus } from '../../redux/actions/eventFlowActions'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

const FinancialRequest = ({ history }) => {
  const [project, setProject] = useState('')
  const [amount, setAmount] = useState(0)
  const [reason, setReason] = useState('')

  // form errors
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [dpt, setDepartment] = useState(
    userInfo.role === 'Production_Manager' ? 'Production' : 'Services'
  )

  const getEveStatus = useSelector((state) => state.getEveStatus)
  const { loading, error, eventInfoByStatus: events } = getEveStatus

  useEffect(() => {
    if (
      !userInfo ||
      (userInfo.role !== 'Production_Manager' &&
        userInfo.role !== 'Services_Manager')
    ) {
      history.push('/login')
    } else {
      dispatch(getEventStatus(0))
    }
  }, [history, userInfo])

  const findFormErrors = () => {
    const newErrors = {}

    if (!project || project === '') newErrors.project = 'cannot be blank!'
    if (!amount || amount === '' || amount === 0)
      newErrors.amount = 'select proper amount!'
    if (!reason || reason === '') newErrors.reason = 'cannot be blank'

    return newErrors
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const newErrors = findFormErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setErrors({})
    }
  }

  return (
    <>
      <Link style={{ position: 'absolute' }} className='btn btn-dark' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Container>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <h1>Financial Request</h1>
                <Form onSubmit={submitHandler}>
                  <Row style={{ marginTop: 20 }} className='mb-2'>
                    <Form.Label>Requesting Department: </Form.Label>
                    <Form.Group as={Col} controlId='dpt'>
                      <Form.Check
                        inline
                        type='checkbox'
                        label={dpt}
                        value={dpt}
                        checked
                        disabled
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </Form.Group>
                  </Row>
                  <Form.Group as={Col} controlId='rId'>
                    <Form.Label>Project Reference</Form.Label>
                    <Form.Control
                      as='select'
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      placeholder='Project Reference'
                      isInvalid={!!errors.project}
                    >
                      <option value=''>Select Project</option>
                      {events.map((event) => (
                        <option
                          key={event._id}
                          value={event._id}
                        >{`${event.description} - ${event.eventType}`}</option>
                      ))}
                    </Form.Control>
                    <FormControl.Feedback as='div' type='invalid'>
                      {errors.project}
                    </FormControl.Feedback>
                  </Form.Group>
                  <Form.Group
                    style={{ marginTop: 20 }}
                    as={Col}
                    controlId='amount'
                  >
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type='amount'
                      value={amount}
                      placeholder='Amount'
                      onChange={(e) => setAmount(Number(e.target.value))}
                      isInvalid={!!errors.amount}
                    />
                    <FormControl.Feedback as='div' type='invalid'>
                      {errors.amount}
                    </FormControl.Feedback>
                  </Form.Group>
                  <Form.Group
                    style={{ marginTop: 20 }}
                    as={Col}
                    controlId='details'
                  >
                    <Form.Label>Reason</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      maxLength='100'
                      placeholder='Reason for extra budget'
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      isInvalid={!!errors.reason}
                    />
                    <FormControl.Feedback as='div' type='invalid'>
                      {errors.reason}
                    </FormControl.Feedback>
                  </Form.Group>
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type='submit'
                      style={{ marginTop: 10 }}
                      className='btn btn-dark ml-auto'
                    >
                      Submit Financial Request
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default FinancialRequest

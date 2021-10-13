import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

import { createEventReq } from '../../redux/actions/eventFlowActions'

const EventRequestScreen = ({ history }) => {
  const [clientName, setClientName] = useState('')
  const [clientContact, setClientContact] = useState('')
  const [eventType, setEventType] = useState('Other')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [numOfAttendees, setNumOfAttendees] = useState(0)
  const [expectedBudget, setExpectedBudget] = useState(0)
  const [preferences, setPreferences] = useState([])

  const [checked, setChecked] = useState([])

  // form errors
  const [errors, setErrors] = useState({})

  const addPreference = (e, checkValue, index, prefValue) => {
    if (checkValue) {
      let newChecked = checked
      newChecked[index] = false
      setChecked(newChecked)
      let newPref = preferences
      newPref.splice(index, 1)
      setPreferences(newPref)
    } else {
      let newChecked = checked
      newChecked[index] = true
      setChecked(newChecked)
      let newPref = preferences
      newPref[index] = prefValue
      setPreferences(newPref)
    }
  }

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { loading, error, userInfo } = userLogin

  const redirect = '/login'

  const createEventRequest = useSelector((state) => state.createEventRequest)

  const {
    loading: loadingRequest,
    error: errorRequest,
    success,
  } = createEventRequest

  useEffect(() => {
    if (!userInfo) {
      history.push(redirect)
    }

    if (success) {
      alert('Request Created Successfully!')
      // reset form
      setClientName('')
      setClientContact('')
      setEventType('')
      setFrom('')
      setTo('')
      setNumOfAttendees(0)
      setExpectedBudget(0)
      setPreferences([])
      setChecked([])
    }
  }, [history, userInfo, redirect, success])

  const findFormErrors = () => {
    const newErrors = {}

    if (!clientName || clientName === '')
      newErrors.clientName = 'cannot be blank!'
    if (!clientContact || clientContact === '')
      newErrors.clientContact = 'cannot be blank!'
    if (!eventType || eventType === '')
      newErrors.eventType = 'Please select valid event type!'
    if (!from || from === '')
      newErrors.from = 'Please select from date for event!'
    if (!to || to === '') newErrors.to = 'Please select to date for event!'
    if (!numOfAttendees || numOfAttendees < 5)
      newErrors.numOfAttendees = 'The attendees must be greater then 5'
    if (!expectedBudget || expectedBudget < 1000)
      newErrors.expectedBudget =
        'The expected budget must be greater then 1000sek'

    return newErrors
  }

  const submitHandler = (e) => {
    e.preventDefault()
    // DISPATCH CREATE EVENT
    const newErrors = findFormErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setErrors({})
      if (from > to) {
        alert('From Date cannot be after To Date')
      } else {
        dispatch(
          createEventReq(
            clientName,
            clientContact,
            eventType,
            from,
            to,
            numOfAttendees,
            expectedBudget,
            preferences,
            1,
            userInfo._id
          )
        )
      }
    }
  }

  return (
    <div>
      <Link style={{ position: 'absolute' }} className='btn btn-dark' to='/'>
        Go Back
      </Link>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {errorRequest && <Message variant='danger'>{errorRequest}</Message>}
      {loadingRequest && <Loader />}
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>Request for Event Planning</h1>
            <Form onSubmit={submitHandler}>
              <Row className='mb-2'>
                <Form.Group as={Col} controlId='name'>
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type='text'
                    value={clientName}
                    placeholder='Name'
                    onChange={(e) => setClientName(e.target.value)}
                    isInvalid={!!errors.clientName}
                  />
                  <FormControl.Feedback as='div' type='invalid'>
                    {errors.clientName}
                  </FormControl.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId='contact'>
                  <Form.Label>Client Contact</Form.Label>
                  <Form.Control
                    type='text'
                    value={clientContact}
                    placeholder='Email / Phone number'
                    onChange={(e) => setClientContact(e.target.value)}
                    isInvalid={!!errors.clientContact}
                  />
                  <FormControl.Feedback as='div' type='invalid'>
                    {errors.clientContact}
                  </FormControl.Feedback>
                </Form.Group>
              </Row>
              <Form.Group controlId='rating'>
                <Form.Label>Event Type</Form.Label>
                <Form.Control
                  as='select'
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  isInvalid={!!errors.eventType}
                >
                  <option value='Other'>Other</option>
                  <option value='Celebration'>Celebration</option>
                  <option value='Workshop'>Workshop</option>
                  <option value='Conference'>Conference</option>
                  <option value='Expo'>Expo</option>
                  <option value='Seminar'>Seminar</option>
                  <option value='Summer_School'>Summer School</option>
                </Form.Control>
                <FormControl.Feedback as='div' type='invalid'>
                  {errors.eventType}
                </FormControl.Feedback>
              </Form.Group>
              <Row style={{ marginTop: 10 }} className='mb-2'>
                <Form.Group as={Col} controlId='date'>
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type='date'
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    isInvalid={!!errors.from}
                  />
                  <FormControl.Feedback as='div' type='invalid'>
                    {errors.from}
                  </FormControl.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId='date'>
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type='date'
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    isInvalid={!!errors.to}
                  />
                  <FormControl.Feedback as='div' type='invalid'>
                    {errors.to}
                  </FormControl.Feedback>
                </Form.Group>
              </Row>
              <Row style={{ marginTop: 10 }} className='mb-2'>
                <Form.Group as={Col} controlId='attendees'>
                  <Form.Label>Number of Attendees</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Number of Attendees'
                    value={numOfAttendees}
                    onChange={(e) => setNumOfAttendees(e.target.value)}
                    isInvalid={!!errors.numOfAttendees}
                  />
                  <FormControl.Feedback as='div' type='invalid'>
                    {errors.numOfAttendees}
                  </FormControl.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId='budget'>
                  <Form.Label>Expected Budget</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Expected Budget'
                    value={expectedBudget}
                    onChange={(e) => setExpectedBudget(e.target.value)}
                    isInvalid={!!errors.expectedBudget}
                  />
                  <FormControl.Feedback as='div' type='invalid'>
                    {errors.expectedBudget}
                  </FormControl.Feedback>
                </Form.Group>
              </Row>
              <Row style={{ marginTop: 10 }} className='mb-2'>
                <Form.Label as='legend'>Preferences</Form.Label>
                <Form.Group as={Col} className='mb-3' controlId='preferences'>
                  <Form.Check
                    inline
                    type='checkbox'
                    label='Decorations'
                    value={checked[0]}
                    onChange={(e) =>
                      addPreference(
                        e.target.value,
                        checked[0],
                        0,
                        'Decorations'
                      )
                    }
                  />
                  <Form.Check
                    inline
                    type='checkbox'
                    label='Parties'
                    checked={checked[1]}
                    onChange={(e) =>
                      addPreference(e.target.value, checked[1], 1, 'Parties')
                    }
                  />
                  <Form.Check
                    inline
                    type='checkbox'
                    label='Photos/Filming'
                    checked={checked[2]}
                    onChange={(e) =>
                      addPreference(
                        e.target.value,
                        checked[2],
                        2,
                        'Photos/Filming'
                      )
                    }
                  />
                  <Form.Check
                    inline
                    type='checkbox'
                    label='Breakfast, lunch, dinner'
                    checked={checked[3]}
                    onChange={(e) =>
                      addPreference(e.target.value, checked[3], 3, 'Food')
                    }
                  />
                  <Form.Check
                    inline
                    type='checkbox'
                    label='Soft/hot drinks'
                    checked={checked[4]}
                    onChange={(e) =>
                      addPreference(
                        e.target.value,
                        checked[4],
                        4,
                        'Soft/hot_drinks'
                      )
                    }
                  />
                  <Form.Check
                    inline
                    type='checkbox'
                    label='Other'
                    checked={checked[5]}
                    onChange={(e) =>
                      addPreference(e.target.value, checked[5], 5, 'Other')
                    }
                  />
                </Form.Group>
              </Row>
              <Button type='submit' variant='primary' className='btn btn-dark'>
                Submit Request
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EventRequestScreen

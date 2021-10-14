import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

const EventSpecificationScreen = ({ history }) => {
  const [clientName, setClientName] = useState('')
  const [clientContact, setClientContact] = useState('')
  const [eventType, setEventType] = useState('Other')
  const [description, setDescription] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [numOfAttendees, setNumOfAttendees] = useState(0)
  const [expectedBudget, setExpectedBudget] = useState(0)
  const [decorations, setDecorations] = useState('')
  const [food, setFood] = useState('')
  const [filming, setFilming] = useState('')
  const [music, setMusic] = useState('')
  const [art, setArt] = useState('')
  const [it, setIt] = useState('')
  const [others, setOthers] = useState('')

  // form errors
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { loading, error, userInfo } = userLogin

  const redirect = '/login'

  useEffect(() => {
    if (!userInfo) {
      history.push(redirect)
    }

    // if (success) {
    //   alert('Event Created Successfully!')
    //   // reset form
    //   setClientName('')
    //   setClientContact('')
    //   setEventType('')
    //   setFrom('')
    //   setTo('')
    //   setNumOfAttendees(0)
    //   setExpectedBudget(0)
    //   setPreferences([])
    // }
  }, [history, userInfo, redirect])

  const findFormErrors = () => {
    const newErrors = {}

    if (!clientName || clientName === '')
      newErrors.clientName = 'cannot be blank!'
    if (!clientContact || clientContact === '')
      newErrors.clientContact = 'cannot be blank!'
    if (!description || description === '')
      newErrors.description = 'cannot be blank'
    if (!eventType || eventType === '')
      newErrors.eventType = 'Please select valid event type!'
    if (!from || from === '')
      newErrors.from = 'Please select from date for event!'
    if (!to || to === '') newErrors.to = 'Please select to date for event!'
    if (!numOfAttendees || numOfAttendees < 10)
      newErrors.numOfAttendees = 'The attendees must be greater then 10'
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
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h2>Client Request Details</h2>
            <Form onSubmit={submitHandler}>
              <Row className='mb-2'>
                <Col>
                  <Row>
                    <Form.Group as={Col} controlId='name'>
                      <Form.Label>Client Name</Form.Label>
                      <Form.Control
                        type='text'
                        value={clientName}
                        placeholder='Client Name'
                        onChange={(e) => setClientName(e.target.value)}
                        isInvalid={!!errors.clientName}
                      />
                      <FormControl.Feedback as='div' type='invalid'>
                        {errors.clientName}
                      </FormControl.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId='contact'>
                      <Form.Label>Client Contact</Form.Label>
                      <Form.Control
                        type='text'
                        value={clientContact}
                        placeholder='Client Contact'
                        onChange={(e) => setClientContact(e.target.value)}
                        isInvalid={!!errors.clientContact}
                      />
                      <FormControl.Feedback as='div' type='invalid'>
                        {errors.clientContact}
                      </FormControl.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
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
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Form.Group as={Col} controlId='description'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type='text'
                        value={description}
                        placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}
                        isInvalid={!!errors.description}
                      />
                      <FormControl.Feedback as='div' type='invalid'>
                        {errors.description}
                      </FormControl.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId='attendees'>
                      <Form.Label>Expected Number of Attendees</Form.Label>
                      <Form.Control
                        type='text'
                        value={numOfAttendees}
                        placeholder='Attendees'
                        onChange={(e) => setNumOfAttendees(e.target.value)}
                        isInvalid={!!errors.numOfAttendees}
                      />
                      <FormControl.Feedback as='div' type='invalid'>
                        {errors.numOfAttendees}
                      </FormControl.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId='budget'>
                      <Form.Label>Planned Budget</Form.Label>
                      <Form.Control
                        type='text'
                        value={expectedBudget}
                        placeholder='Budget'
                        onChange={(e) => setExpectedBudget(e.target.value)}
                        isInvalid={!!errors.expectedBudget}
                      />
                      <FormControl.Feedback as='div' type='invalid'>
                        {errors.expectedBudget}
                      </FormControl.Feedback>
                    </Form.Group>
                  </Row>
                </Col>
              </Row>

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

              <Row style={{ marginTop: 50 }}>
                <h2>Event Activities/ Details</h2>
                <Col>
                  <Form.Group controlId='Decorations'>
                    <Form.Label>Decorations</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='2'
                      value={decorations}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='Food'>
                    <Form.Label>Food/ Drinks</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='2'
                      value={food}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId='Filming'>
                    <Form.Label>Filmimg/ Photos</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='2'
                      value={filming}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='Music'>
                    <Form.Label>Music</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='2'
                      value={music}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId='Art'>
                    <Form.Label>Posters/ Art Work</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='2'
                      value={art}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='IT'>
                    <Form.Label>Computer-Related Issues</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='2'
                      value={it}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId='Others'>
                <Form.Label>Other needs</Form.Label>
                <Form.Control
                  as='textarea'
                  row='2'
                  value={others}
                ></Form.Control>
              </Form.Group>

              <Button
                style={{ marginTop: 20 }}
                type='submit'
                variant='primary'
                className='btn btn-dark'
              >
                Create Event
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EventSpecificationScreen

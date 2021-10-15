import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

import { getClientInfo } from '../../redux/actions/clientActions'
import {
  createEve,
  updateEventRequestStatus,
} from '../../redux/actions/eventFlowActions'

const EventSpecification = ({ history }) => {
  const location = useLocation()

  const { eventRequest } = location.state ? location.state : {}
  const { client } = location.state ? location.state : {}

  // form errors
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { loading, error, userInfo } = userLogin

  const getClient = useSelector((state) => state.getClient)
  const { loading: loadingC, error: errorC, clientInfo } = getClient

  const createEvent = useSelector((state) => state.createEvent)

  const { loading: loadingEve, error: errorEve, success } = createEvent

  const [clientName, setClientName] = useState(
    clientInfo && clientInfo.clientName
  )
  const [clientContact, setClientContact] = useState(
    clientInfo && clientInfo.clientContact
  )

  const redirect = '/login'

  const [eventType, setEventType] = useState(eventRequest.eventType)
  const [description, setDescription] = useState('')
  const [from, setFrom] = useState(eventRequest.from)
  const [to, setTo] = useState(eventRequest.to)
  const [numOfAttendees, setNumOfAttendees] = useState(
    eventRequest.numOfAttendees
  )
  const [plannedBudget, setPlannedBudget] = useState(
    eventRequest.expectedBudget
  )
  const [decorations, setDecorations] = useState('')
  const [food, setFood] = useState('')
  const [filming, setFilming] = useState('')
  const [music, setMusic] = useState('')
  const [art, setArt] = useState('')
  const [it, setIt] = useState('')
  const [others, setOthers] = useState('')

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'Senior_Customer_Service_Officer') {
      history.push(redirect)
    }

    if (client) {
      dispatch(getClientInfo(client))
    }

    if (success) {
      alert('Event Created Successfully!')
      dispatch(updateEventRequestStatus(eventRequest._id, 5))
      history.push('/')
    }
  }, [history, userInfo, redirect, client, dispatch, success])

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
    if (!plannedBudget || plannedBudget < 1000)
      newErrors.plannedBudget =
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
          createEve(
            clientName,
            clientContact,
            eventType,
            description,
            from,
            to,
            numOfAttendees,
            plannedBudget,
            {
              decorations: decorations,
              food_drinks: food,
              filming_photos: filming,
              music: music,
              artwork: art,
              it: it,
              other: others,
            },
            1,
            userInfo._id
          )
        )
      }
    }
  }

  return (
    <div>
      <Link
        style={{ position: 'absolute' }}
        className='btn btn-dark'
        to='/event/requests/1'
      >
        Go Back
      </Link>
      {(error || errorC || errorEve) && (
        <Message variant='danger'>{error}</Message>
      )}
      {(loading || loadingC || loadingEve) && <Loader />}
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
                        value={plannedBudget}
                        placeholder='Budget'
                        onChange={(e) => setPlannedBudget(e.target.value)}
                        isInvalid={!!errors.plannedBudget}
                      />
                      <FormControl.Feedback as='div' type='invalid'>
                        {errors.plannedBudget}
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
                    value={from.substring(0, 10)}
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
                    value={to.substring(0, 10)}
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
                      onChange={(e) => setDecorations(e.target.value)}
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
                      onChange={(e) => setFood(e.target.value)}
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
                      onChange={(e) => setFilming(e.target.value)}
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
                      onChange={(e) => setMusic(e.target.value)}
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
                      onChange={(e) => setArt(e.target.value)}
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
                      onChange={(e) => setIt(e.target.value)}
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
                  onChange={(e) => setOthers(e.target.value)}
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

export default EventSpecification

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'

const EventRequestScreen = ({ history }) => {
  const [clientName, setClientName] = useState('')
  const [clientContact, setClientContact] = useState('')
  const [eventType, setEventType] = useState(0)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [numOfAttendees, setNumOfAttendees] = useState(0)
  const [expectedBudget, setExpectedBudget] = useState(0)
  const [preferences, setPreferences] = useState([])

  const [checked, setChecked] = useState([])

  const addPreference = (e, value, index) => {
    if (value) {
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
      newPref[index] = index
      setPreferences(newPref)
    }

    console.log(preferences)
  }

  return (
    <div>
      <Link style={{ position: 'absolute' }} className='btn btn-dark' to='/'>
        Go Back
      </Link>

      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>Request for Event Planning</h1>
            <Form>
              <Row className='mb-2'>
                <Form.Group as={Col} controlId='name'>
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type='name'
                    value={clientName}
                    placeholder='Name'
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='contact'>
                  <Form.Label>Client Contact</Form.Label>
                  <Form.Control
                    type='contact'
                    value={clientContact}
                    placeholder='Email / Phone number'
                    onChange={(e) => setClientContact(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Form.Group controlId='rating'>
                <Form.Label>Event Type</Form.Label>
                <Form.Control
                  as='select'
                  value={eventType}
                  onChange={(e) => setEventType(Number(e.target.value))}
                >
                  <option value='0'>Other</option>
                  <option value='1'>Celebration</option>
                  <option value='2'>Workshop</option>
                  <option value='3'>Conference</option>
                  <option value='4'>Expo</option>
                  <option value='5'>Seminar</option>
                  <option value='6'>Summer School</option>
                </Form.Control>
              </Form.Group>
              <Row style={{ marginTop: 10 }} className='mb-2'>
                <Form.Group as={Col} controlId='date'>
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type='date'
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='date'>
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type='date'
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginTop: 10 }} className='mb-2'>
                <Form.Group as={Col} controlId='attendees'>
                  <Form.Label>Number of Attendees</Form.Label>
                  <Form.Control
                    type='attendees'
                    placeholder='Number of Attendees'
                    value={numOfAttendees}
                    onChange={(e) => setNumOfAttendees(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='budget'>
                  <Form.Label>Expected Budget</Form.Label>
                  <Form.Control
                    type='budgeet'
                    placeholder='Expected Budget'
                    value={expectedBudget}
                    onChange={(e) => setExpectedBudget(e.target.value)}
                  />
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
                      addPreference(e.target.value, checked[0], 0)
                    }
                  />
                  <Form.Check
                    inline
                    type='checkbox'
                    label='Parties'
                    checked={checked[1]}
                    onChange={(e) =>
                      addPreference(e.target.value, checked[1], 1)
                    }
                  />
                  <Form.Check
                    inline
                    type='checkbox'
                    label='Photos/Filming'
                    checked={checked[2]}
                    onChange={(e) =>
                      addPreference(e.target.value, checked[2], 2)
                    }
                  />
                  <Form.Check
                    inline
                    type='checkbox'
                    label='Breakfast, lunch, dinner'
                    checked={checked[3]}
                    onChange={(e) =>
                      addPreference(e.target.value, checked[3], 3)
                    }
                  />
                  <Form.Check
                    inline
                    type='checkbox'
                    label='Soft/hot drinks'
                    checked={checked[4]}
                    onChange={(e) =>
                      addPreference(e.target.value, checked[4], 4)
                    }
                  />
                  <Form.Check
                    inline
                    type='checkbox'
                    label='Other'
                    checked={checked[5]}
                    onChange={(e) =>
                      addPreference(e.target.value, checked[5], 5)
                    }
                  />
                </Form.Group>
              </Row>
            </Form>
            <Button className='btn btn-dark'>Submit Request</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EventRequestScreen

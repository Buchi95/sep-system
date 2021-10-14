import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'

const ClientRequestDetails = ({ history }) => {

  return (
    <div>
      <Link style={{ position: 'absolute' }} className='btn btn-dark' to='/'>
        Go Back
      </Link>

      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>Client Request Details</h1>
            <Form>
              <Row className='mb-2'>
                <Form.Group as={Col} controlId='name'>
                  <Form.Label>Client Record:</Form.Label>
                  <Form.Control
                    type='name'
                    value={'name'}
                    placeholder='ClientID'
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='contact'>
                  <Form.Label>Client Contact</Form.Label>
                  <Form.Control
                    type='contact'
                    value={'contact'}
                    placeholder='Email / Phone number'
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='date'>
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type='date'
                    value={'from'}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='date'>
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type='date'
                    value={'to'}
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginTop: 20 }} className='mb-2'>
              <Col>
                <Form.Group as={Col} controlId='attendees'>
                  <Form.Label>Number of Attendees</Form.Label>
                  <Form.Control
                    type='attendees'
                    placeholder='Number of Attendees'
                    value={'numOfAttendees'}
                  />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='rating'>
                <Form.Label>Event Type</Form.Label>
                <Form.Control
                  as='select'
                  value={'select'}
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
              </Col>
              </Row>
              <Row style={{ marginTop: 20 }}  class='mb-2'>
                <Col>
              <Form.Group as={Col} controlId='budget'>
                  <Form.Label>Expected Budget</Form.Label>
                  <Form.Control
                    type='budgeet'
                    placeholder='Expected Budget'
                    value={'expectedBudget'}
                  />
                </Form.Group>
            
              </Col>
              </Row>
              <Row style={{ marginTop: 20 }} className='mb-2'>
                <Col>
                <Form.Group as={Col} controlId="details">
              <Form.Label>Decorations</Form.Label>
                <Form.Control as="textarea" rows={2} maxLength="100" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} controlId="details">
              <Form.Label>Food and Drinks</Form.Label>
                <Form.Control as="textarea" rows={2} maxLength="100" />
                </Form.Group>
              </Col>
              </Row>

              <Row style={{ marginTop: 20 }}  className='mb-2'>
                <Col>
                <Form.Group as={Col} controlId="details">
              <Form.Label>Film/Photo</Form.Label>
                <Form.Control as="textarea" rows={2} maxLength="100"/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} controlId="details">
              <Form.Label>Music</Form.Label>
                <Form.Control as="textarea" rows={2} maxLength="100"/>
                </Form.Group>
              </Col>
              </Row>

              <Row style={{ marginTop: 20 }}  className='mb-2'>
                <Col>
                <Form.Group as={Col} controlId="details">
              <Form.Label>Posters/Art Work</Form.Label>
                <Form.Control as="textarea" rows={2} maxLength="100"/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} controlId="details">
              <Form.Label>Computer-Related Issues</Form.Label>
                <Form.Control as="textarea" rows={2} maxLength="100"/>
                </Form.Group>
              </Col>
              </Row>
            
            <Row style={{ marginTop: 20 }}  className='mb-2'>
            <Form.Group as={Col} controlId='needs'>
                <Form.Label>Other Needs</Form.Label>
                <Form.Control
                    type='needs'
                    value={'needs'}
                    placeholder='Other Needs'
                />
            </Form.Group>

            </Row>
            </Form>
            <div class='col text-center'>
            <Button style={{ marginTop: 10 }} className='btn btn-dark'>Submit Event Details</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ClientRequestDetails
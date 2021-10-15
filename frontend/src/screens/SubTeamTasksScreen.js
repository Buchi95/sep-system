import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
//mport { createNewTask  } from '../redux/actions/tasksActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
/*
const submitHandler = () => {
  dispatch(
    createTask(
      reference,
      description,
      assign, 
      priority
    )


  )
}
*/
const SubTeamTasksScreen = ({ history }) => {

  return (
    <div>
      <Link style={{ position: 'absolute' }} className='btn btn-dark' to='/'>
        Go Back
      </Link>

      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>Create Subteam Task</h1>
            <Form>
            <Row style={{ marginTop: 20 }}  class='mb-2'>
                <Form.Group as={Col} controlId='rId'>
                    <Form.Label>Project Reference</Form.Label>
                    <Form.Control
                        type='rId'
                        value={'reference'}
                        placeholder='Project Reference'
                    />
                </Form.Group>
            </Row>
            <Row style={{ marginTop: 20 }}  class='mb-2'>
                <Form.Group as={Col} controlId="details">
                <Form.Label>Task Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={4} 
                        maxLength="100" 
                        placeholder='Task Description' 
                        value={'description'}
                    />
                </Form.Group>
            </Row>
            <Row style={{ marginTop: 20 }}  class='mb-2'>
                <Col>
                <Form.Group controlId='rating'>
                <Form.Label>Assign Task To:</Form.Label>
                <Form.Control
                  as='select'
                  value={'assign'}
                >
                  <option value='0'>Select Employee</option>
                  <option value='1'>Aksel</option>
                  <option value='2'>Marc</option>

                </Form.Control>
              </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='rating'>
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as='select'
                  value={'priority'}
                >
                  <option value='0'>Select Priority</option>
                  <option value='1'>Low</option>
                  <option value='2'>Medium</option>
                  <option value='3'>High</option>
 
                </Form.Control>
              </Form.Group>
              </Col>
              </Row>
              
            </Form>
            <div class='col text-center'>
            <Button type='submit' style={{ marginTop: 30 }} className='btn btn-dark'>Submit Event Details</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SubTeamTasksScreen
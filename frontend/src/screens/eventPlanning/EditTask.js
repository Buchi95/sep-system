import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

const EditTask = ({ history }) => {
  const location = useLocation()

  const { task } = location.state ? location.state : {}

  const [extra, setExtraRequirements] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || userInfo.subdepartment.length === 0) {
      history.push('/login')
    } else {
    }
  }, [dispatch, history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Link
        style={{ position: 'absolute', marginTop: 0 }}
        className='btn btn-primary my-1'
        to={`/tasks`}
      >
        Go Back
      </Link>

      {false ? (
        <Loader />
      ) : false ? (
        <Message variant='danger'>{'hello'}</Message>
      ) : (
        <>
          <Container>
            <Container>
              <Row>
                <Col
                  md={{ span: 8, offset: 2 }}
                  style={{
                    border: '2px solid',
                    paddingRight: 30,
                    paddingLeft: 30,
                    paddingTop: 10,
                  }}
                >
                  <Form onSubmit={submitHandler}>
                    <Row>
                      <Col style={{ marginTop: 5 }} className='mb-2'>
                        <Form.Group as={Col} controlId='rId'>
                          <Form.Label>Project Reference</Form.Label>
                          <Form.Control
                            disabled
                            value={task && task.projectRef}
                            placeholder='Project Reference'
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col style={{ marginTop: 5 }} className='mb-2'>
                        <Form.Group as={Col} controlId='subject'>
                          <Form.Label>Task Subject</Form.Label>
                          <Form.Control
                            disabled
                            type='text'
                            value={task && task.subject}
                            placeholder='Task Subject'
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: 5 }} className='mb-2'>
                      <Form.Group as={Col} controlId='details'>
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control
                          disabled
                          as='textarea'
                          rows={3}
                          placeholder='Task Description'
                          value={task && task.description}
                        />
                      </Form.Group>
                    </Row>

                    <Row style={{ marginTop: 5 }} className='mb-2'>
                      <Form.Group as={Col} controlId='details'>
                        <Form.Label>Write Extra Requirements</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows={4}
                          placeholder='Extra Requirements'
                          value={extra}
                          onChange={(e) => setExtraRequirements(e.target.value)}
                        />
                      </Form.Group>
                    </Row>

                    <Row style={{ marginTop: 5 }} className='mb-2'>
                      <Col>
                        <Form.Group controlId='rating'>
                          <Form.Label>Assigned To</Form.Label>
                          <Form.Control
                            disabled
                            type='text'
                            value={userInfo && userInfo.name}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId='rating'>
                          <Form.Label>Priority</Form.Label>
                          <Form.Control
                            disabled
                            value={task && task.priority}
                            type='text'
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Button
                        disabled={extra === ''}
                        type='submit'
                        style={{ marginTop: 10, marginBottom: 10 }}
                        className='btn btn-dark ml-auto'
                      >
                        Assign Back to Manager
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Container>
        </>
      )}
    </>
  )
}

export default EditTask

import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'

import { getEveById } from '../../redux/actions/eventFlowActions'
import { editTaskEmployee } from '../../redux/actions/userActions'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

const EditTask = ({ history }) => {
  const location = useLocation()

  const { task } = location.state ? location.state : {}

  const [extra, setExtraRequirements] = useState(
    task.extra && task.extra.length > 0 ? task.extra : ''
  )
  const [planned, setPlanned] = useState(
    task.planned && task.planned.length > 0 ? task.planned : ''
  )
  const [feedback, setFeedback] = useState(task.feedback ? task.feedback : '')

  // form errors
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getEventById = useSelector((state) => state.getEventById)
  const { error, loading, eventbyId: event } = getEventById

  const editTask = useSelector((state) => state.editTask)
  const { loading: loadingET, error: errorET } = editTask

  useEffect(() => {
    if (!userInfo || userInfo.subdepartment.length === 0) {
      history.push('/login')
    } else {
      if (task) {
        dispatch(getEveById(task.projectRef))
      }
    }
  }, [dispatch, history, userInfo, task])

  const findFormErrors = () => {
    const newErrors = {}

    if (!extra || extra === '') newErrors.extra = 'cannot be blank!'
    if (!planned || planned === '') newErrors.planned = 'cannot be blank!'
    if (!feedback || feedback === '') newErrors.feedback = 'cannot be blank'

    return newErrors
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const newErrors = findFormErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setErrors({})
      dispatch(
        editTaskEmployee({
          employee: userInfo._id,
          taskid: task._id,
          extra,
          planned,
          feedback,
        })
      )

      setExtraRequirements('')
      setPlanned('')
      setFeedback('')
      history.push('/tasks')
    }
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

      {loading || loadingET ? (
        <Loader />
      ) : error || errorET ? (
        <Message variant='danger'>
          {error ? error : errorET ? errorET : 'Error'}
        </Message>
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
                          <Form.Label>Project Description</Form.Label>
                          <Form.Control
                            disabled
                            value={
                              event &&
                              `${event.description} - ${event.eventType}`
                            }
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
                      <Col>
                        <Form.Group as={Col} controlId='details'>
                          <Form.Label>Write Extra Requirements</Form.Label>
                          <Form.Control
                            as='textarea'
                            rows={4}
                            placeholder='Extra Requirements'
                            value={extra}
                            onChange={(e) =>
                              setExtraRequirements(e.target.value)
                            }
                            isInvalid={!!errors.extra}
                          />
                          <FormControl.Feedback as='div' type='invalid'>
                            {errors.extra}
                          </FormControl.Feedback>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group as={Col} controlId='details'>
                          <Form.Label>Write Planned Activities</Form.Label>
                          <Form.Control
                            as='textarea'
                            rows={4}
                            placeholder='Planned Activities'
                            value={planned}
                            onChange={(e) => setPlanned(e.target.value)}
                            isInvalid={!!errors.planned}
                          />
                          <FormControl.Feedback as='div' type='invalid'>
                            {errors.planned}
                          </FormControl.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: 5 }} className='mb-2'>
                      <Col>
                        <Form.Group controlId='rating'>
                          <Form.Label>Feedback Status</Form.Label>
                          <Form.Control
                            as='select'
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            isInvalid={!!errors.feedback}
                          >
                            <option value='0'>Choose Feedback level</option>
                            <option value='1'>Nothing Needed!</option>
                            <option value='2'>Extra Resources Required</option>
                          </Form.Control>
                          <FormControl.Feedback as='div' type='invalid'>
                            {errors.feedback}
                          </FormControl.Feedback>
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

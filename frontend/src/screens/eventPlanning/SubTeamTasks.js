import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form, Tabs, Tab } from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'

import {
  getDptUsers,
  assignTaskToEmployee,
} from '../../redux/actions/userActions'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

const SubTeamTasks = ({ history }) => {
  const location = useLocation()

  const { event } = location.state ? location.state : {}

  const [key, setKey] = useState('Decorations')
  const [servKey, setServKey] = useState('Food')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [employee, setEmployee] = useState('')

  // form errors
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dptUsers = useSelector((state) => state.dptUsers)
  const { error: errorDpt, loading: loadingDpt, dpUsers } = dptUsers

  const assignTask = useSelector((state) => state.assignTask)
  const { error: errorTask, loading: loadingTask, success } = assignTask

  useEffect(() => {
    if (
      !userInfo ||
      (userInfo.role !== 'Production_Manager' &&
        userInfo.role !== 'Services_Manager')
    ) {
      history.push('/login')
    } else {
      if (userInfo.role === 'Production_Manager') {
        dispatch(getDptUsers('Production_Department'))
      }

      if (userInfo.role === 'Services_Manager') {
        dispatch(getDptUsers('Services_Department'))
      }
    }

    if (success) {
      alert('Task assigned successfully!')
      setDescription('')
      setEmployee('')
      setPriority('')
    }
  }, [dispatch, history, userInfo, success])

  const findFormErrors = () => {
    const newErrors = {}

    if (!subject || subject === '') newErrors.subject = 'cannot be blank'
    if (!description || description === '')
      newErrors.description = 'cannot be blank!'
    if (!priority || priority === '') newErrors.priority = 'cannot be blank'
    if (!employee || employee === '') newErrors.employee = 'cannot be blank'

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
        assignTaskToEmployee({
          employee,
          subject,
          description,
          priority,
          active: true,
          projectRef: event._id,
        })
      )
    }
  }

  return (
    <>
      <Link
        style={{ position: 'absolute', marginTop: 0 }}
        className='btn btn-primary my-1'
        to={{
          pathname: `/events/subtasks`,
          state: {
            event: event,
          },
        }}
      >
        Go Back
      </Link>

      {loadingDpt || loadingTask ? (
        <Loader />
      ) : errorDpt || errorTask ? (
        <Message variant='danger'>
          {errorDpt ? errorDpt : errorTask ? errorTask : 'Error'}
        </Message>
      ) : (
        <>
          <Container>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                {userInfo.role === 'Production_Manager' ? (
                  <>
                    <Tabs
                      style={{ border: '0.5px solid', backgroundColor: 'grey' }}
                      onSelect={(k) => setKey(k)}
                      defaultActiveKey='Decorations'
                      activeKey={key}
                      id='prod-tab'
                    >
                      <Tab eventKey='Decorations' title='Decorations'></Tab>
                      <Tab eventKey='Filming_Photos' title='Photograph'></Tab>
                      <Tab eventKey='Music' title='Music'></Tab>
                      <Tab eventKey='Artwork' title='Graphic Design'></Tab>
                      <Tab eventKey='It' title='Computer Related'></Tab>
                    </Tabs>
                  </>
                ) : (
                  <>
                    <Tabs
                      style={{ border: '0.5px solid', backgroundColor: 'grey' }}
                      onSelect={(k) => setServKey(k)}
                      defaultActiveKey='Food'
                      activeKey={servKey}
                      id='serv-tab'
                    >
                      <Tab eventKey='Food' title='Food'></Tab>
                      <Tab eventKey='Catering' title='Catering'></Tab>
                    </Tabs>
                  </>
                )}
              </Col>
            </Row>

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
                  <h3>Create Subteam Task</h3>
                  <Form onSubmit={submitHandler}>
                    <Row style={{ marginTop: 5 }} className='mb-2'>
                      <Form.Group as={Col} controlId='rId'>
                        <Form.Label>Project</Form.Label>
                        <Form.Control
                          disabled
                          value={
                            event && `${event.eventType} - ${event.description}`
                          }
                          placeholder='Project Reference'
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ marginTop: 5 }} className='mb-2'>
                      <Form.Group as={Col} controlId='subject'>
                        <Form.Label>Task Subject</Form.Label>
                        <Form.Control
                          type='text'
                          value={subject}
                          placeholder='Task Subject'
                          onChange={(e) => setSubject(e.target.value)}
                          isInvalid={!!errors.subject}
                        />
                        <FormControl.Feedback as='div' type='invalid'>
                          {errors.subject}
                        </FormControl.Feedback>
                      </Form.Group>
                    </Row>

                    <Row style={{ marginTop: 5 }} className='mb-2'>
                      <Form.Group as={Col} controlId='details'>
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows={4}
                          maxLength='100'
                          placeholder='Task Description'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          isInvalid={!!errors.description}
                        />
                        <FormControl.Feedback as='div' type='invalid'>
                          {errors.description}
                        </FormControl.Feedback>
                      </Form.Group>
                    </Row>
                    <Row style={{ marginTop: 5 }} className='mb-2'>
                      <Col>
                        <Form.Group controlId='rating'>
                          <Form.Label>Assign Task To:</Form.Label>
                          <Form.Control
                            as='select'
                            value={employee}
                            onChange={(e) => setEmployee(e.target.value)}
                            isInvalid={!!errors.employee}
                          >
                            <option value='0'>Select Employee</option>
                            {dpUsers.map((user) =>
                              userInfo.role === 'Production_Manager' &&
                              user.department === 'Production_Department' &&
                              user.subdepartment === key ? (
                                <option
                                  key={user._id}
                                  value={user._id}
                                >{`${user.name}`}</option>
                              ) : userInfo.role === 'Services_Manager' &&
                                user.department === 'Services_Department' &&
                                user.subdepartment === servKey ? (
                                <option
                                  key={user._id}
                                  value={user._id}
                                >{`${user.name}`}</option>
                              ) : (
                                ''
                              )
                            )}
                          </Form.Control>
                          <FormControl.Feedback as='div' type='invalid'>
                            {errors.employee}
                          </FormControl.Feedback>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId='rating'>
                          <Form.Label>Priority</Form.Label>
                          <Form.Control
                            as='select'
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            isInvalid={!!errors.priority}
                          >
                            <option value='0'>Select Priority</option>
                            <option value='Low'>Low</option>
                            <option value='Medium'>Medium</option>
                            <option value='High'>High</option>
                          </Form.Control>
                          <FormControl.Feedback as='div' type='invalid'>
                            {errors.priority}
                          </FormControl.Feedback>
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
                        Send Task
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

export default SubTeamTasks

/*
createdAt: "2021-10-15T20:07:05.288Z"
department: "Production_Department"
email: "magd@sep.se"
name: "Magdalena"
role: "Photographer"
subdepartment: "Filming_Photos"
*/

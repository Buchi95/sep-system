import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form, Tabs, Tab } from 'react-bootstrap'

import { getEventStatus } from '../../redux/actions/eventFlowActions'
import { getDptUsers } from '../../redux/actions/userActions'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

const SubTeamTasks = ({ history, match }) => {
  const [key, setKey] = useState('Decorations')
  const [servKey, setServKey] = useState('Food')
  const [projectRef, setProjectRef] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [employee, setEmployee] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getEveStatus = useSelector((state) => state.getEveStatus)
  const { error, loading, eventInfoByStatus: events } = getEveStatus

  const dptUsers = useSelector((state) => state.dptUsers)
  const { error: errorDpt, loading: loadingDpt, dpUsers } = dptUsers

  useEffect(() => {
    if (
      !userInfo ||
      (userInfo.role !== 'Production_Manager' &&
        userInfo.role !== 'Services_Manager')
    ) {
      history.push('/login')
    } else {
      dispatch(getEventStatus(1))
      if (userInfo.role === 'Production_Manager') {
        dispatch(getDptUsers('Production_Department'))
      }

      if (userInfo.role === 'Services_Manager') {
        dispatch(getDptUsers('Services_Department'))
      }
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Link
        style={{ position: 'absolute', marginTop: 0 }}
        className='btn btn-primary my-1'
        to={`/`}
      >
        Go Back
      </Link>

      {loading || loadingDpt ? (
        <Loader />
      ) : error || errorDpt ? (
        <Message variant='danger'>{error}</Message>
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
                    paddingTop: 20,
                  }}
                >
                  <h3>Create Subteam Task</h3>
                  <Form>
                    <Row style={{ marginTop: 20 }} className='mb-2'>
                      <Form.Group as={Col} controlId='rId'>
                        <Form.Label>Project Reference</Form.Label>
                        <Form.Control
                          as='select'
                          value={projectRef}
                          onChange={(e) => setProjectRef(e.target.value)}
                          placeholder='Project Reference'
                        >
                          {events.map((event) => (
                            <option
                              key={event._id}
                              value={event._id}
                            >{`${event._id} - ${event.eventType}`}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Row>
                    <Row style={{ marginTop: 20 }} className='mb-2'>
                      <Form.Group as={Col} controlId='details'>
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows={4}
                          maxLength='100'
                          placeholder='Task Description'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ marginTop: 20 }} className='mb-2'>
                      <Col>
                        <Form.Group controlId='rating'>
                          <Form.Label>Assign Task To:</Form.Label>
                          <Form.Control
                            as='select'
                            value={employee}
                            onChange={(e) => setEmployee(e.target.value)}
                          >
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
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId='rating'>
                          <Form.Label>Priority</Form.Label>
                          <Form.Control
                            as='select'
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                          >
                            <option value='0'>Select Priority</option>
                            <option value='Low'>Low</option>
                            <option value='Medium'>Medium</option>
                            <option value='High'>High</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type='submit'
                      style={{ marginTop: 10, marginBottom: 10 }}
                      className='btn btn-dark ml-auto'
                    >
                      Send Task
                    </Button>
                  </div>
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

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'

import { getEventStatus } from '../../redux/actions/eventFlowActions'
import { addExtraStaffRequest } from '../../redux/actions/requestActions'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

const RecruitmentRequestScreen = ({ history }) => {
  // form errors
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getEveStatus = useSelector((state) => state.getEveStatus)
  const { loading, error, eventInfoByStatus: events } = getEveStatus

  const extraStaff = useSelector((state) => state.extraStaff)
  const { loading: loadingS, error: errorS } = extraStaff

  const [contract, setContract] = useState('Part_Time')
  const [dpt, setDepartment] = useState(
    userInfo.role === 'Production_Manager' ? 'Production' : 'Services'
  )
  const [project, setProject] = useState('')
  const [exp, setExp] = useState(0)
  const [jobTitle, setJobTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (
      !userInfo ||
      (userInfo.role !== 'Production_Manager' &&
        userInfo.role !== 'Services_Manager')
    ) {
      history.push('/login')
    } else {
      dispatch(getEventStatus(0))
    }
  }, [dispatch, history, userInfo])

  const findFormErrors = () => {
    const newErrors = {}

    if (!project || project === '') newErrors.project = 'cannot be blank!'
    if (!exp || exp === '' || exp === 0)
      newErrors.exp = 'enter valid experience!'
    if (!jobTitle || jobTitle === '') newErrors.jobTitle = 'cannot be blank!'
    if (!description || description === '')
      newErrors.description = 'cannot be blank'

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
        addExtraStaffRequest({
          requestingDepartment: dpt,
          projectRef: project,
          contract: contract,
          experience: exp,
          jobTitle: jobTitle,
          jobDescription: description,
          status: 1,
        })
      )

      alert('Request created successfully')
      history.push('/')
    }
  }

  return (
    <>
      <Link style={{ position: 'absolute' }} className='btn btn-dark' to='/'>
        Go Back
      </Link>

      {loading || loadingS ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error ? error : errorS ? errorS : 'Error'}
        </Message>
      ) : (
        <>
          <Container>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <h1>Recruitment Request</h1>
                <Form onSubmit={submitHandler}>
                  <Row className='mb-2'>
                    <Col>
                      <Form.Label>Contract Time </Form.Label>
                      <Form.Group as={Col} controlId='details'>
                        <Form.Check
                          inline
                          type='radio'
                          name='contract'
                          label='Part Time'
                          value={'Part_Time'}
                          onChange={(e) => setContract(e.target.value)}
                        />
                        <Form.Check
                          inline
                          type='radio'
                          name='contract'
                          label='Full Time'
                          value={'Full_Time'}
                          onChange={(e) => setContract(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Label>Requesting Department: </Form.Label>
                      <Form.Group as={Col} controlId='details'>
                        <Form.Check
                          inline
                          type='checkbox'
                          label={dpt}
                          value={dpt}
                          checked
                          disabled
                          onChange={(e) => setDepartment(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Form.Group as={Col} controlId='rId'>
                      <Form.Label>Project Reference</Form.Label>
                      <Form.Control
                        as='select'
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        placeholder='Project Reference'
                        isInvalid={!!errors.project}
                      >
                        <option value=''>Select Project</option>
                        {events.map((event) => (
                          <option
                            key={event._id}
                            value={event._id}
                          >{`${event.description} - ${event.eventType}`}</option>
                        ))}
                      </Form.Control>
                      <FormControl.Feedback as='div' type='invalid'>
                        {errors.project}
                      </FormControl.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group
                        style={{ marginTop: 20 }}
                        as={Col}
                        controlId='experience'
                      >
                        <Form.Label>Years of experience</Form.Label>
                        <Form.Control
                          type='experience'
                          value={exp}
                          placeholder='Years of experience'
                          onChange={(e) => setExp(e.target.value)}
                          isInvalid={!!errors.exp}
                        />
                        <FormControl.Feedback as='div' type='invalid'>
                          {errors.exp}
                        </FormControl.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        style={{ marginTop: 20 }}
                        as={Col}
                        controlId='jobtitle'
                      >
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control
                          type='jobtitle'
                          value={jobTitle}
                          placeholder='Job Title'
                          onChange={(e) => setJobTitle(e.target.value)}
                          isInvalid={!!errors.jobTitle}
                        />
                        <FormControl.Feedback as='div' type='invalid'>
                          {errors.jobTitle}
                        </FormControl.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group
                    style={{ marginTop: 20 }}
                    as={Col}
                    controlId='details'
                  >
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      maxLength='100'
                      placeholder='Job Description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      isInvalid={!!errors.description}
                    />
                    <FormControl.Feedback as='div' type='invalid'>
                      {errors.description}
                    </FormControl.Feedback>
                  </Form.Group>
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type='submit'
                      style={{ marginTop: 10 }}
                      className='btn btn-dark ml-auto'
                    >
                      Submit Financial Request
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default RecruitmentRequestScreen

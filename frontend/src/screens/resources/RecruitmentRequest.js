import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'

import Message from '../../components/Message'
import Loader from '../../components/Loader'

const RecruitmentRequestScreen = ({ history }) => {
  // form errors
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [contract, setContract] = useState('part_time')
  const [dpt, setDepartment] = useState(
    userInfo.role === 'Production_Manager' ? 'Production' : 'Services'
  )
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
    }
  }, [history, userInfo])

  const findFormErrors = () => {
    const newErrors = {}

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
    }
  }

  return (
    <>
      <Link style={{ position: 'absolute' }} className='btn btn-dark' to='/'>
        Go Back
      </Link>

      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>Recruitment Request</h1>
            <Form onSubmit={submitHandler}>
              <Row class='mb-2'>
                <Col>
                  <Form.Label>Contract Time </Form.Label>
                  <Form.Group as={Col} controlId='details'>
                    <Form.Check
                      inline
                      type='radio'
                      name='contract'
                      label='Part Time'
                      value={contract}
                      onChange={(e) => setContract(e.target.value)}
                    />
                    <Form.Check
                      inline
                      type='radio'
                      name='contract'
                      label='Full Time'
                      value={contract}
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
  )
}

export default RecruitmentRequestScreen

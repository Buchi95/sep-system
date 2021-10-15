import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'

const FinancialRequestScreen = ({ history }) => {

  return (
    <div>
      <Link style={{ position: 'absolute' }} className='btn btn-dark' to='/'>
        Go Back
      </Link>

      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>Financial Request</h1>
            <Form>
            <Row style={{ marginTop: 20 }} class='mb-2'>
            <Form.Label>Requesting Department: </Form.Label>
            <Form.Group as={Col} controlId="details">
              <Form.Check inline type="checkbox" label="Administration" />  
              <Form.Check inline type="checkbox" label="Production" /> 
              <Form.Check inline type="checkbox" label="Services" />  
              <Form.Check inline type="checkbox" label="Financial" /> 
            </Form.Group>
            </Row> 
            <Form.Group style={{ marginTop: 20 }} as={Col} controlId='experience'>
                  <Form.Label>Project Reference</Form.Label>
                  <Form.Control
                    type='jobtitle'
                    value={''}
                    placeholder='Project Reference'
                  />
                </Form.Group>
            <Form.Group style={{ marginTop: 20 }} as={Col} controlId='jobtitle'>
                  <Form.Label>Ammount</Form.Label>
                  <Form.Control
                    type='jobtitle'
                    value={''}
                    placeholder='Ammount'
                  />
                </Form.Group>
            <Form.Group style={{ marginTop: 20 }} as={Col} controlId="details">
              <Form.Label>Reason</Form.Label>
                <Form.Control as="textarea" rows={2} maxLength="100" placeholder='Job Description' />
            </Form.Group>
            
            
          
            </Form>
            <div class='col text-center'>
            <Button style={{ marginTop: 10 }} className='btn btn-dark'>Submit Financial Request</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FinancialRequestScreen
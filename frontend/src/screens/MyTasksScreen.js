import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'

const MyTasksScreen = ({ history }) => {

    return (
      <div>
        <Link style={{ position: 'absolute' }} className='btn btn-dark' to='/'>
          Go Back
        </Link>
        <Col md={{ span: 8, offset: 2 }}>
            <h1>My Tasks</h1>
        </Col>
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>TASK SUBJECT</th>
                <th>Priority</th>
                <th>Sender</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Dinner Now!</td>
                    <td>High</td>
                    <td>Aksel</td>
                    <td> <Link

                      >
                        <Button variant='primary' className='btn-sm'>
                          <i className='fas fa-info-circle'></i>
                        </Button>
                      </Link>
                    </td>
                </tr>
    
            </tbody>
          </Table>
          </div>
        )
    }

export default MyTasksScreen
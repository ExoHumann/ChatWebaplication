import React from 'react'
import {Form, Button, Container} from 'react-bootstrap'

export default function Login() {



  return (
<Container>
<Form>
 <Form.Group>
    <Form.Label>Chose your ID</Form.Label>
    <Form.Control type="text" required></Form.Control>
 <Button>Login</Button>
 </Form.Group>
</Form>
</Container>
  )
}

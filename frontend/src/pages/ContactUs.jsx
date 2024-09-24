import React from 'react'
import { Container, Form, Grid, Header } from 'semantic-ui-react'

function ContactUs() {
  return (
    <>
    <Container style={{margin:'50px', width:'50%'}} textAlign='center'>
      <Header as='h1' style={{fontSize:'2.5em'}}>Contact us</Header>
      <p style={{fontSize:'1em'}}>
        Email us with any inqueries or questions or you may call us at 093232321111. We would be happy to answer your questions and setup a meeting with you.
      </p>
    </Container>
    <Form style={{margin:'auto', width:'70%'}}>
      <Form.Group widths='equal'>
        <Form.Input fluid label='Full name' placeholder='Full name' />
        <Form.Input fluid label='Email' placeholder='sample@example.com' />
        <Form.Input fluid label='Contact No.' placeholder='Phone number' />
      </Form.Group>
      <Form.Input fluid label='Subject' placeholder='First name' />
      <Form.TextArea label='Message' placeholder='Message' />
      <Form.Button fluid>Submit</Form.Button>
      </Form>
    </>
  )
}

export default ContactUs
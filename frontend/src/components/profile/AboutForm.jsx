import React from 'react'
import { Button, Form } from 'semantic-ui-react'

function AboutForm({handleAboutSubmit, handleAboutTextChange}) {
  return (
    <>
    <Form onSubmit={handleAboutSubmit} style={{padding:'5px 0'}}>
      <Form.TextArea onChange={handleAboutTextChange} label='About yourself' placeholder='Tell us more about you...'/>
      <Button basic primary>Submit</Button>
    </Form>
    </>
  )
}

export default AboutForm
import React from 'react'
import { Button, Form } from 'semantic-ui-react'

function EducationForm({handleAddEducation,  type, onEducationChange}) {
  return (
    <>
    <Form onSubmit={handleAddEducation}>

      <Form.Input name='name' onChange={onEducationChange} label='School' type='text' placeholder='School name' />
      { type === 'college' ?
      <Form.Input name='course' onChange={onEducationChange} label='Course' type='text' placeholder='Course' /> : <></>
      }
      <Form.Group widths='equal'>
        <Form.Input name='yearAttended' onChange={onEducationChange} width={4} label='Year attended' type='text' placeholder='Started' />
        <Form.Input name='yearGraduated' onChange={onEducationChange} width={4} label=' Year graduated' type='text' />
      </Form.Group>
      <Button fluid primary basic>Submit </Button>
    </Form>
    </>
  )
}

export default EducationForm
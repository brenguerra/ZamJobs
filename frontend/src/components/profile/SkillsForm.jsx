import React from 'react'
import { Button, Dropdown, Form } from 'semantic-ui-react';

function SkillsForm({onSkillsChange, handleSkillsSubmit}) {
  const skills = [
    { key: 'msn', value: 'mason', text: 'Masonry' },
    { key: 'cnstrctn', value: 'construction', text: 'Construction' },
    { key: 'crpnty', value: 'carpentry', text: 'Capentry' },
    { key: 'plmb', value: 'plumbing', text: 'Pumbling' },
    { key: 'elctrcn', value: 'electricity', text: 'Electricity' },
  ];
  return (
    <>
    <Form onSubmit={ handleSkillsSubmit} style={{padding:'5px 5px'}}>
      <Dropdown style={{margin:' 10px 0'}} onChange={onSkillsChange}  placeholder='Skills' fluid multiple selection options={skills} />
      <Button basic fluid>Submit</Button>
    </Form>
    </>
  )
}

export default SkillsForm
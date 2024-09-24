import React from 'react'
import {Form} from 'semantic-ui-react';
function JobForm({onChange, onChangeWorktype, formData}) {
  const {
    title,
    description,
    budget,
    address,
    duration,
    city,
  } = formData;

  const workTypes = [
    { key: 'msn', value: 'mason', text: 'Masonry' },
    { key: 'cnstrctn', value: 'construction', text: 'Construction' },
    { key: 'crpnty', value: 'carpentry', text: 'Carpentry' },
    { key: 'plmb', value: 'plumbing', text: 'Plumbling' },
    { key: 'elctrcn', value: 'electricity', text: 'Electrical' },
  ]

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Input
          fluid
          label='Name'
          placeholder='Name'
          name='title'
          onChange={onChange}
          value={title}
        />
        <Form.Input
          fluid
          type='number'
          label='Budget'
          placeholder='Budget'
          name='budget'
          onChange={onChange}
          value={budget}
        />
        <Form.Input
          fluid
          label='City'
          placeholder='City'
          name='city'
          onChange={onChange}
          value={city}
        />
        <Form.Select
          fluid
          label='Work Type'
          name='worktype'
          placeholder='Select work type'
          options={workTypes}
          onChange={onChangeWorktype}
         />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input
          fluid
          label='Location'
          placeholder='Location'
          onChange={onChange}
          name='address'
          value={address}
        />
        <Form.Input
          fluid
          label='Duration'
          placeholder='Duration'
          name='duration'
          onChange={onChange}
          value={duration}
        />
      </Form.Group>
      <Form.TextArea
        label='Description'
        placeholder='Describe your job requirements'
        name='description'
        onChange={onChange}
        value={description}
      />
    </Form>
  )
}

export default JobForm
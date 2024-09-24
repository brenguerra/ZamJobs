import React from 'react'
import { useEffect } from 'react';
import {Step, Icon} from 'semantic-ui-react';

function PostStep({page}) {
  useEffect(()=> {}, [page])
  return (
    <Step.Group size='small'>
    <Step active={page=== 1} disabled={page !== 1}>
      <Icon name='info' />
      <Step.Content>
        <Step.Title>Job Details</Step.Title>
        <Step.Description>Enter job information</Step.Description>
      </Step.Content>
    </Step>

    <Step active={page === 2} disabled={page !== 2}>
      <Icon name='location arrow' />
      <Step.Content>
        <Step.Title>Job Location</Step.Title>
        <Step.Description>Upload job photos</Step.Description>
      </Step.Content>
    </Step>

    <Step active={page === 3} disabled={page !== 3}>
      <Icon name='picture' />
      <Step.Content>
        <Step.Title>Photos & Confirmation</Step.Title>
        <Step.Description>Verify job details and location</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
  )
}

export default PostStep
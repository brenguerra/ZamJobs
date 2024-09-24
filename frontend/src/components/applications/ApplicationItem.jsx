import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { Header, Image, List } from 'semantic-ui-react'

function ApplicationItem({application}) {
  return (
    <>
    <List.Item>
      <List.Content floated='right'>
        <Header textAlign='center' as='h5'>{application?.status}</Header>
      </List.Content>
      <List.Content>
        <List.Header>
          <Link to={`/jobs/${application?.job?._id}`}>{application?.job?.title}</Link>
        </List.Header>
        <List.Description>
          <span>Date applied</span><Moment format="DD/MM/YY"  date={application.createdAt}/>
        </List.Description>
      </List.Content>
    </List.Item>
    </>
  )
}

export default ApplicationItem
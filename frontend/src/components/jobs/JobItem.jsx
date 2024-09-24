import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {Item, Label, Icon} from 'semantic-ui-react';

function JobItem({job}) {
  return (
    <Item >
      {job?.photos?.length > 0 && job?.photos[0].url ? <Item.Image  size='medium' src={job?.photos[0].url}/> : <Item.Image  size='medium' src='/square-image.png' />}
      <Item.Content>
          <Link to={`/jobs/${job._id}`}>
            <Item.Header>{job.title}</Item.Header>
          </Link>
          <Item.Meta>
          <span className='price'> ₱ {job.budget} <Label color='green' size='mini' floated='right'>{job.duration}</Label></span>
            <p className='cinema'> <Icon  name='location arrow' /> {job.city}</p>
          </Item.Meta>
          <Item.Extra>
            <Label color='blue'>{job.worktype}</Label>
          </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default JobItem
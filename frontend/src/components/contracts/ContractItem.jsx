import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { Header, Image, List, Rating } from 'semantic-ui-react'


function ContractItem({contract}) {
  return (
  <>
  <List.Item>
      <List.Content floated='right'>
          {contract?.status === 'ongoing' ?   <Header textAlign='center' style={{padding:'15px'}}>Ongoing</Header> : <></>}
          {
            contract?.status === 'finished' && contract?.rating ?
          <div  style={{padding:'10px'}}>
            <Header textAlign='center' as='h5'>Rated</Header>
            <Rating  defaultRating={contract.rating.rating} maxRating={5} />
          </div>: contract?.status === 'finished' && !contract?.rating ? <Header>Unrated</Header> : <></>
          }
      </List.Content>
      <List.Content>
        <List.Header>
          <Link to={`/jobs/${contract?.job?._id}`}>{contract?.job.title}</Link>
        </List.Header>
        <List.Description>
          <p style={{padding:'0px', margin:'5px 0'}}>
            <b>{contract.status.toUpperCase()} {contract.duration}</b>
          </p>
          <span>Started on </span><Moment format="DD/MM/YY"  date={contract.createdAt}/>
          <span> Until </span> <Moment format="DD/MM/YY" add={{days:1}} date={Date.now(contract)}/>
        </List.Description>
      </List.Content>
    </List.Item>

  </>
  )
}

export default ContractItem
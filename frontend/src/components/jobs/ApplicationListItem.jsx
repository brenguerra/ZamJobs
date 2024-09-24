import React, { useEffect } from 'react'
import { Button, Header, Image, List } from 'semantic-ui-react'
import {createContract, reset} from '../../features/contracts/contractSlice';
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import {rejectApplication} from '../../features/application/applicationSlice'
function ApplicationListItem({application,job}) {
  const dispatch = useDispatch();

  const {contractError, contractMessage} = useSelector((state)=>state.contract)

  const handleAccept = (e) => {
    e.preventDefault();
    const contractData = {
      jobId:job._id,
      applicationId:application._id,
      talentId:application?.talent._id
    }
    dispatch(createContract(contractData))
  }

  const handleReject = (e) => {
    e.preventDefault();
    dispatch(rejectApplication(application._id))

  }

  useEffect(()=>{
    if(contractError){
      toast.error(contractMessage)
    }
    dispatch(reset());
  }, [contractError, contractMessage, dispatch]);

  return (
    <>
    <List.Item>
      <List.Content floated='right'>
        <Button.Group>
          <Button positive onClick={handleAccept}>Accept</Button>
          <Button negative onClick={handleReject}>Reject</Button>
        </Button.Group>
      </List.Content>
      <Image avatar src={application?.talent?.photos[application?.talent?.photos?.length-1].url} />
      <List.Content>
        <Header as='h4'>
          {application?.talent.firstname} {application?.talent.lastname}
        </Header>
        <p>{application.message}</p>
      </List.Content>
    </List.Item>
    </>
  )
}

export default ApplicationListItem
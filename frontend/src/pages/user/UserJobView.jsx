import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Confirm, Dimmer, Header, List, Loader, Tab } from 'semantic-ui-react'
import {getJob, reset as jobReset} from '../../features/jobs/jobSlice'
import { finishContract, terminateContract,reset as contractReset } from '../../features/contracts/contractSlice';
import {reset as ratingReset} from '../../features/rating/ratingSlice'
import Map from '../../components/jobs/Map';
import ApplicationListItem from '../../components/jobs/ApplicationListItem';
import ContractListItem from '../../components/contracts/ContractListItem';

function UserJobView() {
  let {jobId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const {job, isLoading, isError, message,} = useSelector((state) => state.jobs);
  const {contractSuccess, contractError, contractMessage} = useSelector((state)=>state.contract)
  const pendingJobs = job.applications?.filter(application=>application.status==='pending');
  const {ratingSuccess, ratingError, ratingMessage} = useSelector((state)=>state.rating)
  const [finishOpen, setFinishOpen] = useState(false)
  const [terminateOpen, setTerminateOpen] = useState(false)
  const [currentContract, setCurrentContract] =useState(null)

  const handleFinish = (e)=> {
    e.preventDefault();
    dispatch(finishContract(currentContract?._id))
    setFinishOpen(false)
    dispatch(contractReset())
  }

  const handleTerminate = (e)=> {
    e.preventDefault();
    dispatch(terminateContract(currentContract?._id));
    setTerminateOpen(false);
    dispatch(contractReset());
  }

  useEffect(() => {
    if(contractSuccess){
      toast.success('Contract saved');
    }
    if(ratingSuccess){
      toast.success('Rating submitted');
    }
    if(ratingError){
      toast.error(ratingMessage)
    }
    if(contractError){
      toast.error(contractMessage);
    }
    if(isError){
      toast.error(message);
    }
    if(!user){
      navigate('/login');
    }

    dispatch(getJob(jobId));

    return () => {
      dispatch(jobReset());
      dispatch(contractReset());
      dispatch(ratingReset());
  }},
  [
    contractError,
    contractMessage,
    contractSuccess,
    dispatch,
    isError,
    jobId,
    message,
    navigate,
    ratingError,
    ratingMessage,
    ratingSuccess,
    user
  ]);

  const panes = [
    { menuItem: 'Contracts', render: () =>
    <Tab.Pane style={{minHeight:'500px'}}>
      <List>
         {
          job.contracts?.length >= 1 ? job.contracts?.map(contract =>
            <ContractListItem
              setFinishOpen={setFinishOpen}
              setTerminateOpen={setTerminateOpen}
              setCurrentContract={setCurrentContract}
              key={contract._id} contract={contract}
            />
          ):
          <Header textAlign='center' style={{padding:'100px'}} as='h2'>No contracts yet</Header>
        }
          <Confirm
            open={finishOpen}
            onCancel={()=>setFinishOpen(false)}
            onConfirm={handleFinish}
          />
          <Confirm
            open={terminateOpen}
            onCancel={()=>setTerminateOpen(false)}
            size='tiny'
            onConfirm={handleTerminate}
          />
      </List>
    </Tab.Pane> },
    { menuItem: 'Details', render: () =>
    <Tab.Pane style={{ minHeight: '500px' }}>
      <Map draggable={false} height='400px' width='100%' coords={{lat:job?.geolocation.coordinates[1], lng: job?.geolocation.coordinates[0]}}/>
    </Tab.Pane> },
    { menuItem: 'Applications', render: () =>
    <Tab.Pane style={{minHeight:'500px'}}>
      <List divided verticalAlign='middle'>
        { pendingJobs?.length >= 1 ?
          pendingJobs.map(application =>
            <ApplicationListItem key={application._id} job={job} application={application}/>
          ) : <Header textAlign='center' style={{padding:'100px'}} as='h2'>No applications yet</Header>
        }
      </List>
    </Tab.Pane>
    }]

  if(isLoading) {
    return (
      <Dimmer inverted active={isLoading}>
        <Loader/>
      </Dimmer>
    )
  }

  return (
    <>
    <Tab style={{minHeight:'500px'}} panes={panes} />
    </>
  )
}

export default UserJobView
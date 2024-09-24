import { Header, List } from 'semantic-ui-react';
import ListItem from './ListItem';

function ListUserJobs({jobs,setCurrentJob, modalDispatch}) {
  return (
    <>
      <List style={{minHeight:'300px'}} animated   divided relaxed>
        {jobs.length>0 ? jobs.map((job) =>
          <ListItem setCurrentJob={setCurrentJob} modalDispatch={modalDispatch} job={job} key={job._id} />
        ) : <Header  style={{paddingTop: '100px'}}textAlign='center'>No Jobs</Header>}
      </List>
    </>
  )
}

export default ListUserJobs
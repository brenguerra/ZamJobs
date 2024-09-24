
import { Link } from 'react-router-dom';
import { Button, Dropdown, Grid, Icon, List } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

function ListItem({setCurrentJob,job, modalDispatch}) {
  const navigate = useNavigate();
  return (
    <>
    <List.Item key={job._id} style={{padding:'10px'}}>
      <List.Content floated='right'>
        <Grid>
          <Grid.Row>
            <Grid.Column only='tablet computer'>
              <Button.Group size='mini'>
                <Button color='teal' onClick={(e)=> {
                  setCurrentJob(job);
                  modalDispatch({ type: 'editModalOpen' })
                  }}>
                  <Icon name='edit' />
                  Edit
                </Button>
                <Button color='blue' onClick={(e)=> {
                  navigate('/jobs/'+job._id)
                  }}>
                  <Icon name='eye' />
                  View
                </Button>
                <Button color='red' onClick={(e)=> {
                  setCurrentJob(job);
                  modalDispatch({ type: 'deleteModalOpen' })}}
                >
                  <Icon name='trash alternate' />
                  Delete
                </Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column only='mobile'>
            <Dropdown icon='ellipsis vertical'>
            <Dropdown.Menu>
              <Dropdown.Item icon='edit' text='Edit' onClick={(e)=> {modalDispatch({ type: 'editModalOpen' })}} />
              <Dropdown.Item icon='delete' text='Delete' onClick={(e)=> {modalDispatch({ type: 'deleteModalOpen' })}} />
            </Dropdown.Menu>
          </Dropdown>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </List.Content>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header> <Link to={`${job._id}`}>{job.title}</Link> </List.Header>
        <List.Description as='a'>{job.createdAt}</List.Description>
      </List.Content>
    </List.Item>
    </>
  )
}

export default ListItem
import {useEffect, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Item, Message, Container, Dimmer, Loader, Pagination, Grid} from 'semantic-ui-react'
import { toast } from 'react-toastify'
import {getOpenJobs, reset} from '../../features/jobs/jobSlice'
import {reset as photoReset} from '../../features/photos/photoSlice'
import JobItem from '../../components/jobs/JobItem'
import SideNav from '../../components/includes/SideNav'


function JobList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const [userLocation, setUserLocation] = useState({lat:0, lng:0})
  const {user} = useSelector((state)=> state.auth)
  const {jobs, isLoading, isError, message, count} = useSelector((state) => state.jobs);

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      setUserLocation({
          lat:position.coords.latitude,
          lng: position.coords.longitude
      })
      dispatch(getOpenJobs({activePage, userLocation}));
    });
  }, [dispatch])

  const pageChange = (event, data)=>{
    setActivePage(data.activePage);
    dispatch(getOpenJobs({activePage, userLocation}));
  }

  useEffect(()=> {
    if(!user) {
      navigate('/login')
    }
  }, [navigate, user]);

  useEffect( () => {

    return ()=> {
      dispatch(reset())
      dispatch(photoReset())
    }
  }, [dispatch])

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
  }, [isError, message])
  if(isLoading) {
    return(
    <>
      <Dimmer active={isLoading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </>
    )
  }

  return (
    <>
    <Grid >
      <Grid.Row centered>
        <Grid.Column width={3} only='large screen'>
          <SideNav />
        </Grid.Column>
        <Grid.Column width={13}>
          {/* <Menu>
            <Input  style={{width:'100%', padding:'2px'}} placeholder='Search...' icon='search'/>
            <Menu.Menu position='right'>
              <Dropdown
                item
                simple
                text='Regions'
                direction='right'
                options={options}
              />
            </Menu.Menu>
          </Menu> */}
          <Message  size='large'>
            {count} jobs
            <Item.Group divided>
            {jobs?.map(job =>  <JobItem key={job._id} job={job}/>)}
            </Item.Group>
            <Container text>
              <Pagination defaultActivePage={activePage} totalPages={Math.floor(count/10)} disabled={Math.floor(count/10) === 0} onPageChange={pageChange} />
            </Container>
          </Message>
      </Grid.Column>
      </Grid.Row>
    </Grid>
    </>

  )
}

export default JobList
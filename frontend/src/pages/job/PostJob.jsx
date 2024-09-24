import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom';
import { useState , useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Message, Grid, Button, Icon, Divider, Dimmer, Loader,Form } from 'semantic-ui-react';
import PostStep from '../../components/jobs/PostStep';
import JobForm from '../../components/jobs/JobForm';
import JobPhoto from '../../components/jobs/JobPhoto';
import Map from '../../components/jobs/Map';
import {createJob, reset} from '../../features/jobs/jobSlice'

function PostJob() {
  const {isSuccess, isLoading, isError, message} = useSelector((state) => state.jobs);
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState();
  const [page, setPage] = useState(1);
  const [coords, setCoords] = useState({
    lat:0.0,
    lng:0.0
  })
  const [formData, setFormData] = useState({
    title:'',
    description: '',
    budget: '',
    address: '',
    duration: '',
    city: '',
    worktype: ''
  });

  useEffect(() => {
    if(isSuccess) {
      navigate('/jobs')
      toast.success('Job Posted')
    }
    if(isError) {
      toast.error(message);
    }
    if(!user){
      navigate('/login')
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setCoords((prevState)=>
         ({...prevState, lat:position.coords.latitude, lng: position.coords.longitude})
        );
      });
    } else {
      toast.error("Enable Location");
    }
    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch, message, isError]);

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeWorktype = (e, data)=> {

    setFormData((prevState)=>({
      ...prevState,
      worktype: data.value,
    }));
  }

  const onFileChange = (e) => {
    const files = e.target.files
    const fileData = new FormData();
    Object.keys(files).forEach( key => fileData.append(files.item(key).name, files.item(key)));
    setPhotos(fileData);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const jobDetails = {
      ...formData,
      ...coords,
    };

    if(!jobDetails || !photos || !coords){
      toast.error('Please fill in all fields, Select Correct Location and add Photos')
    } else {
      const job = {
        jobDetails,
        photos
      }
      dispatch(createJob(job));
    }
  }

  return (
    <Message>
      <Dimmer active={isLoading} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={13} textAlign="center">
            <PostStep page={page} />
          </Grid.Column>
          <Grid.Column width={16}>
            <Divider horizontal> Job Post</Divider>
            {
              page === 1 ? <JobForm  onChangeWorktype={onChangeWorktype} onChange={onChange} formData={formData} /> :
              page === 2 ?
            <>
              <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Latitude'  readOnly value={coords.lat} />
                <Form.Input fluid label='Longitude' readOnly value={coords.lng}/>
              </Form.Group>
            </Form>
            <Map setCoords={setCoords} coords={coords} draggable={true}/>
            </>  :
              page === 3 ? <JobPhoto onFileChange={onFileChange} /> :<></>
            }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column textAlign="center">
            {page > 1 ? (
              <Button primary icon labelPosition='left' onClick={() => setPage(page - 1)} disabled={page <= 1}>
                <Icon name='chevron left' />
                Back
              </Button>
            ) : (<></>)}
            {page <= 2 ? (
              <Button primary icon labelPosition='right' onClick={() => setPage(page + 1)} disabled={page > 2}>
                Next
                <Icon name='chevron right' />
              </Button>
            ) : (
              <>
                <Button primary onClick={onSubmit} disabled={page < 2}>
                  Submit
                </Button>
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Message>
  );
}

export default PostJob;
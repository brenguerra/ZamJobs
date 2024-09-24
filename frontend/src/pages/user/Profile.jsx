import { Card, Container, Dimmer, Divider, Grid, Header, List, Loader, Segment} from 'semantic-ui-react'
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {getUser, addEducation, reset, updateUserAbout, addSkills} from '../../features/userProfile/userProfileSlice';
import { toast } from 'react-toastify';
import BasicInfo from '../../components/profile/BasicInfo';
import TestimonialCard from '../../components/profile/TestimonialCard';
import ContactButtons from '../../components/profile/ContactButtons';
import SkillsSection from '../../components/profile/SkillsSection';
import AboutSection from '../../components/profile/AboutSection';
import EducationSection from '../../components/profile/EducationSection';
import {reset as chatReset} from '../../features/chat/chatSlice';
const Profile = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.auth);
  const {userProfile, userProfileSuccess, userProfileLoading, userProfileError, userProfileMessage} = useSelector((state)=>state.userProfile);
  const [eduType, setEduType] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [profileSkills, setProfileSkills] = useState([]);

  const initialEducationState= {
    name:'',
    yearAttended: '',
    yearGraduated: '',
    course: ''
  };
  const [education, setEducation] = useState(initialEducationState);


  const options = [
    { key: 'asdsadasd1', text: 'job 1', value: 1 },
    { key: 'asdasdasdasd', text: 'job 2', value: 2 },
    { key: 'asdasdasdas', text: 'job 3', value: 3 },
  ]

  const handleAboutSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAbout({userId:id, aboutData: aboutText}))
    setAboutText('')
  }

  const handleAboutTextChange = (e)=> {
    setAboutText(e.target.value)
  }

  const onEducationChange = (e)=> {
    setEducation((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleAddEducation = (e)=> {
    e.preventDefault();
    dispatch(addEducation({
      id,
      type: eduType,
      ...education
    }));
    setEducation((prevState)=>({...prevState, ...initialEducationState}))
  }

  const onSkillsChange = (e, data) => {
    setProfileSkills(data.value)
  }

  const handleSkillsSubmit = (e) => {
    e.preventDefault();
    dispatch(addSkills({id:id, skills:profileSkills}))
  }

  useEffect(()=>{
    dispatch(getUser(id));
    if(userProfileSuccess) {
      toast.success('Profile updated')
    }
    if(!user){
      navigate('/login')
    }
    if(userProfileError) {
      toast.error(userProfileMessage)
    }
    return ()=> {
      dispatch(reset());
      dispatch(chatReset());
    }
  },[dispatch, navigate, user, id, userProfileError, userProfileMessage, userProfileSuccess]);

  // if(userProfile.role.name === 'client'){
  //   navigate('/dashboard')
  // }

  if(userProfileLoading){
    return (
      <>
      <Dimmer style={{minHeight:'500px'}} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      </>
    )
  }

  return (
    <>
    <Grid stackable>
      <Grid.Row >
        <Grid.Column width={4}>
          <Segment color='teal'>
             
            <BasicInfo profile={userProfile}/>
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment color='red'> {
            user.id != userProfile?.user ? <ContactButtons user={user} id={id} options={options} /> : <></>
          }
            
            <Container  style={{padding:'20px', marginTop:'30px'}} textAlign='justified'>
              <AboutSection profile={userProfile} handleAboutTextChange={handleAboutTextChange} handleAboutSubmit={handleAboutSubmit} />
              <Divider />
              <SkillsSection handleSkillsSubmit={handleSkillsSubmit} onSkillsChange={onSkillsChange}  />
            <Header as='h4' color='blue'>Education</Header>
              <List>
              <EducationSection onEducationChange={onEducationChange} eduType={eduType} handleAddEducation={handleAddEducation} setEduType={setEduType} />
              </List>
              <Divider />
              <Header as='h4' color='red'>
                Testimonials
              </Header>
                {
                  userProfile?.profile?.ratings?.length > 0 ? 
                  (<Card.Group>
                    <TestimonialCard ratings={userProfile?.profile.ratings} />
                  </Card.Group>) :
                  <Header as='h5' textAlign='center'>
                  No ratings yet.
                  </Header> 
                }
                
            </Container>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </>
  )
}

export default Profile
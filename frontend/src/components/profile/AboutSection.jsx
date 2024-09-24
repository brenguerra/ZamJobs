import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react'
import AboutForm from './AboutForm';

function AboutSection({profile, handleAboutTextChange, handleAboutSubmit}) {
  const {id} = useParams();
  const {user} = useSelector((state=>state.auth))
  const {userProfile} = useSelector((state=>state.userProfile))
  const [showAboutForm, setShowAboutForm] = useState(false);
  return (
    <>
    <Header as='h4' color='green'>
        About {userProfile?.firstname}
      </Header>
      { showAboutForm  && user.id === id ? <><AboutForm handleAboutSubmit={handleAboutSubmit} handleAboutTextChange={handleAboutTextChange} /></> : <></>}
      { user.id === id ? <><Button basic circular icon='plus' floated='right' size='tiny' onClick={()=>{setShowAboutForm('true')}} /></>:<></>}
      { profile?.profile?.about !== '' ? <><p>{profile?.profile?.about}</p></>  : <Header> No information</Header>}
    </>
  )
}

export default AboutSection
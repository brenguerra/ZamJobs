import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'
import SkillLabel from './SkillLabel'
import SkillsForm from './SkillsForm'

function SkillsSection({handleSkillsSubmit, onSkillsChange}) {
  const {user} = useSelector((state=>state.auth))
  const [showSkillsForm, setShowSkillsForm] = useState(false);
  const {userProfile} = useSelector((state=>state.userProfile))
  const {id} = useParams();
  return (
    <>
     <Header as='h4' color='grey'>Skills</Header>
        { showSkillsForm ?  <SkillsForm handleSkillsSubmit={handleSkillsSubmit} onSkillsChange={onSkillsChange}/> : <></> }
        {user.id === id  ? <><Button basic circular icon='plus' floated='right' size='tiny' onClick={()=>{
            setShowSkillsForm(!showSkillsForm)
          }}/></>:<></>}
        { userProfile?.profile?.skills.map((skill)=> <SkillLabel skill={skill} />)}
      <Divider />
    </>
  )
}

export default SkillsSection
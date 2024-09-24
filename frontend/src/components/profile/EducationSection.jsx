import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react'
import EducationForm from './EducationForm';
import EducationListItem from './EducationListItem';

function EducationSection({onEducationChange, eduType, handleAddEducation, setEduType}) {
  const {user} = useSelector((state=>state.auth))
  const {userProfile} = useSelector((state=>state.userProfile))
  const {id} = useParams();
  const [showEducationForm, setShowEducationForm] = useState(false);
  return (
    <>
     { showEducationForm ? <><EducationForm type={eduType} handleAddEducation={handleAddEducation} onEducationChange={onEducationChange} /> </> : <></>}
      <Header as='h5' >College</Header>
      { user.id === id ? <>
        <Button floated='right' size='tiny' basic circular icon='plus'
          onClick={()=>{ setEduType('college')
            setShowEducationForm(!showEducationForm)
          }} />
        </> : <></>
      }
      { userProfile?.profile?.college.length > 0 ? userProfile?.profile?.college?.map(school=><EducationListItem type={'college'} school={school}/>) : <Header as='h4' >No Information.</Header>
      }
      <Header as='h5' >High School</Header>
      { user.id === id ? <> <Button floated='right' size='tiny' basic circular icon='plus' onClick={()=>{
          setEduType('highschool')
          setShowEducationForm(!showEducationForm)
        }} /> </> : <></> }
      { userProfile?.profile?.highschool.length > 0 ?
        userProfile?.profile?.highschool?.map(school=><EducationListItem school={school}/>) : <Header as='h4' >No Information.</Header> }
      <Header as='h5' >Elementary</Header>
      { user.id === id ?
        <>
          <Button floated='right' size='tiny' basic circular icon='plus' onClick={()=>{
              setEduType('elementary')
              setShowEducationForm(!showEducationForm)
            }}  />
        </> : <></>
      }
      { userProfile?.profile?.elementary?.length > 0 ? userProfile?.profile?.elementary?.map(school=><EducationListItem school={school}/>) : <Header as='h4' >No Information.</Header>}
    </>
  )
}

export default EducationSection
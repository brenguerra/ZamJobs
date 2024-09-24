import { List } from 'semantic-ui-react'

function EducationListItem({type, school}) {
  return (
    <>
    <List.Item style= {{marginLeft:'20px'}}>
      <List.Icon name='marker' />
      <List.Content>
        <List.Header>{school.name}</List.Header>
        <List.Description>
          {type === 'college' ? <>{school.course } | </> : <></>}
          {school.yearAttended} - {school.yearGraduated}
        </List.Description>
      </List.Content>
    </List.Item>
    </>
  )
}

export default EducationListItem
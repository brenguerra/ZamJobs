import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Header, Icon, List, Segment } from 'semantic-ui-react'

function Footer() {
  return (
    <Segment inverted vertical style={{ padding: '2em 0em', marginTop: '100px' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Support' />
            <List link inverted>
              <Link to='/help'>
              <List.Item as='a'>Help</List.Item>
              </Link>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header as='h4' inverted>
              ZPPSU | GP 7 	&copy; 2022
            </Header>
            <List style={{paddingLeft:'15px'}}>
              <List.Item> <Icon name='right triangle' />Alvarez, Joseph Adonis B.</List.Item>
              <List.Item> <Icon name='right triangle' /> Asmad, Benedict Mahatma Z.</List.Item>
              <List.Item> <Icon name='right triangle' />Aculbe, Rachel Q.</List.Item>
              <List.Item> <Icon name='right triangle' /> Kuan, Kenneth R.</List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
  )
}

export default Footer
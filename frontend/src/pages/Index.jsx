import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import {Fade} from "react-awesome-reveal";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react'

function Index() {
  const navigate = useNavigate();
  const {user} = useSelector((state)=> state.auth)
  useEffect(()=> {
    if(user){
      navigate('/dashboard')
    }
  }, [navigate, user])

  return (
    <>
    <Segment style={{ padding: '10em 0em' }} vertical>
      <Fade duration={'1500'} direction='up' triggerOnce>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column  textAlign='center' width={8}>
            <Header as='h3' style={{ fontSize: '3em' }}>
            Welcome to Zamjobs
            </Header>
            <p style={{ fontSize: '2em' }}>
              Community driven job marketplace for freelance manual workers
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={8}>
            <Image  fluid src='undraw_under_construction_46pa.png' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button onClick={() => {navigate('/register')}} primary style={{ marginTop:'100px' }} size='huge'>Register now!</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Fade>
    </Segment>

    <Grid style={{ padding: '3em 0em' }} container stackable verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column  width={8}>
            <Fade triggerOnce delay={'100'}   direction='left'  duration={'1500'}>
                <Image  fluid src='client.png' />
          </Fade>
        </Grid.Column>
        <Grid.Column style={{height:'100%'}} floated='left' width={8}>
            <Fade triggerOnce direction='right' duration={'1500'} delay={'50'}>
            <Header as='h3' style={{ fontSize: '2.5em', paddingTop:'100px' }}>
            Free for individuals
            </Header>
            <p style={{ fontSize: '2em', paddingTop:'20px' }}>
            Empower your community and find your next job on Zamjobs
            </p>
          </Fade>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      </Grid.Row>
    </Grid>

    <Grid style={{ padding: '3em 0em' }} container stackable verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column width={8}>
          <Fade delay={'50'} triggerOnce  direction='left'  duration={'1500'}>
            <Header as='h3' style={{ fontSize: '2.5em', paddingTop:'100px'}}>
            Join and Earn
            </Header>
            <p style={{ fontSize: '2em', paddingTop:'20px' }}>
              Join the Zamjobs community and discover job opportunities right in your backyard
            </p>
          </Fade>
        </Grid.Column>
        <Grid.Column floated='right' width={8}>
          <Fade delay={'100'} triggerOnce  direction='right'  duration={'1500'}>
              <Image  fluid src='Engineer.png' />
          </Fade>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  {/* 
  <Zoom delay={'100'} triggerOnce duration={'1500'}>
  <Segment style={{ padding: '0em' }} vertical>
    <Grid celled='internally' columns='equal' stackable>
      <Grid.Row textAlign='center'>
        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
          <Header as='h3' style={{ fontSize: '1.5em' }}>
            "Good service"
          </Header>
          <p style={{ fontSize: '1.2em' }}>That is what they all say about us</p>
        </Grid.Column>
        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em'}}>
          <Header as='h3' style={{ fontSize: '1.5em' }}>
            "Easy to find talented individuals"
          </Header>
          <p style={{ fontSize: '1.2em' }}>
            <Image avatar src='avatars/nan.jpg' />
            <b>Nanay</b> Local Resident
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment> 
  </Zoom>
  */}
    <Fade delay={'100'} triggerOnce duration={'1500'}>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2.5em', }}>
            Find jobs in your area
          </Header>
          <p style={{ fontSize: '2em',paddingTop:'20px' }}>
          Connect with your neighbors and land your next career opportunity on Zamjobs"
          </p>
          <Button as='a' size='large'>
            Read More
          </Button>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '1.3em 0em', textTransform: 'uppercase' }}
          >
            <Header>Still not convinced?</Header>
          </Divider>

          <Header as='h3' style={{ fontSize: '2.5em' }}>
          Try it for yourself
          </Header>
          <p style={{ fontSize: '1.8em', paddingTop:'20px' }}>
          Connecting your community to job opportunities, one click at a time!
          </p>
          <Button onClick={() => {navigate('/register')}} as='a' size='large'>
            Register
          </Button>
        </Container>
      </Segment>
    </Fade>
  </>
  )
}

export default Index
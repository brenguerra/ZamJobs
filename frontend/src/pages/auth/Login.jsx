import { Button, Form, Grid, Header, Image, Message, Segment, Dimmer, Loader } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import {login, reset} from '../../features/auth/authSlice'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {user, authLoading, authError, authSuccess, authMessage} = useSelector((state)=> state.auth)

  const onChange = (e) => {
    setFormData(prevState =>({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }
  const {email, password} = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    const userCredentials = {
      email,
      password
    };
    dispatch(login(userCredentials));

  };

  useEffect (() => {
    if(authError){
      toast.error(authMessage)
    }

    if(authSuccess || user){
      navigate('/jobs')
    }

    return () => {
      dispatch(reset())
    };
  },[user, navigate, dispatch, authError, authSuccess, authMessage]);



  return (
    <>
    <Dimmer active={authLoading}>
        <Loader>Loading</Loader>
    </Dimmer>
    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>

      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/favicons/android-chrome-192x192.png' /> Log-in to your account
        </Header>
        <Form size='large' onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              onChange={onChange}
              placeholder='E-mail address'
              name='email'
              value={email}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              name='password'
              value={password}
              onChange={onChange}
              type='password'
            />
            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to='/register'>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
    </>
  )
}

export default Login
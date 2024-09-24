import {toast} from 'react-toastify'
import {Form, Button, Message,Dimmer, Loader, Grid, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import {register, reset} from '../../features/auth/authSlice'


function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    address: '',
    phone:'',
  });

  const [isChecked, setIsChecked] = useState(false);

  const [role, setRole] = useState('');

  const {
    firstname,
    lastname,
    email,
    password,
    password2,
    phone,
    address,
  } = formData;

  const {user, authLoading, authError, authSuccess, authMessage} = useSelector((state)=> state.auth);

  useEffect(()=> {

    if(authError){
      toast.error(authMessage);
    }

    if(authSuccess || user){
      navigate('/');
    }

    dispatch(reset());
  }, [user, navigate, dispatch, authError, authSuccess, authMessage]);

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onRoleChange = (e, data) => {
    setRole(data.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(!isChecked){
      toast.error('Must aggree to terms and conditions')
      return
    }
    if(password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        firstname,
        lastname,
        email,
        password,
        phone,
        address,
        role
      }
      dispatch(register(userData))
    }
  }

  const roles = [
    { key: 'clt', value: 'client', text: 'Client' },
    { key: 'worker', value: 'worker', text: 'Worker' },
  ]

  return (
    <>

    <Dimmer active={authLoading}>
      <Loader>Loading</Loader>
    </Dimmer>
    <Grid textAlign='center'  style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column textAlign='left'  style={{ maxWidth: 750 }}>
        <Message
        attached
        header='Account Register'
        content='Fill out the form below to sign-up for a new account'
        />
        <Form className='attached fluid segment' onSubmit={onSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              onChange={onChange}
              name='firstname'
              label='First Name'
              placeholder='First Name'
              type='text'
              required={true}
            />
            <Form.Input
              fluid
              onChange={onChange}
              name='lastname'
              label='Last Name'
              placeholder='Last Name'
              required={true}
              type='text'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input name='address' required={true} label='Address' onChange={onChange} placeholder='Address' type='text' />
            <Form.Input name='phone' required={true}  label='Phone Number' onChange={onChange} placeholder='Phone No.' type='text' />
            <Form.Input name='email' required={true} label='Email' onChange={onChange} placeholder='Email address' type='email' />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input name='password' required={true} onChange={onChange} label='Password' type='password' />
            <Form.Input label='Confirm password' required={true} onChange={onChange} type='password' name='password2'/>
          </Form.Group>
          <Form.Select
            fluid
            label='Join as client or worker'
            name='role'
            placeholder='Join as ..'
            options={roles}
            required={true}
            onChange={onRoleChange}
          />
          <Form.Checkbox  inline label='I agree to the terms and conditions'
            checked={isChecked}
            required={true}
            onClick={(e) => {setIsChecked(!isChecked)}}
          />
          <Button fluid color='teal'>Register</Button>
        </Form>
        <Container textAlign='center'>
        <Message attached='bottom' warning>
          Already signed up?&nbsp;<Link to='/login'>Login here</Link>&nbsp;instead.
        </Message>
        </Container>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Register
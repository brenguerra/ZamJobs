import {useEffect,} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {findOrCreateChat} from '../../features/chat/chatSlice';
import { Button, Dropdown } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ContactButtons({user, id, options}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, isError, isSuccess, message } = useSelector((state)=> state.chat);

  const onMessageClick = (e) => {
    e.preventDefault();
    dispatch(findOrCreateChat(id));
  }

  useEffect(()=> {
    if(isSuccess) {
      navigate('/chat');
    }
    if(isError) {
      toast.error(message)
    }
  }, [isError, isSuccess, message, navigate])

  return (
    <>
    { user.id !== id  ? <>
      <Button.Group floated='right'>
        <Button  size='tiny' basic color='green' icon='mail' onClick={onMessageClick}
          loading={isLoading} content='Message' />
        <Dropdown
          text='Invite'
          icon='plus'
          labeled
          button basic
          className='icon'

        >
          <Dropdown.Menu>
            <Dropdown.Menu scrolling>
              {options.map((option) => (
                <Dropdown.Item key={option.value} {...option} />
              ))}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </Button.Group>
        </> : <></>
      }
    </>
  )
}

export default ContactButtons
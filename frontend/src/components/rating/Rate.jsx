import { useState } from 'react'
import { Button, Container, Header, Image, Modal, Rating, TextArea,  } from 'semantic-ui-react'
import {submitRating} from '../../features/rating/ratingSlice'
import {useDispatch} from 'react-redux'


function Rate({rating, contractId, contract}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('');
  const [rate, setRate] = useState(1)

  const handleRate = (e, data)=> {
    e.preventDefault();
    setOpen(false)
    const ratingData = {
      contractId: contractId,
      rate:rate,
      talentId:contract.talent._id,
      text:text,
    }
    dispatch(submitRating(ratingData))
  }

  return (
    <>
    <Modal
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      size='tiny'
      trigger={<Button secondary>Submit rating</Button>}
    >
      <Modal.Header><Header textAlign='center' as='h3'>Submit your rating</Header></Modal.Header>
      <Modal.Content >
        <Modal.Description>
          <Image centered src={contract.talent.photos[contract.talent.photos.length-1].url} size='small' circular />
        </Modal.Description>
        <Container textAlign='center'>
          <Header
            as='h3'
            style={{padding:'10px 0', fontWeight:'500'}}
          >
            {contract.talent.firstname} {contract.talent.lastname}
          </Header>
          <Rating
            size='massive'
            disabled={rating}
            onRate={(e, data)=>setRate(data.rating)}
            icon='star'
            defaultRating={3}
            maxRating={5}
          />
          <div style={{padding:'20px'}} >
          <TextArea onChange={(e)=>setText(e.target.value)} style={{width:'100%'}} placeholder='Tell us more' />
          </div>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleRate}>Submit</Button>
      </Modal.Actions>
   </Modal>
    </>
  )
}

export default Rate;
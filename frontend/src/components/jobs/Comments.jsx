import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { Button, Comment, Form, Header } from 'semantic-ui-react'


function Comments({offer, offers, onOfferChange, onOfferSubmit}) {

  return (
    <>
    <Comment.Group>
    <Header as='h3' dividing>
      Offers
    </Header>
      { offers?.length > 0 ? (
        offers.map(offer=> (
        <Comment key={offer._id} >
          <Comment.Avatar src={offer.talent.photos.length > 0 ? offer?.talent?.photos[offer?.talent?.photos.length-1].url : '/matt.jpg'} />
          <Comment.Content>
            <Comment.Author> <Link to={`/user/${offer?.talent?._id}`}> {offer.talent?.firstname} {offer.talent?.lastname} </Link></Comment.Author>
            <Comment.Metadata>
              <Moment interval={3000} fromNow ago>{offer.createdAt}</Moment> ago
            </Comment.Metadata>
            <Comment.Text>{offer.text}</Comment.Text>
            {/* <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions> */}
          </Comment.Content>
        </Comment>))
      ): (
        <Header style={{padding:'20px'}} as='h3' textAlign='center'> No offers yet.</Header>
      )}
      <Form  onSubmit={onOfferSubmit} reply>
        <Form.TextArea placeholder='Enter offer' onChange={onOfferChange} value={offer}/>
        <Button  content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>
    </>

  )
}

export default Comments
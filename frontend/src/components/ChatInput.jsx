import React from 'react'
import { Button, Form } from 'semantic-ui-react'

function ChatInput({handleSubmit, newMessage, setNewMessage}) {
  return (
    <>
    <Form style={{width:'100%'}}>
    <Form.TextArea label='Message'
      value={newMessage}
      onChange={(e)=>{setNewMessage(e.target.value)}}
      placeholder='Aa' />

    <Button onClick={handleSubmit} disabled={newMessage.length===0} basic fluid>Send</Button>
    </Form>
    </>
  )
}

export default ChatInput
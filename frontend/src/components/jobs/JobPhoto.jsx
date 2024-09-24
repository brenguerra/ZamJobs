import React from 'react'
import { Form, Icon } from 'semantic-ui-react'

function JobPhoto({onFileChange}) {
  return (
    <Form encType="multipart/form-data">
      <div style={{margin:'auto', width:'100%', border:'thin solid #B2BEB5', textAlign:'center', padding: '50px', marginTop:'20px'}}>
        <label  htmlFor='profilePicture' style={{fontSize:'1.5rem',}}>
          Select picture
        <Icon style={{display:'block', margin:'auto', marginTop: '20px'}}  name='camera retro' size='huge' />
        </label>
        <input style={{display: 'none'}} id='profilePicture' type='file' multiple onChange={onFileChange }/>
      </div>
    </Form>
  );
}
export default JobPhoto
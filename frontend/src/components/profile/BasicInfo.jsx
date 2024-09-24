import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Divider, Header, List, Rating, Image, Button, Form, Icon } from 'semantic-ui-react'
import {uploadProfilePicture} from '../../features/userProfile/userProfileSlice'
import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify';
import {getUserPhotos} from '../../features/photos/photoSlice'

function BasicInfo({profile}) {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth)
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [profilePicture, setProfilePicture] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [uploadPhoto, setUploadPhoto] = useState();
  const {photos, photoError, photoMessage} = useSelector((state)=>state.photos);

  const onFileChange = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      setSelectedFile(undefined)
      // toast
      return
    }

    setSelectedFile(files[0]);
    const fileData = new FormData();

    Object.keys(files).forEach( key => fileData.append(files.item(key).name, files.item(key)));
    setUploadPhoto(fileData)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(!uploadPhoto){
      toast.error('no file selected')
    }
    dispatch(uploadProfilePicture({userId: id, uploadPhoto}));
  }

  useEffect(()=> {
    dispatch(getUserPhotos(id));

    if(photoError){
      toast.error(photoMessage)
    }

  }, [dispatch, id, photoError, photoMessage])

  useEffect(()=> {
    if (!selectedFile) {
      setProfilePicture(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setProfilePicture(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  },[selectedFile])

  return (
    <>
    {
      selectedFile ? <Image style={{margin:'auto'}}  src={profilePicture}  circular /> :
      photos?.length > 0 ? <Image src={photos[photos.length-1]}  circular /> :
      <Image style={{margin:'auto'}}  src='/square-image.png'  circular />
    }
      { user.id === id ?
        <>
        <Button style={{position:'relative', right: '20px', bottom:'50px'}} basic circular icon='plus' floated='right' size='tiny' onClick={()=>{setShowUploadForm(!showUploadForm)}} />

        </>:<></>
      }
      {showUploadForm ?
        <>
          <Form encType="multipart/form-data">
            <div style={{margin:'auto', width:'100%', border:'thin solid #B2BEB5', textAlign:'center', padding: '10px', marginTop:'20px'}}>
              <label  htmlFor='profilePicture'>
                Select picture
              <Icon style={{display:'block', margin:'auto'}}  name='camera retro' size='large' />
              </label>
              <input style={{display: 'none'}} id='profilePicture' type='file'  onChange={onFileChange }/>
            </div>
            <Button primary fluid size='tiny' onClick={onSubmit}> Upload</Button>
          </Form>
        </>:<></>}
      <Header as='h2' textAlign='center' color='orange'>{profile?.firstname} {profile?.lastname}</Header>
      <Divider />
      <Container  textAlign='center'>
        <Header as='h3' textAlign='center' color='yellow'> Rating</Header>
        <Header as='span' textAlign='center' color='blue'> {profile?.avgRating} </Header>
        <Rating size='tiny' maxRating={5} defaultRating={profile?.avgRating} icon='star' disabled/>
      </Container>
      <Container style={{padding: '25px 25px'}}>
        <List>
          {/* <List.Item icon='users' content='Painters Club' /> */}
          <List.Item icon='marker' content={profile?.address} />
          <List.Item icon='mail' content={profile?.email}/>
          <List.Item icon='user circle' content={profile?.status}/>
        </List>
      </Container>
    </>
  )
}

export default BasicInfo
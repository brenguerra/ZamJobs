import { CarouselProvider, Slider } from 'pure-react-carousel'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Dimmer, Header, Loader } from 'semantic-ui-react'
import {getUsersByCategory, reset as profileReset} from '../../features/userProfile/userProfileSlice'
import CustomCardSlide from './CustomCardSlide'
import SliderButtons from './SliderButtons'

function Carousel({category, text}) {
  const dispatch = useDispatch();
  const {userProfiles, userProfileLoading, userProfileError, userProfileMessage} = useSelector((state)=>state.userProfile);

  useEffect(()=> {
    if(userProfileError){
      toast.error(userProfileMessage)
    }
    dispatch(getUsersByCategory(category));
    return () => {
      dispatch(profileReset());
    }
  },[dispatch]);

  if( userProfileLoading){
    return <>
    <Dimmer>
      <Loader inverted> Loading </Loader>
    </Dimmer>
    </>
  }
  return (
    <>
    <Header style={{padding:'10px'}}>{text}</Header>
    <CarouselProvider
      naturalSlideWidth={1}
      naturalSlideHeight={1}
      totalSlides={userProfiles?.length || 1}
      visibleSlides={1}
      style={{ width: '100%' }}
    >
      <Slider>
        {
          userProfiles?.map(profile=> <CustomCardSlide key={profile._id} category={category} profile={profile} />)
        }

      </Slider>
      <SliderButtons />
    </CarouselProvider>
    </>
  )
}

export default Carousel
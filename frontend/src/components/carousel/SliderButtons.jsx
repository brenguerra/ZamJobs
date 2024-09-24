import { ButtonBack, ButtonNext } from 'pure-react-carousel'
import React from 'react'
import { Icon } from 'semantic-ui-react';
import './carousel.css';
function SliderButtons() {
  return (
    <>
    <ButtonBack className='buttonBack'>
      <Icon circular name='angle left' size='large' />
    </ButtonBack>
    <ButtonNext className='buttonNext'>
      <Icon  circular name='angle right' size='large' />
    </ButtonNext>
    </>
  )
}

export default SliderButtons
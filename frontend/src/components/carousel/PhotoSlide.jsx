import { Slide } from 'pure-react-carousel'
import React from 'react'
import { Image } from 'semantic-ui-react'

function PhotoSlide({index, src}) {
  return (
    <>
      <Slide index={index}>
        <Image src={src} />
      </Slide>
    </>
  )
}

export default PhotoSlide
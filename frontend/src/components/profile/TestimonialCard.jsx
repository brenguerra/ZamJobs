import { useState } from 'react';
import { Card, Rating } from 'semantic-ui-react'

function TestimonialCard({ratings}) {
  const [testimonials, setTestimonials] = useState(ratings?.filter(rating => rating.rating >= 4));

  return (
    <>
    {testimonials?.map((testimonial) =>
    <Card key={testimonial._id}>
      <Card.Content>
        <Card.Header></Card.Header>
        <Card.Meta>{testimonial.user.firstname}  {testimonial.user.lastname} </Card.Meta>
        <Card.Description>
          <Rating size='tiny' maxRating={5} defaultRating={testimonial.rating} icon='star' disabled/>
          <p>
            {testimonial.text}
          </p>
        </Card.Description>
      </Card.Content>
    </Card>)
    }

    </>
  )
}

export default TestimonialCard
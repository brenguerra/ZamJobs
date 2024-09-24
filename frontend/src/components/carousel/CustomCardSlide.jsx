
import { Slide } from "pure-react-carousel";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Rating } from "semantic-ui-react";

const CustomCardSlide = ({ index, category, profile }) => {

  return (
  <Slide index={index}>
    <div style={{ padding: 10 }}>
    <Card>
      <Card.Content>

        <Card.Header textAlign="center">{profile.firstname} {profile.lastname} </Card.Header>
        <Card.Meta textAlign="center">{category}</Card.Meta>
        <Card.Description textAlign="center">
        <Rating
            size='tiny'
            disabled={profile.avgRating}
            icon='star'
            defaultRating={profile.avgRating}
            maxRating={5}
          />
          <Header style={{margin:'0', padding:'2px 0'}}>{profile.avgRating} Stars</Header>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/user/${profile._id}`}>
          <Button fluid basic color='blue'>
            Profile
          </Button>
        </Link>
      </Card.Content>
    </Card>
    </div>
  </Slide>
  );
}

export default CustomCardSlide;

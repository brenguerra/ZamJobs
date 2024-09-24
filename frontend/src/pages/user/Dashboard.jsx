
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dimmer, Grid, Loader, Segment } from "semantic-ui-react";
import Carousel from "../../components/carousel/Carousel";
import DashboardSideNav from "../../components/includes/DashboardSideNav";

function Dashboard() {
  const navigate = useNavigate();
  const {user, authLoading} = useSelector((state) => state.auth);

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])
  if(authLoading) {
    return (
      <>
      <Dimmer>
        <Loader>Loading</Loader>
      </Dimmer>
      </>
    )
  }

  return (
  <>
  <Grid stackable>
    <Grid.Row>
      <Grid.Column width={4} only='tablet computer'>
        <DashboardSideNav />
      </Grid.Column>
      <Grid.Column width={12}>
        <Segment >
          <Carousel text='Top Workers' category={'carpentry'}/>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </>
  )
}

export default Dashboard
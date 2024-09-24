
import { Link } from 'react-router-dom'
import { Button, Header, Image, List, Rating } from 'semantic-ui-react'
import Moment from 'react-moment';
import 'moment-timezone';
import Rate from '../rating/Rate';

function ContractListItem({contract, setCurrentContract, setFinishOpen,setTerminateOpen}) {

  const handleFinish = (e)=> {
    e.preventDefault();
    setCurrentContract(contract)
    setFinishOpen(true)
  }
  const handleTerminate = (e) => {
    e.preventDefault();
    setCurrentContract(contract)
    setTerminateOpen(true)
  }

  return (
    <>
    <List.Item>
      <List.Content floated='right'>
        {
          contract.status==='ongoing' ? (
          <Button.Group>
            <Button positive onClick={handleFinish}>Finish</Button>
            <Button negative onClick={handleTerminate}>Terminate</Button>
          </Button.Group>
          ) : (
          <>
          {
            contract.status === 'finished' && !contract.rating ? (
              <div  style={{padding:'15px'}}>
                <Rate rating={contract.rating} contractId={contract._id} contract={contract} />
              </div>
            ) :
              contract.status === 'terminated' ? (<Header style={{padding:'15px'}} textAlign='center' as='h5'>Terminated</Header>
            ) : (
              <div  style={{padding:'15px'}}>
                <Header textAlign='center' as='h5'>Rated</Header>
                <Rating disabled rating={contract.rating.rating} defaultRating={contract.rating.rating} maxRating={5} />
              </div>
          )
          }
          </>
          )
        }
      </List.Content>
      <Image avatar src={contract?.talent.photos[contract.talent.photos.length-1].url} />
      <List.Content>
        <List.Header>
          <Link to='/jobs'>{contract?.talent.firstname} {contract?.talent.lastname} </Link>
        </List.Header>
        <List.Description>
          <p style={{padding:'0px', margin:'5px 0'}}>
            <b>{contract?.status.toUpperCase()}</b>
          </p>
          <span>Started on </span><Moment format="DD/MM/YY"  date={new Date(contract.createdAt)}/>
          <span> Until </span> <Moment format="DD/MM/YY"  date={new Date(contract.createdAt)}/>
        </List.Description>
      </List.Content>
    </List.Item>
    </>
  )
}

export default ContractListItem
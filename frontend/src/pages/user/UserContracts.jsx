import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dimmer, Grid, List, Loader, Tab } from 'semantic-ui-react'
import ContractItem from '../../components/contracts/ContractItem'
import {getUserContracts, reset as contractReset} from '../../features/contracts/contractSlice';
import {getApplications, reset as applicationReset} from '../../features/application/applicationSlice';
import ApplicationItem from '../../components/applications/ApplicationItem';


function UserContracts() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth);
    const {contracts, contractError, contractMessage, contractLoading} = useSelector((state)=> state.contract)
    const {applications, applicationsError, applicationsMessage, applicationsLoading} = useSelector((state)=> state.application)
    const ongoing = contracts.filter(contract => contract.status==='ongoing');
    const finished = contracts.filter(contract => contract.status==='finished');
    const terminated = contracts.filter(contract => contract.status==='terminated');
    useEffect(()=> {
      if(contractError) {
        toast.error(contractMessage);
      }
      if(!user ) {
        navigate('/login')
      }
      if(user.session === 'client') {
        navigate('/dashboard')
      }
      dispatch(getUserContracts(user.id));
      dispatch(getApplications(user.id));
      return ()=> {
        dispatch(contractReset());
        dispatch(applicationReset())
      }
    },[user, dispatch, navigate, contractError])
    let panes;

    panes = [
      { menuItem: 'All', render: () =>
      <Tab.Pane key={'allcontracts'} style={{minHeight: '300px'}}>
        <List style={{minHeight:'300px'}} animated   divided relaxed>
          {
            contracts.map(contract => <ContractItem key={contract._id} contract={contract} />)
          }
        </List>
      </Tab.Pane> },
      { menuItem: 'Active', render: () =>
      <Tab.Pane key={'active'} style={{minHeight: '300px'}}>
        <List style={{minHeight:'300px'}} animated   divided relaxed>
          {
            ongoing.map(contract =><ContractItem key={contract._id}  contract={contract}/> )
          }

        </List>
      </Tab.Pane> },
      { menuItem: 'Finished', render: () =>
      <Tab.Pane key={'finished'} style={{minHeight: '300px'}}>
        <List style={{minHeight:'300px'}} animated   divided relaxed>
          {
            finished.map(contract=> <ContractItem key={contract._id} contract={contract}/>)
          }

        </List>
      </Tab.Pane> },
      { menuItem: 'Terminated', render: () =>
      <Tab.Pane key={'terminated'} style={{minHeight: '300px'}}>
        <List style={{minHeight:'300px'}} animated   divided relaxed>
          {
            terminated.map(contract=> <ContractItem contract={contract}/>)
          }
        </List>
      </Tab.Pane> },
      { menuItem: 'Applications', render: () =>
      <Tab.Pane key={'applications'} style={{minHeight: '300px'}}>
        <List style={{minHeight:'300px'}} animated   divided relaxed>
          {
            applications.map(application => <ApplicationItem key={application._id} application={application}/>)
          }
        </List>
      </Tab.Pane> },
    ];
    if(contractLoading) {
      return (
        <>
        <Dimmer>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        </>
      )
    }

    return (
      <>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={16}>
            <Tab  style={{padding: '40px'}} menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
}

export default UserContracts

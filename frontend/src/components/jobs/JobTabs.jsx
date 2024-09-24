import { useReducer, useState } from 'react';
import { Tab } from 'semantic-ui-react'
import ListUserJobs from '../user/ListUserJobs'
import EditModal from '../user/EditModal';
import DeleteModal from '../user/DeleteModal';
import ViewModal from '../user/ViewModal';

const modalReducer = (state, modalAction) => {
  switch(modalAction.type) {
    case 'editModalOpen':
      return {...state, editModalOpen:true};
    case 'deleteModalOpen':
      return {...state, deleteModalOpen:true};
    case 'viewModalOpen':
      return {...state, viewModalOpen:true};
    case 'CLOSE_MODAL':
      return { ...state, editModalOpen:false,  deleteModalOpen:false, viewModalOpen: false};
    default:
      throw new Error('Something went wrong while trying to open the modal');
  }
}

function JobTabs({jobs, isLoading}) {
  const vacant = jobs.filter( job => job.isOpen===true);
  const complete = jobs.filter( job => job.isOpen===false);

  const [state, modalDispatch] = useReducer(modalReducer, {
    editModalOpen:false,
    deleteModalOpen: false,
    viewModalOpen: false,
  });

  const [currentJob, setCurrentJob] = useState(null);
  const {editModalOpen, deleteModalOpen, viewModalOpen} = state;


  const panes = [
    {
      menuItem: 'All',
      render: () =>
      <Tab.Pane loading={isLoading} attached={false}>
        <ListUserJobs setCurrentJob={setCurrentJob} jobs={jobs} modalDispatch={modalDispatch} />
      </Tab.Pane>,
    },
    {
      menuItem: 'Vacant',
      render: () =>
      <Tab.Pane loading={isLoading} attached={false} modalDispatch={modalDispatch}>
        <ListUserJobs jobs={vacant} />
      </Tab.Pane>,
    },
    {
      menuItem: 'Completed',
      render: () =>
      <Tab.Pane loading={isLoading} attached={false} >
        <ListUserJobs jobs={complete} />
      </Tab.Pane>,
    },

  ]
  return (
    <>
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    <div style={{maxWidth:'90%', paddingLeft:'10px'}}>
      <EditModal job={currentJob} currentJob={currentJob} modalDispatch={modalDispatch} open={editModalOpen} />
      <DeleteModal currentJob={currentJob} modalDispatch={modalDispatch} open={deleteModalOpen} />
      <ViewModal currentJob={currentJob} modalDispatch={modalDispatch} open={viewModalOpen} />
    </div>
    </>
  )
}

export default JobTabs
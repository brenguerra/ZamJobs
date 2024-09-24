import { Button, Modal } from 'semantic-ui-react'
import {useDispatch} from 'react-redux'

import {deleteJob} from '../../features/jobs/jobSlice';

function DeleteModal({open, modalDispatch, currentJob}) {
	const dispatch = useDispatch();

	const handleDeleteJob = () => {
		dispatch(deleteJob(currentJob._id));
		modalDispatch({ type: 'CLOSE_MODAL' });
	}

  return (
    <Modal
		size='tiny'
		closeOnEscape={true}
		closeOnDimmerClick={true}
		open={open}
		onClose={() => modalDispatch({ type: 'CLOSE_MODAL' })}
		>
			<Modal.Header>Delete Job</Modal.Header>
			<Modal.Content>
				<p>Are you sure you want to delete job?</p>
			</Modal.Content>
			<Modal.Actions>
				<Button
					onClick={()=>{
						modalDispatch({type: 'CLOSE_MODAL'})
					}}
					positive
				> 
					No
				</Button>
				<Button
					onClick={handleDeleteJob}
					negative
				>
					Yes
				</Button>
			</Modal.Actions>
		</Modal>
  )
}

export default DeleteModal
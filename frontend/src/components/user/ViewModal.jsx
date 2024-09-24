import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function ViewModal({open, modalDispatch}) {


  return (
    <Modal
		closeOnEscape={true}
		closeOnDimmerClick={true}
		open={open}
		onClose={() => modalDispatch({ type: 'CLOSE_MODAL' })}
		>
			<Modal.Header>View Job</Modal.Header>
			<Modal.Content>
				<p>Are you sure you want to delete your account</p>
			</Modal.Content>
			<Modal.Actions>
				<Button
					negative
				>
					No
				</Button>
				<Button
					positive
				>
					Yes
				</Button>
			</Modal.Actions>
		</Modal>

  )
}

export default ViewModal;
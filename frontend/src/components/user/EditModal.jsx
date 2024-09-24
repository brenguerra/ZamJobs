import React from 'react'
import { Button, Dimmer, Loader, Modal } from 'semantic-ui-react'
import JobForm from '../jobs/JobForm';
import { useState } from 'react';
import { useEffect } from 'react';
import {updateJob} from '../../features/jobs/jobSlice'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify';

function EditModal({job, open, modalDispatch}) {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
    title:'',
    description: '',
    budget: '',
    address: '',
	city: '',
    duration: '',
  }); 

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

	const {isSuccess, isError, isLoading, message} = useSelector((state)=> state.jobs)

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(updateJob({jobId:job._id, formData}))
	}

	useEffect(()=> {
		if(isSuccess){
			toast.success('Job updated');
		}
		if(job){
			setFormData((prevState) => ({
				...prevState,
				title:job.title,
				description: job.description,
				budget: job.budget,
				address: job.address,
				city: job.city,
				duration: job.duration,
			}))
		}
	},[job, dispatch, isError, message, isSuccess, modalDispatch])

  return (
		
		<Modal
			centered={false}
			size='tiny'
			style={{maxWidth:'85%'}}
			closeOnEscape={true}
			closeOnDimmerClick={true}
			open={open}
			onClose={() => modalDispatch({ type: 'CLOSE_MODAL' })}
		>
			<Dimmer active={isLoading}inverted>
				<Loader/>
			</Dimmer>
			<Modal.Header>Edit Job</Modal.Header>
			<Modal.Content scrolling>
				<JobForm  onChange={onChange} formData={formData} />
			</Modal.Content >
			<Modal.Actions>
				<Button positive loading={isLoading} onClick={handleSubmit}>
					Submit
				</Button>
			</Modal.Actions>
		</Modal>
  )
}

export default EditModal
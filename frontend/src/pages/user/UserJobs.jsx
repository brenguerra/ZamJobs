
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import JobTabs from '../../components/jobs/JobTabs'
import {getUserJob, reset} from '../../features/jobs/jobSlice';
import {toast} from 'react-toastify'

function UserJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=> state.auth);

  const {jobs, isSuccess, isLoading, isError, message} = useSelector((state)=> state.jobs);

  useEffect(()=> {
    if(!user){
      navigate('/login')
    }
    if(isError) {
      toast.error(message);
    }
    if(isSuccess){
      dispatch(getUserJob());
    }
    dispatch(getUserJob());
    return ()  => {
      dispatch(reset());
    }
  },[user, dispatch, isError, message, navigate, isSuccess])
  return (
    <>
      <JobTabs isLoading={isLoading} jobs={jobs}/>
    </>
  )
}

export default UserJobs
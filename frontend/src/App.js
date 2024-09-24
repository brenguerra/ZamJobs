import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {React} from 'react';
import { Container} from "semantic-ui-react";
import {ToastContainer} from 'react-toastify';
import Dashboard from './pages/user/Dashboard';
import Index from './pages/Index';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/includes/Header';
import NotFound from './pages/NotFound';
import Job from './pages/job/Job';
import JobList from './pages/job/JobList';
import PostJob from "./pages/job/PostJob";
import UserJobs from "./pages/user/UserJobs";
import 'react-toastify/dist/ReactToastify.css'
import Messenger from "./pages/messenger/Messenger";
import Footer from "./components/includes/Footer";
import Profile from "./pages/user/Profile";
import UserJobView from "./pages/user/UserJobView";
import UsersNotFound from "./pages/user/UserNotFound";
import "pure-react-carousel/dist/react-carousel.es.css";
import UserContracts from "./pages/user/UserContracts";
import Help from "./pages/Help";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
      <Header />
        <Container style={{minHeight:'500px'}}>
          <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            {/* <Route path="/contact" element={<ContactUs/>} /> */}
            <Route ex path="/chat" element={<Messenger/>} />
            <Route path="/help" element={<Help/>} />
            <Route path="/jobs">
              <Route exact index element={<JobList/>} />
              <Route exact path=":id" element={<Job/>} />
              <Route exact path="post" element={<PostJob/>} />
              <Route path='*' component={UsersNotFound} />
            </Route>
            <Route path="/user">
              <Route exact path=':id' element={<Profile/>} />
              <Route exact path="jobs" element={<UserJobs/>} />
              <Route exact path="contracts" element={<UserContracts/>} />
              <Route exact path="jobs/:jobId" element={<UserJobView/>} />
              <Route path='*' component={UsersNotFound} />
            </Route>
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
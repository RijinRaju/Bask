import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AdminHomePage from './Pages/AdminHomePage'
import Domains from './Components/Domains/Domains';
import AddBatch from './Components/AddBatch/AddBatch';
import AddAdvisor from './Components/AddAdvisor/AddAdvisor';
import ListAdvisors from './Components/ListAdvisors/ListAdvisors';
import AdvisorLogin from './Components/AdvisorLogin/AdvisorLogin';
import AdminLoginPage from './Pages/AdminLoginPage';
import AddTask from './Components/AddTask/AddTask';
import TaskDomain from './Components/TaskView/TaskView';
import UserHome from './Components/UserHome/UserHome';
import Profile from './Components/Profile/Profile';
import Tasks from './Components/Tasks/Tasks'
import TaskView from './Components/TaskView/TaskView'
import Chat from './Components/Chat/Chat';
import Lists from './Components/Lists/Lists';
import Manifests from './Components/Manifests/Manifests';
import AdvisorHome from './Components/AdvisorHome/AdvisorHome';
import Room from './Components/Room/Room';
import { ProfileContext } from './Context/ProfileContext'
import Report from './Components/Report/Report';
import AddConference from './Components/AddConference/AddConference'
import Conference from './Components/Conference/Conference'
import CheckTask from './Components/CheckTask/CheckTask';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import PrivateRouting from './PrivateRouting';
function App() {


  return (
    <div className="App">


        <Router>
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route exact path="/adm_login" element={<AdminLoginPage />} />
          <Route path="/adm_home" element={<AdminHomePage />}>
            <Route path="" element={<Domains />} />
            <Route path="add_batch" element={<AddBatch />} />
            <Route path="add_advisor" element={<AddAdvisor />} />
            <Route path="list_advisor" element={<ListAdvisors />} />
            <Route path="add_task" element={<AddTask />} />
            <Route path="task_view" element={<TaskView />} />
            <Route path="select_domain" element={<TaskDomain />} />
            <Route path="lists" element={<Lists />} />
            <Route path="manifests" element={<Manifests />} />
          </Route>
          <Route path="/adv_login" element={<AdvisorLogin />} />
          <Route path="/adv_home" element={<AdvisorHome />}>
            <Route path="" element={<Room data="advisor" />} />
            <Route path="lst_students" element={<Manifests data="advisor" />} />
            <Route path="report" element={<Report />} />
            <Route path="add_conference" element={<AddConference data="advisor" />} />
            <Route path="conf/:roomID" element={<Conference />} />
            <Route path="chk_task" element={<CheckTask />} />
          </Route>

          <Route path="/home" element={<UserHome />} >
            <Route path="" element={<Profile />} />
            <Route path="task" element={<Tasks />} />
            <Route path="room" element={<Room data='student' />} />
            <Route path='chat/:name' element={<Chat />} />
            <Route path="add_conference" element={<AddConference data="student" />} />
            <Route path="conf/:roomID" element={<Conference />} />
          </Route>

        </Routes>
        </Router>
    </div>
  );
}


export default App;



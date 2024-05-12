import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SelectAuth from './modules/auth/selectAuth';
import Login from './modules/auth/login';
import DefaultLayout from './layout/DefaultLayout';
import Events from './modules/events/events';
import CreateEvent from './modules/events/createEvent';
import CreateUser from './modules/users/createUser';
import Users from './modules/users/users';
import Dashboard from './modules/Dashboard/dashboard';
import PrivateRoute from './routes/protectedroute';
import UpdateEvent from './modules/events/updateEvent';
import UpdateUser from "./modules/users/updateUser";
import AssignMediaMember from "./modules/mediiaAdmin/assignMediaMember";
import EventJobOdffer from "./modules/mediaMembers/eventJobOffers";


function App() {

  return (
    <>
      <ToastContainer
        // position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />


      <Routes>
        <Route key="wewq" path="/" element={<SelectAuth />} />
        <Route key="wewq" path="/*" element={<SelectAuth />} />
        <Route key="asdw" path="/login" element={<Login />} />
          <Route element={<DefaultLayout />}>

            <Route key="ewr" path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route key="ewr" path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
            <Route key="ewr" path="/create/user" element={<PrivateRoute><CreateUser /></PrivateRoute>} />
            <Route key="ewr" path="/update-user/:userId" element={<UpdateUser/>} />

            <Route key="ewr" path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
            <Route key="ewr" path="/createEvent" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
            <Route key="ewr" path="/update-event/:eventId" element={<UpdateEvent/>} />

            <Route key="ewr" path="/assignMediaMember" element={<AssignMediaMember/>} />
            <Route key="ewr" path="/eventJobOffers" element={<EventJobOdffer/>} />

          </Route>
      </Routes>

    </>

  )
}

export default App

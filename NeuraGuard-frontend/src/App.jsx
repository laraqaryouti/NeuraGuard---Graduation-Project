
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/Signin.jsx'
import Auth from './pages/Auth'
import Index from './pages/Index'
import HealthData from './pages/HealthData.jsx'
import RBD from './pages/RBD.jsx'
import "./styling/index.css";
import "./styling/navbar.css";
import "./styling/signin.css";
import "./styling/signup.css";
import "./styling/sidebar.css";
import "./styling/healthnav.css";
import "./styling/healthdata.css";
import "./styling/rbd.css";
import "./styling/appointments.css";
import "./styling/view-profile.css";
import "./styling/diagnosis-result.css";
import "./styling/messages.css";
import "./styling/patients.css";
import "./App.css"
import Appointments from './pages/Appointments.jsx';
import DATSCAN from './pages/DATSCAN.jsx';
import Dashboard_Patient from './pages/Dashboard_Patient.jsx';
import ViewProfile from './pages/ViewProfile.jsx';
import Messages from './pages/Messages.jsx';
import DoctorAppointments from './pages/Doctor-Appointments.jsx';
import DoctorPatients from './pages/Doctor-Patients.jsx';
import DoctorDashboard from './pages/Doctor-Dashboard.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import DrViewProfile from "./pages/Doctor-ViewProfile.jsx";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Help from './pages/Help.jsx'
import DiagnosisResult from './pages/DiagnosisResult.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
  },
  {
    path: "/signin",
    element: <SignIn/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard_Patient/>,
  },
  {
    path: "/viewprofile",
    element: <ViewProfile/>,
  },
  {
    path: "/appointments",
    element: <Appointments/>,
  },
  {
    path: "/help&support",
    element: <Help/>,
  },
  {
    path: "/healthdata",
    element: <HealthData/>,
  },
  {
    path: "/diagnosisresult",
    element: <DiagnosisResult/>,
  },
  {
    path: "/rbdquestionnaire",
    element: <RBD/>,
  },
  {
    path: "/datspect",
    element: <DATSCAN/>,
  },
  {
    path: "/messages",
    element: <Messages/>,
  },
  {
    path: "/manageappointments",
    element: <DoctorAppointments/>,
  },
  {
    path: "/patients",
    element: <DoctorPatients/>,
  },
  {
    path: "/dashboard-dr",
    element: <DoctorDashboard/>,
  },
  {
    path: "/error",
    element: <ErrorPage/>,
  },
  {
    path: "/doctor-profile",
    element: <DrViewProfile/>,
  },

]);
function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App

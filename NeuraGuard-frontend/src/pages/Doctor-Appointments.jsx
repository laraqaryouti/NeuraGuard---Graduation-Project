import DrSidebar from "../components/DrSidebar";
import AppointmentsTable from "../components/AppointmentsTable";
import AppointmentsCalendar from "../components/AppointmentsCalendar";
import ViewAppointments from "../components/Doctor-ViewAppointments";
import { FloatButton } from "antd";
import { DoubleLeftOutlined } from '@ant-design/icons';
import { useState } from "react";
import React from "react";
function DrAppointments(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    return (<>
     <DrSidebar isOpen={isSidebarOpen}/>
      <FloatButton onClick={toggleSidebar} icon={<DoubleLeftOutlined />}  className="side-button" />    <div className="maincontent drappointments">
    <h1 className="page-header">Manage Appointments</h1>
    <div className="wide-article pending-appt">
        <h1 className="heading-article">Pending Appointments</h1>
        <AppointmentsTable/>
    </div>
    <div className="wide-article calendar">
        <h1 className="heading-article">Calendar View</h1>
        <div className="calendar-appt"style={{opacity:"0.9",zIndex:"0"}}>
        <AppointmentsCalendar/>
        </div>
        </div>
        <div className="wide-article allapts">
        <h1 className="heading-article">View All Appointments</h1>
        <ViewAppointments/>
        </div> 
    </div>

    </>)
}
export default DrAppointments;
import DrSidebar from "../components/DrSidebar";
import AppointmentsTable from "../components/AppointmentsTable";
import AppointmentsCalendar from "../components/AppointmentsCalendar";
import ViewAppointments from "../components/Doctor-ViewAppointments";

function DrAppointments(){
    return (<>
    <DrSidebar/>
    <div className="maincontent drappointments">
    <h1 className="page-header">Manage Appointments</h1>
    <div className="wide-article">
        <h1 className="heading-article">Pending Appointments</h1>
        <AppointmentsTable/>
    </div>
        <div className="wide-article calendar">
        <h1 className="heading-article">Calendar View</h1>
        <AppointmentsCalendar/>
        </div>
        <div className="wide-article allapts">
        <h1 className="heading-article">View All Appointments</h1>
        <ViewAppointments/>
        </div> 
    </div>

    </>)
}
export default DrAppointments;
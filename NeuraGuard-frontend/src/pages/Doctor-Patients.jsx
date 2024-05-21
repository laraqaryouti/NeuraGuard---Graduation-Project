import DrSidebar from "../components/DrSidebar";
import Patients from "../components/Patients";

function DrPatients(){
    return(<>
    <DrSidebar/>
    <div className="maincontent patients">
        <h1 className="page-header">Assigned Patients</h1>
        <div className="wide-article  patientsview">
            <h1 className="heading-article">View Patients</h1>
            <p>Click on a patient to see each patient's medical, personal, and clinical information.</p>
            <Patients/>
        </div>
    </div>
    </>)
}
export default DrPatients;
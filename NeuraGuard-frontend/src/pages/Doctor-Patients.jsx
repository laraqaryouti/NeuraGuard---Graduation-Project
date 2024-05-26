import DrSidebar from "../components/DrSidebar";
import Patients from "../components/Patients";
import { FloatButton } from "antd";
import { DoubleLeftOutlined } from '@ant-design/icons';
import { useState } from "react";
function DrPatients(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    return(<>
      <DrSidebar isOpen={isSidebarOpen}/>
      <FloatButton onClick={toggleSidebar} icon={<DoubleLeftOutlined />}  className="side-button" />
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
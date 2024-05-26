import DrSidebar from "../components/DrSidebar";
import AppointmentsTable from "../components/AppointmentsTable";
import UpcomingDrAppointments from "../components/Upcoming-Dr-Appointments";
import { DoughnutChart } from "../components/PDvsHC";
import { VisitsPerMonth } from "../components/VisitsPerMonth";
import { PatientsPerMonth } from "../components/PatientsPerMonth";
import { FloatButton } from "antd";
import { DoubleLeftOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import api from "../api";
function DrDashboard() {
  const [fName, setName] = useState("User");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await api.get("/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setName(response.data.User.fname); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <DrSidebar isOpen={isSidebarOpen}/>
      <FloatButton onClick={toggleSidebar} icon={<DoubleLeftOutlined />}  className="side-button" />
      <div className="maincontent drdash">
        <div className="dashboard-header">
          <h1 className="main-page-title">Welcome Back, Dr. {fName}!</h1>
          <p className="header-items">Let's take a look at today's schedule.</p>
          <p className="header-items-3">{formattedDate}</p>
        </div>
        <div>
            <h1 className="page-header">Pending Appointments</h1>
            <div className="wide-article appt-table">
            <AppointmentsTable/>
            </div>
        </div>
        <div>
          <h1 className="page-header">Upcoming Appointments</h1>
          <UpcomingDrAppointments />
        </div>
        <div>
            <h1 className="page-header">General Insights</h1>
            <div className="wide-article">
           <div style={{width:"48%", height:"400px",display:"flex",alignItems:"center",justifyContent:"center",float:"left"}} className="chart-1-dash">
            <DoughnutChart />
           </div>
           <div style={{width:"48%", height:"400px",display:"flex",alignItems:"center",justifyContent:"center",float:"left"}} className="chart-2-dash">
            <VisitsPerMonth />
           </div>
           <div style={{width:"100%", height:"500px", display:"flex",alignItems:"center",justifyContent:"center", paddingTop:"60px"}} className="chart-3-dash">
            <PatientsPerMonth/>
           </div>
           </div>
        </div>
      </div>
    </>
  );
}
export default DrDashboard;

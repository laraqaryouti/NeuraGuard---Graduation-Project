import Sidebar from "../components/Sidebar";
import Carousels from "../components/Carousels";
import UpcomingAppointments from "../components/UpcomingAppointments";
import "../styling/dashboard.css";
import TypeformEmbed from "../components/TypeformEmbed";
import { LineChart } from "../components/LineChart";
import { LineChartnonmotor } from "../components/LineChart-nonmotor";
import { Tag, FloatButton } from "antd";
import { DoubleLeftOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from "react";
import api from "../api";
 
function Dashboard_Patient() {
  const [fName, setName] = useState("User");
  const [userID, setUserID] = useState("");
  const [status, setStatus] = useState("Healthy Control");

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
        setStatus(
          response.data.User.status === "Yes"
            ? "Parkinson Patient"
            : "Health Cohort"
        );
        setName(response.data.User.fname); // Assuming 'username' is a field in the User model
        setUserID(response.data.User.user_id);
        checkUserInPatient(response.data.User);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const checkUserInPatient = async (user) => {
    if (user.username.length === 8) {
      const headers1 = {
        "Content-Type": "application/json",
      };
      try {
        const Patientresponse = await api.get("/Patient/", {
          headers: headers1,
        });
        const PatientEntry = Patientresponse.data.find(
          (entry) => entry.UserID === userID
        );
        if (!PatientEntry) {
          createPatient(user);
        }
      } catch (error) {
        if (error.response.status === 404) {
          // Assuming 404 means not found
          createPatient();
        } else {
          console.error("Error checking patient status:", error);
        }
      }
    }
  };

  const createPatient = async (user) => {
    try {
      const newPatient = {
        UserID: user.user_id,
        DiseaseProgression: "Initial",
      };
      await api.post("/Patient/", newPatient, {
        headers1: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error creating new patient:", error);
    }
  };

  const data = [
    {
      tag: "https://www.parkinson.org/understanding-parkinsons/getting-diagnosed/coping-with-diagnosis",
      title: "Coping Strategies for Parkinson's Patients",
      article:
        "Discover effective coping strategies for managing Parkinson's disease, benefiting both patients and caregivers.",
      image: "src/assets/hand-holding.jpg",
    },
    {
      tag: "https://davisphinneyfoundation.org/parkinsons-exercise-essentials-video/",
      title: "Exercise Essentials for Parkinson's Patients",
      article:
        "Explore the importance of regular exercise in improving mobility and overall well-being for individuals with Parkinson's disease.",
      image: "src/assets/exercise.jpg",
    },
    {
      tag: "https://www.parkinson.org/living-with-parkinsons/management/diet-nutrition",
      title: "Nutrition Tips for Parkinson's Wellness",
      article:
        "Understand the significance of a balanced diet and nutrition for managing symptoms and supporting overall health in Parkinson's patients.",
      image: "src/assets/nutrition.jpg",
    },
    {
      tag: "https://www.ncoa.org/article/medication-management-and-parkinsons-what-older-adults-need-to-know",
      title: "Medication Management in Parkinson's Care",
      article:
        "Learn about the different types of medications used to treat Parkinson's disease and how to effectively manage them for optimal results.",
      image: "src/assets/medication.jpg",
    },
    {
      tag: "https://www.parkinson.org/living-with-parkinsons/emotional-mental-health#:~:text=Be%20open%20and%20honest%20about,professionals%20can%20recommend%20medical%20treatments.",
      title: "Maintaining Mental Health",
      article:
        "Discover strategies and resources for promoting mental well-being and coping with emotional challenges associated with Parkinson's disease.",
      image: "src/assets/mentalhealth.jpg",
    },
    {
      tag: "https://healthunmuted.com/blog/navigating-parkinsons-together-the-case-for-joining-a-supportive-community",
      title: "Navigating Resources and Community",
      article:
        "Explore the importance of support networks, resources, and community involvement in managing Parkinson's disease effectively.",
      image: "src/assets/community.jpg",
    },
  ];
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
      <Sidebar isOpen={isSidebarOpen}/>
      <FloatButton onClick={toggleSidebar} icon={<DoubleLeftOutlined />} className="side-button" aria-label="toggle-sidebar"/>
      <div className="maincontent dashboard">
        <div className="dashboard-header">
          <h1 className="main-page-title">Welcome Back, {fName}!</h1>
          <p className="header-items">Let's take a look at today's schedule.</p>
          <p className="header-items-2">
            {" "}
            <Tag bordered={true} color="orange" style={{ fontSize: "15px" }}>
              {status}
            </Tag>
          </p>
          <p className="header-items-3">{formattedDate}</p>
        </div>
        <div className="carousels">
          <Carousels />
        </div>
        <div className="side-1">
          <div>
            <h1 className="page-header" style={{ marginLeft: "15px" }}>
              Upcoming Appointments
            </h1>
            <UpcomingAppointments />
          </div>
          <div>
            <h1
              className="page-header"
              style={{ marginLeft: "15px", marginTop: "8px" }}
            >
              Track your Daily Symptoms
            </h1>
            <div className="wide-article">
              <h1 className="heading-article">
                Information about our daily symptom tracker
              </h1>
              <p>
                Tracking Parkinson's symptoms entails methodically documenting
                and keeping an eye on different elements of the illness over
                time. A symptom tracker, like the one based on the Parkinson's
                symptom diary offered by{" "}
                <a href="https://www.parkinson.org/" target="_blank">
                  www.parkinson.org
                </a>
                , is usually used in this procedure. People are asked to record
                their everyday experiences with the tracker, which includes both
                non-motor symptoms like mood swings and altered sleep patterns
                and motor symptoms like tremors and stiffness. People can
                monitor changes in their symptoms, see trends, and give
                important information to medical professionals so they can make
                well-informed decisions about treatment regimens and
                interventions. All of this is possible by routinely entering
                this data into the tracker. In the end, the tracking method
                improves communication between patients and medical
                practitioners to maximize symptom management and general
                well-being and gives people with Parkinson's disease the ability
                to actively engage in their own treatment.
              </p>{" "}
              <br />
              <div style={{ textAlign: "center" }}>
                <p>Track your symptoms with our Daily Symptom Tracker!</p>
                <TypeformEmbed />
              </div>
            </div>
          </div>
          <div>
            <h1
              className="page-header"
              style={{ marginLeft: "15px", marginTop: "8px" }}
            >
              Disease Progression
            </h1>
            <div
              className="wide-article"
              style={{ overflow: "scroll", height: "500px" }}
            >
              <h1 className="heading-article">Motor Symptoms</h1>
              <p>
                The line chart below shows the progression of the four motor
                symptoms. It represents the average severity of each symptom
                over each month, with a scale ranging from 0 to 3. A rating of 0
                indicates that the symptom is nonexistent, while a rating of 3
                indicates that it is very bothersome.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "400px",
                }}
              >
                <LineChart />
              </div>
              <h1 className="heading-article">Nonmotor Symptoms</h1>
              <p>
                The line chart below shows the progression of the four nonmotor
                symptoms. It represents the average severity of each symptom
                over each month, with a scale ranging from 0 to 3. A rating of 0
                indicates that the symptom is nonexistent, while a rating of 3
                indicates that it is very bothersome.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "400px",
                }}
              >
                <LineChartnonmotor />
              </div>
            </div>
          </div>
          <div>
            <h1
              className="page-header"
              style={{ marginLeft: "15px", marginTop: "8px" }}
            >
              Health Advice
            </h1>
            <div style={{ marginLeft: "15px", marginRight: "15px" }}>
              <div className="row" loading="lazy">
                {data.map((item, index) => (
                  <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                    <a
                      href={item.tag}
                      target="_blank"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        className="card article-cards"
                        style={{
                          height: "430px",
                          textAlign: "left",
                          marginBottom: "13px",
                        }}
                      >
                        <img
                          src={item.image}
                          loading="lazy"
                          className="card-img-top"
                          alt="Card"
                        />
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ fontSize: "17px", fontWeight: "bold" }}
                          >
                            {item.title}
                          </h5>
                          <p className="card-text" style={{ color: "gray" }}>
                            {item.article}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard_Patient;

import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import api from "../api";
import "../styling/help.css";
import { message } from "antd";
import { FloatButton } from "antd";
import { DoubleLeftOutlined } from '@ant-design/icons';
const Help = () => {
  const [inputs, setInputs] = useState({
    SupportType: "Unprofessional Behavior",
    Status: "low",
    Description: "",
  });
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userResponse = await api.get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserID(userResponse.data.User.user_id);
    };
    fetchUser();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedInputs = {
      SupportType: inputs.SupportType,
      Status: inputs.Status,
      Description: inputs.Description,
      UserID: userID,
    };

    try {
      await api.post("/UserSupport/", formattedInputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      message.success("Ticket Submitted Successfully!")
      setInputs({
        SupportType: "Unprofessional Behavior",
        Status: "low",
        Description: "",
      });
    } catch (error) {
      console.error("Error submitting help ticket:", error);
      message.error("Error Submitting Ticket.");
    }
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <SideBar isOpen={isSidebarOpen}/>
      <FloatButton onClick={toggleSidebar} icon={<DoubleLeftOutlined />}  className="side-button" />
      <div className="maincontent help">
        <div className="wide-article helpform">
          <h1 className="heading-article">Help & Support</h1>
          <p>
            We value your experience with NeuraGuard, and your feedback is
            essential to us. If you encounter any issues, whether technical
            glitches or professional concerns, please don't hesitate to let us
            know. Your user experience matters, and we're committed to resolving
            any challenges as soon as possible. Thank you for helping us improve
            NeuraGuard. You can send us an email on{" "}
            <span className="links">NeuraGuard@example.com.</span>
          </p>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label" htmlFor="type">
                Type of Issue
              </label>
              <select
                className="form-select"
                style={{ height: "50px" }}
                required
                name="SupportType"
                id="type"
                value={inputs.SupportType}
                onChange={handleChange}
              >
                <option value="Unprofessional Behavior">
                  Unprofessional Behavior
                </option>
                <option value="Technical Assistance">
                  Technical Assistance
                </option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Inaccurate Medical Results">
                  Inaccurate Medical Results
                </option>
                <option value="Inaccurate Educational Resources">
                  Inaccurate Educational Resources
                </option>
                <option value="Report Bug">Report Bug</option>
                <option value="Feedback">Feedback or Suggestions</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="severity_level">
                Severity Level
              </label>
              <select
                className="form-select"
                style={{ height: "50px" }}
                required
                name="Status"
                id="severity_level"
                value={inputs.Status}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                className="form-control"
                placeholder="Please provide any additional information that might help us fix your issue."
                style={{ height: "100px" }}
                name="Description"
                id="description"
                value={inputs.Description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-lg"
                style={{
                  backgroundColor: "#FF8A15",
                  color: "white",
                  fontSize: "16px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  marginTop: "5px",
                }}
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Help;

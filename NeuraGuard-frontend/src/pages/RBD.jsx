import HealthNav from "../components/HealthNav";
import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import api from "../api";
import { FloatButton, message} from "antd";
import { DoubleLeftOutlined } from '@ant-design/icons';
function RBD() {
  const questions = [
    "Do you experience exceptionally vivid and lifelike dreams?",
    "Do your dreams often involve aggressive or action-packed scenarios?",
    "Have you been observed engaging in unusual or complex behaviors during the night?",
    "Do you frequently experience sudden and involuntary movements of your limbs during sleep?",
    "Have you ever been told that you exhibit aggressive or harmful behavior towards your bed partner while asleep?",
    "Do you have any recollection of speaking during sleep?",
    "Do you frequently experience sudden jerking or kicking movements while asleep?",
    "Have you noticed objects falling or being displaced during your sleep?",
    "Do you frequently wake up due to your own movements during sleep?",
    "Do you typically remember your dreams upon waking?",
    "Do you feel that your sleep is frequently disrupted or of poor quality?",
    "Have you experienced a stroke or transient ischemic attack (TIA) in the past?",
    "Have you sustained significant head trauma in the past?",
    "Have you been diagnosed with Parkinsonism by a healthcare professional?",
    "Do you frequently experience discomfort or an urge to move your legs while trying to sleep?",
    "Have you been diagnosed with narcolepsy by a healthcare professional?",
    "Do you currently experience symptoms of depression, such as persistent sadness or loss of interest?",
    "Have you been diagnosed with epilepsy or experienced seizures?",
    "Have you been diagnosed with an inflammatory disease affecting your brain?",
    "Are there any additional factors or conditions that you believe may be relevant to your sleep behaviors or experiences?",
  ];

  const [formData, setFormData] = useState({
    RBDResponse1: "",
    RBDResponse2: "",
    RBDResponse3: "",
    RBDResponse4: "",
    RBDResponse5: "",
    RBDResponse6: "",
    RBDResponse7: "",
    RBDResponse8: "",
    RBDResponse9: "",
    RBDResponse10: "",
    RBDResponse11: "",
    RBDResponse12: "",
    RBDResponse13: "",
    RBDResponse14: "",
    RBDResponse15: "",
    RBDResponse16: "",
    RBDResponse17: "",
    RBDResponse18: "",
    RBDResponse19: "",
    RBDResponse20: "",
  });
  const [userID, setUserID] = useState("User");
  const [existingRecord, setExistingRecord] = useState(null);

  const fetchRBDQuestionnaire = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/RBDQuestionnaire/");
    const userResponse = await api.get("/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setUserID(userResponse.data.User.user_id);

    // Check if there is an existing RBD record for the user
    const existing = response.data.find(
      (record) => record.UserID === userResponse.data.User.user_id
    );
    setExistingRecord(existing);
    if (existing) {
      setFormData({
        RBDResponse1: existing.RBDResponse1,
        RBDResponse2: existing.RBDResponse2,
        RBDResponse3: existing.RBDResponse3,
        RBDResponse4: existing.RBDResponse4,
        RBDResponse5: existing.RBDResponse5,
        RBDResponse6: existing.RBDResponse6,
        RBDResponse7: existing.RBDResponse7,
        RBDResponse8: existing.RBDResponse8,
        RBDResponse9: existing.RBDResponse9,
        RBDResponse10: existing.RBDResponse10,
        RBDResponse11: existing.RBDResponse11,
        RBDResponse12: existing.RBDResponse12,
        RBDResponse13: existing.RBDResponse13,
        RBDResponse14: existing.RBDResponse14,
        RBDResponse15: existing.RBDResponse15,
        RBDResponse16: existing.RBDResponse16,
        RBDResponse17: existing.RBDResponse17,
        RBDResponse18: existing.RBDResponse18,
        RBDResponse19: existing.RBDResponse19,
        RBDResponse20: existing.RBDResponse20,
      });
    }
  };

  useEffect(() => {
    fetchRBDQuestionnaire();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedData = {
      RBDResponse1: formData.RBDResponse1,
      RBDResponse2: formData.RBDResponse2,
      RBDResponse3: formData.RBDResponse3,
      RBDResponse4: formData.RBDResponse4,
      RBDResponse5: formData.RBDResponse5,
      RBDResponse6: formData.RBDResponse6,
      RBDResponse7: formData.RBDResponse7,
      RBDResponse8: formData.RBDResponse8,
      RBDResponse9: formData.RBDResponse9,
      RBDResponse10: formData.RBDResponse10,
      RBDResponse11: formData.RBDResponse11,
      RBDResponse12: formData.RBDResponse12,
      RBDResponse13: formData.RBDResponse13,
      RBDResponse14: formData.RBDResponse14,
      RBDResponse15: formData.RBDResponse15,
      RBDResponse16: formData.RBDResponse16,
      RBDResponse17: formData.RBDResponse17,
      RBDResponse18: formData.RBDResponse18,
      RBDResponse19: formData.RBDResponse19,
      RBDResponse20: formData.RBDResponse20,
      UserID: userID,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      if (existingRecord) {
        // If record exists, update it
        await api.patch(`/RBDUpdate/${userID}`, formattedData, {
          headers,
        });
      } else {
        // If no record exists, create a new one
        await api.post("/RBDQuestionnaire/", formattedData, { headers });
      }
      fetchRBDQuestionnaire();
    } catch (error) {
      console.error("Error submitting RBD data:", error);
    }

    setFormData({
      RBDResponse1: "",
      RBDResponse2: "",
      RBDResponse3: "",
      RBDResponse4: "",
      RBDResponse5: "",
      RBDResponse6: "",
      RBDResponse7: "",
      RBDResponse8: "",
      RBDResponse9: "",
      RBDResponse10: "",
      RBDResponse11: "",
      RBDResponse12: "",
      RBDResponse13: "",
      RBDResponse14: "",
      RBDResponse15: "",
      RBDResponse16: "",
      RBDResponse17: "",
      RBDResponse18: "",
      RBDResponse19: "",
      RBDResponse20: "",
    });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Sidebar isOpen={isSidebarOpen}/>
      <HealthNav />
      <FloatButton onClick={toggleSidebar} icon={<DoubleLeftOutlined />}  className="side-button" />
      <div className="maincontent rbdcontent">
        <div className="wide-article">
          <h1 className="heading-article">
            Rapid Eye Movement (REM) Sleep Behavior Disorder (RBD) Questionnaire{" "}
          </h1>
          <p>
            Rapid Eye Movement Sleep Behavior Disorder (RBD) is a common and
            early symptom in Parkinson's disease (PD), characterized by the loss
            of normal muscle paralysis during REM sleep, leading to vivid and
            often violent dream enactments. To assess the presence of RBD in PD
            patients, a questionnaire, typically consisting of 20 questions, has
            been developed. Each question prompts a yes or no response, aiming
            to capture specific behaviors associated with RBD, such as
            physically acting out dreams or experiencing sleep-related injuries.
            This questionnaire provides a structured approach to identifying and
            evaluating RBD symptoms, contributing to the comprehensive
            understanding of sleep disturbances in Parkinson's disease patients.
          </p>
          <h1 className="heading-article">Take Questionnaire Now</h1>
          <div>
            <form onSubmit={handleSubmit}>
              {questions.map((question, index) => (
                <div key={index + 6}>
                  <label className="questionnaire">{question}</label>
                  <select
                    className="form-select mb-3 questionnaire"
                    name={`RBDResponse${index + 1}`}
                    id={`response-${index + 1}`}
                    onChange={handleChange}
                    value={formData[`RBDResponse${index + 1}`]}
                  >
                    <option value="" disabled></option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              ))}
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
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RBD;

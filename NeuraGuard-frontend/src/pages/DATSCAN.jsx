import HealthNav from "../components/HealthNav";
import Sidebar from "../components/Sidebar";
import "../styling/datscan.css";

import React, { useState, useEffect } from "react";

import api from "../api";

const DATSCAN = () => {
  const [DATSCAN, setDATSCAN] = useState([]);
  const [inputs, setInputs] = useState({
    caudate_R: "",
    caudate_L: "",
    putamen_R: "",
    putamen_L: "",
    putamen_L_ant: "",
    putamen_R_ant: "",
    Datscan_Result: true,
  });
  const [userID, setUserID] = useState("User");
  const [existingRecord, setExistingRecord] = useState(null);

  const fetchDATSCAN = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/DATSCAN/");
    setDATSCAN(response.data);
    const userResponse = await api.get("/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setUserID(userResponse.data.User.user_id);

    // Check if there is an existing DATSCAN record for the user
    const existing = response.data.find(
      (record) => record.UserID === userResponse.data.User.user_id
    );
    setExistingRecord(existing);

    if (existing) {
      setInputs({
        caudate_R: existing.caudate_R.toString(),
        caudate_L: existing.caudate_L.toString(),
        putamen_R: existing.putamen_R.toString(),
        putamen_L: existing.putamen_L.toString(),
        putamen_L_ant: existing.putamen_L_ant.toString(),
        putamen_R_ant: existing.putamen_R_ant.toString(),
        Datscan_Result: existing.Datscan_Result,
      });
    }
  };

  useEffect(() => {
    fetchDATSCAN();
  }, []);

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;

    let newValue = value;

    if (name === "Datscan_Result") {
      newValue = value === "Positive";
    }
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedInputs = {
      caudate_R: parseFloat(inputs.caudate_R),
      caudate_L: parseFloat(inputs.caudate_L),
      putamen_R: parseFloat(inputs.putamen_R),
      putamen_L: parseFloat(inputs.putamen_L),
      putamen_L_ant: parseFloat(inputs.putamen_L_ant),
      putamen_R_ant: parseFloat(inputs.putamen_R_ant),
      Datscan_Result: inputs.Datscan_Result === false ? false : true,
      UserID: userID,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      if (existingRecord) {
        // If record exists, update it
        await api.patch(`/DATSCANUpdate/${userID}`, formattedInputs, {
          headers,
        });
      } else {
        // If no record exists, create a new one
        await api.post("/DATSCAN/", formattedInputs, { headers });
      }
      fetchDATSCAN();
    } catch (error) {
      console.error("Error submitting DATSCAN data:", error);
    }

    setInputs({
      caudate_R: "",
      caudate_L: "",
      putamen_R: "",
      putamen_L: "",
      putamen_L_ant: "",
      putamen_R_ant: "",
      Datscan_Result: false,
    });
  };

  return (
    <>
      <Sidebar />
      <HealthNav />
      <div className="maincontent datscancontent">
        <div className="wide-article">
          <h1 className="heading-article">
            DAT-SPECT (Dopamine Transporter Single-Photon Emission Computed
            Tomography) Imaging
          </h1>
          <p>
            DAT-SPECT imaging is a valuable diagnostic tool in the detection of
            Parkinson's disease (PD). This nuclear medicine technique allows for
            the visualization and assessment of dopamine transporter levels in
            the brain, specifically in the striatum, a region affected by
            PD-related neurodegeneration. By injecting a radiopharmaceutical
            that binds to dopamine transporters and emitting gamma rays,
            DAT-SPECT captures detailed images of dopamine activity. In PD, a
            reduction in dopamine transporter density is observed, aiding in the
            identification of characteristic neurochemical changes associated
            with the disease. DAT-SPECT imaging plays a crucial role in
            differentiating Parkinson's disease from other movement disorders
            and provides clinicians with objective evidence to support early and
            accurate diagnosis, facilitating timely intervention and
            personalized treatment plans for individuals affected by PD.
          </p>
        </div>
        <div className="wide-article" style={{ marginTop: "2%" }}>
          <h1 className="heading-article">
            Navigating DAT-SPECT Imaging: A Step-by-Step Guide to Accessing
            Parkinson's Diagnostic Imaging
          </h1>
          <p>
            To initiate DAT-SPECT imaging, begin by scheduling an appointment
            with a neurologist or movement disorder specialist to discuss your
            symptoms and medical history. Following a thorough clinical
            assessment, if deemed necessary, the healthcare provider will issue
            a referral for DAT-SPECT imaging. Contact local imaging facilities
            offering this service, considering factors such as insurance
            acceptance and pre-authorization requirements. Once a suitable
            facility is identified, schedule an appointment and adhere to any
            pre-imaging instructions provided. On the designated day, undergo
            the imaging procedure, involving the injection of a
            radiopharmaceutical and subsequent capture of gamma rays to create
            detailed images of dopamine transporter activity in the brain. After
            completion, the results will be analyzed by a radiologist and shared
            with your healthcare provider. Subsequently, your neurologist will
            discuss the findings, providing valuable insights into your
            condition and guiding any necessary treatment or follow-up steps.
            It's essential to follow the specific instructions of both your
            healthcare provider and the imaging facility throughout this
            process.
          </p>
          <a
            href="/appointments"
            className="btn btn-lg"
            style={{
              backgroundColor: "#FF8A15",
              color: "white",
              fontSize: "16px",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Book a consultation
          </a>
        </div>
        <div className="wide-article" style={{ marginTop: "2%" }}>
          <form onSubmit={handleSubmit}>
            <h1 className="heading-article">DAT-SPECT Imaging Results</h1>
            <p>
              If you have the results of your DaTscan, please fill them here. If
              not, your doctor can provide and fill in the information for you.
              If unsure, please contact a healthcare professional.
            </p>
            <label htmlFor="caudate_L" className="form-label">
              Caudate Left
            </label>
            <input
              type="text"
              id="caudate_L"
              name="caudate_L"
              className="form-control form-control-lg questionnaire"
              aria-describedby="passwordHelpBlock"
              placeholder="Enter Caudate Left Value"
              onChange={handleChange}
              value={inputs.caudate_L}
            />
            <div id="passwordHelpBlock" className="form-text info-input">
              The Caudate Left value represents the uptake of the radiotracer in
              the left caudate nucleus.
            </div>
            <label htmlFor="caudate_R" className="form-label">
              Caudate Right
            </label>
            <input
              type="text"
              id="caudate_R"
              name="caudate_R"
              className="form-control form-control-lg questionnaire"
              aria-describedby="passwordHelpBlock"
              placeholder="Enter Caudate Right Value"
              onChange={handleChange}
              value={inputs.caudate_R}
            />
            <div id="passwordHelpBlock" className="form-text info-input">
              The Caudate Right value represents the uptake of the radiotracer
              in the right caudate nucleus.
            </div>
            <label htmlFor="putamen_R" className="form-label">
              Putamen Right
            </label>
            <input
              type="text"
              id="putamen_R"
              name="putamen_R"
              className="form-control form-control-lg questionnaire"
              aria-describedby="passwordHelpBlock"
              placeholder="Enter Putamen Right Value"
              onChange={handleChange}
              value={inputs.putamen_R}
            />
            <div id="passwordHelpBlock" className="form-text info-input">
              The Putamen Right value represents the uptake of the radiotracer
              in the right putamen.
            </div>
            <label htmlFor="putamen_L" className="form-label">
              Putamen Left
            </label>
            <input
              type="text"
              id="putamen_L"
              name="putamen_L"
              className="form-control form-control-lg questionnaire"
              aria-describedby="passwordHelpBlock"
              placeholder="Enter Putamen Left Value"
              onChange={handleChange}
              value={inputs.putamen_L}
            />
            <div id="passwordHelpBlock" className="form-text info-input">
              The Putamen Left value represents the uptake of the radiotracer in
              the left putamen.
            </div>
            <label className="form-label">Putamen Right Anterior</label>
            <input
              type="text"
              step="0.01"
              id="putamen_R_ant"
              name="putamen_R_ant"
              className="form-control form-control-lg 
            questionnaire"
              placeholder="Enter Putamen Right Anterior Value"
              min="0"
              onChange={handleChange}
              value={inputs.putamen_R_ant}
            />
            <div
              id="passwordHelpBlock"
              className="form-text info-input datscan-input"
            >
              Represents the measurement of dopamine transporter density in the
              anterior part of the right putamen.
            </div>
            <label className="form-label">Putamen Left Anterior</label>
            <input
              type="text"
              step="0.01"
              id="putamen_L_ant"
              name="putamen_L_ant"
              className="form-control form-control-lg 
            questionnaire"
              placeholder="Enter Putamen Left Anterior Value"
              min="0"
              onChange={handleChange}
              value={inputs.putamen_L_ant}
            />
            <div
              id="passwordHelpBlock"
              className="form-text info-input datscan-input"
            >
              Represents the measurement of dopamine transporter density in the
              anterior part of the left putamen.
            </div>
            <label className="form-label">DATSCAN Result</label>
            <select
              name="Datscan_Result"
              className="form-select form-select-lg mb-3 questionnaire"
              aria-label="Large select example"
              onChange={handleChange}
              value={inputs.Datscan_Result ? "Positive" : "Negative"}
            >
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>
            <div id="passwordHelpBlock" className="form-text info-input">
              A positive result indicates a reduction in dopamine transporter
              activity in certain areas of the brain,
              <br /> while a negative result suggests normal or near-normal
              dopamine transporter activity.
            </div>
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
              }}
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DATSCAN;

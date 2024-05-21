import React, { useState, useEffect } from "react";
import { Avatar, List, Modal, Button, Input, Select, message } from "antd";
import "../styling/appointments.css";
import api from "../api";

const { Option } = Select;

const Patients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [medications, setMedications] = useState([]);
  const [clinicalRecords, setClinicalRecords] = useState([]);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [userID, setUserID] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for DATSCAN form
  const [caudateLeft, setCaudateLeft] = useState("");
  const [caudateRight, setCaudateRight] = useState("");
  const [putamenRight, setPutamenRight] = useState("");
  const [putamenLeft, setPutamenLeft] = useState("");
  const [datscanResult, setDatscanResult] = useState("");
  const [existingDatscan, setExistingDatscan] = useState(null);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userResponse = await api.get("/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const currentUserId = userResponse.data.User.user_id;
        setUserID(currentUserId);

        const appointmentResponse = await api.get("/Appointment/", {
          headers: { "Content-Type": "application/json" },
        });
        const filteredAppointments = appointmentResponse.data.filter(
          (entry) => entry.DoctorID === currentUserId
        );
        setAppointments(filteredAppointments);

        const patientResponse = await api.get("/patients", {
          headers: { "Content-Type": "application/json" },
        });

        const filteredPatients = patientResponse.data.filter((patient) =>
          filteredAppointments.some(
            (appointment) => appointment.PatientID === patient.user_id
          )
        );
        setPatients(filteredPatients);

        const medicationResponse = await api.get("/PatientMedications", {
          headers: { "Content-Type": "application/json" },
        });
        setMedications(medicationResponse.data);

        const clinicalResponse = await api.get("/ClinicalRecord", {
          headers: { "Content-Type": "application/json" },
        });
        setClinicalRecords(clinicalResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleShowModal = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleShowModal2 = async () => {
    try {
      const datscanResponse = await api.get("/DATSCAN/", {
        headers: { "Content-Type": "application/json" },
      });
      const existingDat = datscanResponse.data.find(
        (entry) => entry.UserID === selectedPatient.user_id
      );
      if (existingDat) {
        setCaudateLeft(existingDat.caudate_L);
        setCaudateRight(existingDat.caudate_R);
        setPutamenLeft(existingDat.putamen_L);
        setPutamenRight(existingDat.putamen_R);
        setDatscanResult(existingDat.Datscan_Result ? "1" : "2");
        setExistingDatscan(existingDat);
      }
    } catch (error) {
      message.error("Error fetching existing data:", error);
    }

    setIsModalOpen2(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
  };

  const getPatientClinicalRecord = (userId) => {
    return clinicalRecords.find((record) => record.UserID === userId) || {};
  };

  const handleHealthDataSubmit = async () => {
    try {
      const datscanPayload = {
        caudate_R: parseFloat(caudateRight),
        caudate_L: parseFloat(caudateLeft),
        putamen_R: parseFloat(putamenRight),
        putamen_L: parseFloat(putamenLeft),
        Datscan_Result: datscanResult === "1",
        UserID: selectedPatient.user_id,
      };

      if (existingDatscan) {
        await api.patch(
          `/DATSCANUpdate/${selectedPatient.user_id}`,
          datscanPayload
        );
      } else {
        await api.post("/DATSCAN/", datscanPayload);
      }

      message.success("DATSCAN Updated Successfully!");
    } catch (error) {
      console.error("Error Uploading Data:", error.response?.data || error);
      message.error("Error Uploading Data");
    }

    setIsModalOpen2(false);
  };

  return (
    <>
      <div className="search-bar">
        <img
          src="src/assets/icons/search.png"
          alt="Search"
          height="15"
          width="15"
          style={{ marginRight: "5px" }}
        />
        <input
          type="text"
          className="search-box"
          placeholder="Search Patient"
          style={{ width: "80%" }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={filteredPatients}
        renderItem={(user, index) => (
          <List.Item key={index} onClick={() => handleShowModal(user)}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={user.img}
                  style={{ height: "50px", width: "50px" }}
                />
              }
              title={
                <p className="lists-title">
                  {user.first_name} {user.last_name}
                </p>
              }
              description={
                <div>
                  <p className="lists-subtitle">
                    {user.status === "Yes"
                      ? "Parkinson Patient"
                      : "Healthy Cohort"}
                  </p>
                  <p className="lists-sub">@{user.username}</p>
                  <p className="lists-sub">{user.phone_number}</p>
                  <p className="lists-sub">{user.address}</p>
                </div>
              }
              style={{ cursor: "pointer" }}
            />
          </List.Item>
        )}
      />
      {selectedPatient && (
        <Modal
          visible={isModalOpen}
          onCancel={handleCancel}
          onOk={handleOk}
          cancelButtonProps={{ style: { display: "none" } }}
          closeIcon={null}
          okButtonProps={{
            style: { backgroundColor: "#FF8A15", borderColor: "#FF8A15" },
          }}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <Button onClick={handleShowModal2}>Upload Health Data</Button>
              <CancelBtn />
              <OkBtn />
            </>
          )}
        >
          <div style={{height:"600px"}}>
          <div>
            <Avatar
              src={selectedPatient.img}
              style={{ height: "150px", width: "150px" }}
            />
            <div
              style={{
                position: "absolute",
                right: "0",
                marginTop: "-110px",
                marginRight: "150px",
                fontSize: "15px",
              }}
            >
              <li style={{ fontWeight: "bold" }}>
                {selectedPatient.first_name} {selectedPatient.last_name}
              </li>
              <li>
                Status:{" "}
                {selectedPatient.status === "Yes"
                  ? "Parkinson Patient"
                  : "Healthy Cohort"}
              </li>
              <li>Date of Birth: {selectedPatient.date_of_birth}</li>
              <li>Gender: {selectedPatient.gender}</li>
            </div>
          </div>
          <br />
          <div style={{ overflowY: "scroll", height: "400px" }}>
            <li style={{ fontWeight: "bold" }}>Contact Information</li>
            <tr>
              <td>
                <img src="src/assets/icons/mail.png" height="15" width="15" />
              </td>
              <td style={{ paddingLeft: "10px" }}> {selectedPatient.email}</td>
            </tr>
            <td>
              <img
                src="src/assets/icons/phone-call.png"
                height="15"
                width="15"
              />
            </td>
            <td style={{ paddingLeft: "10px" }}>
              {selectedPatient.phone_number}
            </td>
            <br />
            <li style={{ fontWeight: "bold" }}>Clinical Information</li>
            {(() => {
              const record = getPatientClinicalRecord(selectedPatient.user_id);
              return (
                <>
            <tr>
              <td style={{color:"gray",paddingRight:"10px"}}>Symptom History</td>
              <td>{record.SymptomHistory}</td>
            </tr>
            <tr>
              <td style={{color:"gray", paddingRight:"10px"}}>Family Members with PD</td>
              <td>{record.FamilyMembersWithPD}</td>
            </tr>
            <tr>
              <td style={{color:"gray", paddingRight:"20px"}}>Treatment Plan</td>
              <td>{record.TreatmentPlan}</td>
            </tr>
            <tr>
              <td style={{color:"gray",paddingRight:"20px"}}>Allergies</td>
              <td>{record.Allergies}</td>
            </tr>
            <tr>
              <td style={{color:"gray",paddingRight:"20px"}}>Able to do tasks without assistance</td>
              <td>{record.AbilityToDoTasksWithoutAssistance}</td>
            </tr>
            <tr>
              <td style={{color:"gray"}}>Other Medical Conditions</td>
              <td>{record.OtherMedicalConditions}</td>
            </tr>
            <tr>
              <td style={{color:"gray"}}>Insurance Company</td>
              <td>{record.InsuranceCompany}</td>
            </tr>
          <br/>
                </>
              );
            })()}
            <br />
            <li style={{ fontWeight: "bold" }}>Current Medications</li>
            <thead>
              <tr>
                <td style={{ color: "gray" }}>Medication</td>
                <td style={{ textAlign: "center", color: "gray" }}>Duration</td>
                <td
                  style={{
                    textAlign: "center",
                    paddingLeft: "12px",
                    color: "gray",
                  }}
                >
                  Start Date
                </td>
              </tr>
            </thead>
            {medications
              .filter((med) => med.UserID === selectedPatient.user_id)
              .map((medication, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{medication.CurrentMedications}</td>
                    <td style={{ textAlign: "center" }}>
                      {medication.Duration}
                    </td>
                    <td style={{ textAlign: "center", paddingLeft: "12px" }}>
                      {medication.StartDate}
                    </td>
                    <br />
                  </tr>
                </tbody>
              ))}
              </div>
          </div>
        </Modal>
      )}
      {isModalOpen2 && (
        <Modal
          visible={isModalOpen2}
          onCancel={handleCancel}
          onOk={handleHealthDataSubmit}
          cancelButtonProps={{ style: { display: "none" } }}
          closeIcon={null}
          okButtonProps={{
            style: { backgroundColor: "#FF8A15", borderColor: "#FF8A15" },
          }}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <Button onClick={handleCancel}>Cancel</Button>
              <OkBtn />
            </>
          )}
        >
          <h1 className="heading-article">
            Upload {selectedPatient.first_name} {selectedPatient.last_name}'s
            Data
          </h1>
          <div style={{ overflowY: "scroll", height: "400px", marginTop:"20px" }}>
            <span style={{ fontWeight: "bold" }}>
              DATSCAN Image Analysis Result
            </span>
            <br />
            <div style={{width:"50%"}}>
            <label className="form-label">Caudate Left</label>
            <Input
              type="text"
              step="0.01"
              className="form-control"
              placeholder="Enter Caudate Left Value"
              value={caudateLeft}
              onChange={(e) => setCaudateLeft(e.target.value)}
            />
            <label className="form-label">Caudate Right</label>
            <Input
              type="text"
              step="0.01"
              className="form-control"
              placeholder="Enter Caudate Right Value"
              value={caudateRight}
              onChange={(e) => setCaudateRight(e.target.value)}
            />
            <label className="form-label">Putamen Right</label>
            <Input
              type="text"
              step="0.01"
              className="form-control"
              placeholder="Enter Putamen Right Value"
              value={putamenRight}
              onChange={(e) => setPutamenRight(e.target.value)}
            />
            <label className="form-label">Putamen Left</label>
            <Input
              type="text"
              step="0.01"
              className="form-control"
              placeholder="Enter Putamen Left Value"
              value={putamenLeft}
              onChange={(e) => setPutamenLeft(e.target.value)}
            />
            <label className="form-label">DATSCAN Result</label>
            <select
              className="form-select mb-3"
              value={datscanResult}
              onChange={(value) => setDatscanResult(value)}
            >
              <option value="1">Positive</option>
              <option value="2">Negative</option>
            </select>
            </div>
            </div>
        </Modal>
      )}
    </>
  );
};

export default Patients;

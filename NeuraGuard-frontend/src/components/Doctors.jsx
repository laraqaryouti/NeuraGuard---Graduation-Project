import { Avatar, List } from "antd";
import {  Modal } from "antd";
import "../styling/appointments.css";
import React, { useEffect, useState } from "react";
import api from "../api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [qualificationsData, setQualificationsData] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsResponse = await api.get("/doctors");
        setDoctors(doctorsResponse.data);

        const qualificationsResponse = await api.get("/DoctorQualifications/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setQualificationsData(qualificationsResponse.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.FirstName} ${doctor.LastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const showModal = (doctor) => {
    const qualificationEntry = qualificationsData.find(
      (entry) => entry.UserID === doctor.UserID
    );
    setSelectedDoctor({
      ...doctor,
      about: qualificationEntry
        ? qualificationEntry.About
        : "No information available",
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAvatarSrc = (firstName) => {
    if (firstName === "Zaid") {
      return "src/assets/zaidDoctor.webp";
    } else if (firstName === "Saed") {
      return "src/assets/depositphotos_2092485-stock-photo-portrait-of-male-doctor.jpg";
    } else if (firstName === "Sarah") {
      return "src/assets/doctor-portrait.jpg";
    } else {
      return "src/assets/doctor-portrait.jpg";
    }
  };

  return (
    <>
      <div className="search-bar">
        <img
          src="src\assets\icons\search.png"
          alt="Search"
          height="15"
          width="15"
          style={{ marginRight: "5px" }}
        />
        <input
          type="text"
          className="search-box"
          placeholder="Search Doctor"
          style={{ width: "80%" }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <List
        itemLayout="horizontal"
        dataSource={filteredDoctors}
        renderItem={(doctor) => (
          <List.Item key={doctor.UserID} onClick={() => showModal(doctor)}>
            <List.Item.Meta
              avatar={<Avatar src={getAvatarSrc(doctor.FirstName)} />}
              title={
                <p className="lists-title">{`Dr. ${doctor.FirstName} ${doctor.LastName}`}</p>
              }
              description={
                <div>
                  <p className="lists-subtitle">{doctor.Speciality}</p>
                  <p className="lists-sub">{doctor.PhoneNumber}</p>
                  <p className="lists-sub">{doctor.OfficeLocation}</p>
                  <p className="lists-sub">{doctor.Insurance}</p>
                </div>
              }
              style={{ cursor: "pointer" }}
            />
          </List.Item>
        )}
      />
      {selectedDoctor && (
        <Modal
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { display: "none" } }}
          closeIcon={null}
          okButtonProps={{
            style: { backgroundColor: "#FF8A15", borderColor: "#FF8A15" },
          }}
        >
          <div>
            <Avatar
              src={getAvatarSrc(selectedDoctor.FirstName)}
              style={{ height: "150px", width: "150px" }}
            />
            <div
              style={{
                position: "absolute",
                right: "0",
                marginTop: "-130px",
                marginRight: "150px",
                fontSize: "15px",
              }}
            >
              <li
                style={{ fontWeight: "bold" }}
              >{`Dr. ${selectedDoctor.FirstName} ${selectedDoctor.LastName}`}</li>
              <li>{selectedDoctor.Speciality}</li>
              <li>{selectedDoctor.PhoneNumber}</li>
              <li>{selectedDoctor.Insurance}</li>
              <li>{selectedDoctor.OfficeLocation}</li>
            </div>
          </div>
          <br />
          <li style={{ fontWeight: "bold" }}>About</li>
          <p>{selectedDoctor.about}</p>
          <li style={{ fontWeight: "bold" }}>Location</li>
          <p>
            {`Dr. ${selectedDoctor.FirstName} ${selectedDoctor.LastName}`} is
            located at hospital.
          </p>
          <li style={{ fontWeight: "bold" }}>Speciality</li>
          <p>{selectedDoctor.Speciality} </p>
          <li style={{ fontWeight: "bold" }}>Other Contact Information</li>
          <p>Email: {selectedDoctor.Email} </p>
        </Modal>
      )}
    </>
  );
};

export default Doctors;

import React, { useState, useEffect } from "react";
import { Divider, Tag, Card, Row, Col } from "antd";
import api from "../api"; // Ensure this is the correct path to your api instance
import "../styling/dashboard.css";

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "gold";
    case "Confirmed":
      return "blue";
    case "Completed":
      return "green";
    case "Cancelled":
      return "red";
    default:
      return "default";
  }
};

const UpcomingDoctorAppointments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorID, setDoctorID] = useState("");

  useEffect(() => {
    const fetchDoctorID = async () => {
      const token = localStorage.getItem("token");
      try {
        const userResponse = await api.get("/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctorID(userResponse.data.User.user_id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchDoctorID();
  }, []);

  useEffect(() => {
    if (doctorID) {
      fetchAppointments();
    }
  }, [doctorID]);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments/detailed", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const filteredData = response.data.filter(
        (appointment) =>
          appointment.doctor_id === doctorID &&
          appointment.appointment_status !== "Cancelled" &&
          appointment.appointment_status !== "Completed" &&
          appointment.appointment_status !== "Pending"
      );

      setData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  };

  return (
    <div className="horizontal-scroll" style={{ overflowX: "auto" }}>
      <Row
        gutter={16}
        style={{ marginLeft: "15px", marginRight: "15px", flexWrap: "nowrap" }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.map((item, index) => (
            <Col span={8} key={index} style={{ flex: "0 0 auto" }}>
              <Card style={{ marginBottom: "15px", width: "300px" }}>
                <p
                  className="lists-title"
                  style={{ fontSize: "17px", fontWeight: "bold" }}
                >
                  {item.type_of_appointment} <br />
                  <span
                    style={{
                      fontSize: "15px",
                      color: "gray",
                      fontWeight: "400",
                    }}
                  >
                    with {item.patient_name}
                  </span>
                </p>
                <p className="lists-sub" style={{ color: "gray" }}>
                  <img
                    src="src/assets/icons/appointment-calendar.png"
                    height={15}
                    width={15}
                    alt="Calendar"
                    style={{ marginRight: "4px" }}
                  />{" "}
                  {new Date(item.appointment_date).toLocaleString()}
                </p>
                <p
                  className="lists-sub"
                  style={{ marginBottom: "-10px", color: "gray" }}
                >
                  <img
                    src="src/assets/icons/wallet.png"
                    height={15}
                    width={15}
                    alt="Wallet"
                    style={{ marginRight: "4px" }}
                  />
                  {item.payment_method}
                </p>
                <br />
                <Tag
                  key={index}
                  color={getStatusColor(item.appointment_status)}
                  style={{ fontSize: "14px" }}
                >
                  {item.appointment_status}
                </Tag>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default UpcomingDoctorAppointments;

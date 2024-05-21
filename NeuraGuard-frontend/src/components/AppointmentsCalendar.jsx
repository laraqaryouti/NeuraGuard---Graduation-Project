import React, { useState, useEffect } from "react";
import { Badge, Calendar } from "antd";
import api from "../api";
const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [userID, setuserID] = useState("");

  useEffect(() => {
    fetchData();
  }, [userID]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const userResponse = await api.get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setuserID(userResponse.data.User.user_id);

      const response = await api.get("/appointments/detailed", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const filteredData = response.data.filter(
        (entry) => entry.doctor_id === userID
      );

      setAppointments(filteredData.length > 0 ? filteredData : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  };

  const getListData = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    const listData = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointment_date);
      return (
        appointmentDate.getFullYear() === value.year() &&
        appointmentDate.getMonth() === value.month() &&
        appointmentDate.getDate() === value.date() &&
        ["Cancelled", "Confirmed", "Completed"].includes(
          appointment.appointment_status
        )
      );
    });
    return listData || [];
  };

  const getBadgeStatus = (status) => {
    switch (status) {
      case "Cancelled":
        return "error";
      case "Confirmed":
        return "processing";
      case "Completed":
        return "success";
      default:
        return "default";
    }
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge
              status={getBadgeStatus(item.appointment_status)}
              text={`${formatTime(item.appointment_date)} ${
                item.type_of_appointment
              } Appointment`}
            />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default App;

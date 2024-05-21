import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import api from "../api";
const App = () => {
  const [pendingAppointments, setPendingAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const fetchUserID = async () => {
      const token = localStorage.getItem("token");
      try {
        const userResponse = await api.get("/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUserID(userResponse.data.User.user_id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    if (userID) {
      fetchAppointments();
    }
  }, [userID]);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments/detailed", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const filteredData = response.data.filter(
        (entry) => entry.doctor_id === userID
      );
      const filteredData2 = filteredData.filter(
        (entry) => entry.appointment_status === "Pending"
      );
      setPendingAppointments(filteredData2.length > 0 ? filteredData2 : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleAccept = async (record) => {
    try {
      await api.patch(`/Appointment/${record.appointment_id}`, {
        AppointmentStatus: "Confirmed",
      });

      setPendingAppointments(
        pendingAppointments.filter(
          (appointment) => appointment.appointment_id !== record.appointment_id
        )
      );
    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };

  const handleDecline = async (record) => {
    try {
      await api.patch(`/Appointment/${record.appointment_id}`, {
        AppointmentStatus: "Cancelled",
      });

      setPendingAppointments(
        pendingAppointments.filter(
          (appointment) => appointment.appointment_id !== record.appointment_id
        )
      );
    } catch (error) {
      console.error("Error declining appointment:", error);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "patient_name",
      key: "patient_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "patient_age",
      key: "patient_age",
    },
    {
      title: "Phone Number",
      dataIndex: "patient_number",
      key: "patient_number",
    },
    {
      title: "Appointment Date & Time",
      dataIndex: "appointment_date",
      key: "appointment_date",
      render: (datetime) => {
        const formattedDate = new Date(datetime).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const formattedTime = new Date(datetime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        return (
          <span>
            {formattedDate}, {formattedTime}
          </span>
        );
      },
    },
    {
      title: "Appointment Type",
      dataIndex: "type_of_appointment",
      key: "type_of_appointment",
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a style={{ color: "green" }} onClick={() => handleAccept(record)}>
            Accept
          </a>
          <a style={{ color: "red" }} onClick={() => handleDecline(record)}>
            Decline
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={pendingAppointments}
      loading={loading}
      pagination={{ pageSize: 3 }}
    />
  );
};

export default App;

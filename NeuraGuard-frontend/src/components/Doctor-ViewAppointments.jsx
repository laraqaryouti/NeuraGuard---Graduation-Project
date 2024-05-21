import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Modal } from "antd";
import api from "../api";
const App = () => {
  const [appointments, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

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
        (entry) =>
          entry.appointment_status === "Confirmed" ||
          entry.appointment_status === "Completed"
      );

      // Ensure filteredData is always an array
      setData(filteredData2.length > 0 ? filteredData2 : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const { confirm } = Modal;

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
      title: "Appointment Type",
      dataIndex: "type_of_appointment",
      key: "type_of_appointment",
    },
    {
      title: "Date & Time",
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
      title: "Appointment Status",
      key: "appointment_status",
      dataIndex: "appointment_status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleReschedule(record)} style={{ color: "blue" }}>
            Reschedule
          </a>
          <a onClick={() => handleCancel(record)} style={{ color: "red" }}>
            Cancel
          </a>
          <a onClick={() => handleConfirm(record)} style={{ color: "green" }}>
            Completed
          </a>
        </Space>
      ),
    },
  ];

  const handleConfirm = async (record) => {
    try {
      await api.patch(`/Appointment/${record.appointment_id}`, {
        AppointmentStatus: "Completed",
      });

      setPendingAppointments(
        pendingAppointments.filter(
          (appointment) => appointment.appointment_id !== record.appointment_id
        )
      );
      message.success("Appointment Completed!");
    } catch (error) {
      console.error("Error declining appointment:", error);
    }
  };

  const [formData, setFormData] = useState({
    AppointmentDate: "",
  });

  const fetchAppointmentsInModal = async () => {
    const appointmentResponse = await api.get("/Appointment/", {
      headers: { "Content-Type": "application/json" },
    });
    setFormData(appointmentResponse.data);
  };

  useEffect(() => {
    fetchAppointmentsInModal();
  }, [userID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formattedData = {
      AppointmentDate: formData.AppointmentDate,
    };

    try {
      await api.patch(
        `/AppointmentDoctorReschedule/${selectedRecord.appointment_id}`,
        formattedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      fetchAppointments();
      setFormData({
        AppointmentDate: "",
      });
      setIsModalVisible(false);
      setSelectedRecord(null);
    } catch (error) {
      console.error(
        "Error posting data:",
        error.response ? error.response.data : error
      );
    }
  };

  const handleReschedule = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = (record) => {
    Modal.confirm({
      title: "Cancel Appointment",
      content: "Are you sure you want to cancel this appointment?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await api.patch(`/Appointment/${record.appointment_id}`, {
            AppointmentStatus: "Cancelled",
          });

          setPendingAppointments(
            pendingAppointments.filter(
              (appointment) =>
                appointment.appointment_id !== record.appointment_id
            )
          );
          console.log("Cancel confirmed:", record);
        } catch (error) {
          console.error("Error canceling appointment:", error);
        }
      },
      onCancel() {
        console.log("Cancel clicked");
      },
    });
  };

  // const [appointments, setAppointments] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const appointmentsResponse = await fetch(
  //       "http://localhost:3000/appointments"
  //     );
  //     const appointmentsData = await appointmentsResponse.json();

  //     const usersResponse = await fetch("http://localhost:3000/users");
  //     const usersData = await usersResponse.json();
  //     const filteredAppointments = appointmentsData.filter((appointment) => {
  //       return usersData.some((user) => user.id === appointment.id);
  //     });

  //     const mergedData = filteredAppointments.map((appointment) => {
  //       const user = usersData.find((user) => user.id === appointment.id);
  //       return {
  //         ...appointment,
  //         name: user ? `${user.firstname} ${user.lastname}` : "",
  //         age: calculateAge(user ? user.dob : ""),
  //         phonenumber: user ? user.phonenumber : "",
  //       };
  //     });

  //     const filteredData = mergedData.filter(
  //       (appointment) => appointment.status !== "Pending"
  //     );

  //     setAppointments(filteredData);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoading(false);
  //   }
  // };

  // const calculateAge = (dob) => {
  //   const today = new Date();
  //   const birthDate = new Date(dob);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const monthDiff = today.getMonth() - birthDate.getMonth();
  //   if (
  //     monthDiff < 0 ||
  //     (monthDiff === 0 && today.getDate() < birthDate.getDate())
  //   ) {
  //     age--;
  //   }
  //   return age;
  // };

  return (
    <>
      <Table
        columns={columns}
        dataSource={appointments}
        loading={loading}
        pagination={{ pageSize: 3 }}
      />
      <Modal
        title="Reschedule Appointment"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okButtonProps={{
          style: { backgroundColor: "#FF8A15", borderColor: "#FF8A15" },
        }}
      >
        <p>Please enter a new date or time for the appointment.</p>
        <form>
          <label>New Date or Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="AppointmentDate"
            value={formData.AppointmentDate}
            onChange={handleChange}
            min={new Date().toISOString().split(".")[0]}
            id="datetime"
          />
        </form>
      </Modal>
    </>
  );
};

export default App;

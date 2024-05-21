import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Modal, message } from "antd";
import api from "../api";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState("");
  const [formData, setFormData] = useState({
    TypeOfAppointment: "",
    AppointmentDate: "",
    Description: "",
    PaymentMethod: "",
    AppointmentStatus: "Pending",
    DoctorID: "",
  });
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
        (entry) => entry.patient_id === userID
      );
      const filteredData2 = filteredData.filter(
        (entry) => entry.appointment_status !== "Cancelled"
      );

      setData(filteredData2.length > 0 ? filteredData2 : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

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
      title: "Appointment Type",
      dataIndex: "type_of_appointment",
      key: "type_of_appointment",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Assigned Doctor",
      dataIndex: "doctor_name",
      key: "doctor_name",
      render: (doctorName) => `Dr. ${doctorName}`,
    },
    {
      title: "Date & Time",
      dataIndex: "appointment_date",
      key: "appointment_date",
      render: (datetime) => {
        const date = new Date(datetime);
        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return `${formattedDate} at ${formattedTime}`;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Appointment Status",
      dataIndex: "appointment_status",
      key: "appointment_status",
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
        </Space>
      ),
    },
  ];

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
      TypeOfAppointment: formData.TypeOfAppointment,
      AppointmentDate: formData.AppointmentDate,
      Description: formData.Description,
      PaymentMethod: formData.PaymentMethod,
      DoctorID: formData.DoctorID,
      AppointmentStatus: "Pending",
    };

    try {
      await api.patch(
        `/AppointmentReschedule/${selectedRecord.appointment_id}`,
        formattedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      fetchAppointments();
      setFormData({
        TypeOfAppointment: "",
        AppointmentDate: "",
        Description: "",
        PaymentMethod: "",
        AppointmentStatus: "Pending",
        DoctorID: "",
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

          fetchAppointments();
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

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
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
        <div>
          <div>
            <label htmlFor="type">Appointment Type</label>
            <select
              className="form-select"
              required
              name="TypeOfAppointment"
              id="type"
              value={formData.TypeOfAppointment}
              onChange={handleChange}
            >
              <option value="Initial Consultation">Initial Consultation</option>
              <option value="Follow-up Appointment">
                Follow-up Appointment
              </option>
              <option value="DaTScan Appointment">DaTScan Appointment</option>
              <option value="Medication Management Appointment">
                Medication Management Appointment
              </option>
              <option value="Physical Therapy Appointment">
                Physical Therapy Appointment
              </option>
              <option value="REM Sleep Disorder Appointment">
                REM Sleep Disorder Appointment
              </option>
              <option value="Olfactory Evaluation Appointment">
                Olfactory Evaluation Appointment
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="datetime">Date and Time</label>
            <input
              type="datetime-local"
              className="form-control"
              id="datetime"
              required
              name="AppointmentDate"
              value={formData.AppointmentDate}
              onChange={handleChange}
              min={new Date().toISOString().split(".")[0]}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              placeholder="Additional Information (e.g. symptoms you may be experiencing, medication side effects..)"
              style={{ height: "100px" }}
              name="Description"
              id="description"
              value={formData.Description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label>Preferred Doctor</label>
            <select
              className="form-select"
              name="DoctorID"
              value={formData.DoctorID}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor</option>
              <option value="fOBFzf">Dr.Saed Al-Beool</option>
            </select>
          </div>
          <div>
            <label>Payment Method</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="PaymentMethod"
                id="cash"
                value="Cash upon arrival"
                checked={formData.PaymentMethod === "Cash upon arrival"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="cash">
                Cash upon arrival
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="PaymentMethod"
                id="card"
                value="Credit Card"
                checked={formData.PaymentMethod === "Credit Card"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="card">
                Credit or debit card
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="PaymentMethod"
                id="insurance"
                value="Insurance"
                checked={formData.PaymentMethod === "Insurance"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="insurance">
                Insurance
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default App;

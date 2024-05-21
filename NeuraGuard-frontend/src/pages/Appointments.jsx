import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Doctors from "../components/Doctors";
import ViewAppointments from "../components/ViewAppointments";
import api from "../api";

function Appointments() {
  const [formData, setFormData] = useState({
    TypeOfAppointment: "",
    AppointmentDate: "",
    Description: "",
    PaymentMethod: "",
    AppointmentStatus: "Pending",
    DoctorID: "",
  });
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [userID, setUserID] = useState("");

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    const userResponse = await api.get("/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setUserID(userResponse.data.User.user_id);

    const appointmentResponse = await api.get("/Appointment/", {
      headers: { "Content-Type": "application/json" },
    });
    setFormData(appointmentResponse.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, [userID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchAvailableTimeSlots = async (doctorId) => {
    const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);
    if (selectedDoctor) {
      const appointments = await fetchDoctorAppointments(selectedDoctor.id);
      const availableSlots = generateAvailableSlots(appointments);
      setAvailableTimeSlots(availableSlots);
    } else {
      setAvailableTimeSlots([]);
    }
  };

  const fetchDoctorAppointments = async (doctorId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/appointments?doctorId=${doctorId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch doctor appointments");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
      return [];
    }
  };

  const generateAvailableSlots = (appointments) => {
    const availableSlots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const slot = `${hour < 10 ? "0" + hour : hour}:00`;
      const isSlotAvailable = appointments.every((appointment) => {
        const appointmentHour = new Date(appointment.datetime).getHours();
        return appointmentHour !== hour;
      });
      if (isSlotAvailable) {
        availableSlots.push(slot);
      }
    }
    return availableSlots;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      TypeOfAppointment: formData.TypeOfAppointment,
      AppointmentDate: formData.AppointmentDate,
      Description: formData.Description,
      PaymentMethod: formData.PaymentMethod,
      DoctorID: formData.DoctorID,
      PatientID: userID,
      AppointmentStatus: "Pending",
    };

    try {
      const response = await api.post("/Appointment/", formattedData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Success:", response.data);
      fetchAppointments();
      setFormData({
        TypeOfAppointment: "",
        AppointmentDate: "",
        Description: "",
        PaymentMethod: "",
        AppointmentStatus: "Pending",
        DoctorID: "",
      });
    } catch (error) {
      console.error(
        "Error posting data:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <>
      <Sidebar />
      <div className="maincontent appointmentcontent">
        <h1 className="page-header" style={{ marginLeft: "15px" }}>
          Manage Appointments
        </h1>
        <div className="wide-article first-article">
          <h1 className="heading-article">List of Doctors</h1>
          <p>
            Discover the perfect doctor for your needs among our expert team.
            Click on each profile for more information.
          </p>
          <Doctors />
        </div>
        <div>
          <div className="elderly-tech">
            <div className="booking">
              <form className="row g-3 booking-form" onSubmit={handleSubmit}>
                <div>
                  <h1 className="heading-article">New Appointment</h1>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="type">
                    Appointment Type
                  </label>
                  <select
                    className="form-select"
                    style={{ height: "50px" }}
                    required
                    name="TypeOfAppointment"
                    id="type"
                    value={formData.TypeOfAppointment}
                    onChange={handleChange}
                  >
                    <option value="Initial Consultation">
                      Initial Consultation
                    </option>
                    <option value="Follow-up Appointment">
                      Follow-up Appointment
                    </option>
                    <option value="DaTScan Appointment">
                      DaTScan Appointment
                    </option>
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
                <div className="col-md-6">
                  <label className="form-label">Date and Time</label>
                  <input
                     style={{ height: "50px" }}
                    className="form-control"
                    type="datetime-local"
                    name="AppointmentDate"
                    value={formData.AppointmentDate}
                    onChange={handleChange}
                    min={new Date().toISOString().slice(0, 16)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
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
                <div className="col-md-6">
                  <label className="form-label">Preferred Doctor</label>
                  <select
                    className="form-select"
                    style={{ height: "50px" }}
                    name="DoctorID"
                    value={formData.DoctorID}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Doctor</option>
                    <option value="fOBFzf">Dr.Saed Al-Beool</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Payment Method</label>
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
                    Save
                  </button>
                  <button
                    type="reset"
                    className="btn btn-lg"
                    style={{
                      backgroundColor: "white",
                      color: "#FF8A15",
                      fontSize: "16px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      marginTop: "5px",
                      marginLeft: "5px",
                      border: "1px solid #FF8A15",
                    }}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="wide-article last-article">
            <h1 className="heading-article">View All Appointments</h1>
            <ViewAppointments />
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointments;

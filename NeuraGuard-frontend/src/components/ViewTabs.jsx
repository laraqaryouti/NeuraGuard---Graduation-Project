import { useState, useEffect } from "react";
import { Tabs, Modal, InputNumber, Input, ConfigProvider, Tag } from "antd";
import api from "../api";
const { TabPane } = Tabs;

const TabContent1 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userID, setUserID] = useState("");
  const [inputDisabled, setLocalInputDisabled] = useState(true);
  const [Info, setInfo] = useState({
    firstname: "",
    lastname: "",
    DOB: "",
    phoneNumber: "",
    email: "",
    address: "",
    gender: "",
  });

  const handleSave = async () => {
    setLocalInputDisabled(true);
    setIsEditing(false);

    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserID(response.data.User.user_id);
      await api.patch(
        `/user/${userID}`,
        {
          FirstName: Info.firstname,
          LastName: Info.lastname,
          DateOfBirth: Info.DOB,
          PhoneNumber: Info.phoneNumber,
          Email: Info.email,
          Address: Info.address,
          Gender: Info.gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleEnableEdit = () => {
    setIsEditing(true);
    setLocalInputDisabled(false); // Enable inputs when "Edit" is clicked
  };

  const fetchInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserID(response.data.User.user_id);
      const userResponse = await api.get("/User/", {
        headers: { "Content-Type": "application/json" },
      });
      const userEntry = userResponse.data.find(
        (entry) => entry.UserID === userID
      );
      if (userEntry) {
        setInfo({
          firstname: userEntry.FirstName,
          lastname: userEntry.LastName,
          DOB: userEntry.DateOfBirth,
          phoneNumber: userEntry.PhoneNumber,
          email: userEntry.Email,
          address: userEntry.Address,
          gender: userEntry.Gender,
        });
      } else {
        console.log("Error: User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [userID]);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          right: "0",
          marginRight: "25px",
          marginTop: "25px",
        }}
      >
        <button
          type="button"
          className="btn"
          disabled={inputDisabled}
          onClick={handleSave}
          style={{
            backgroundColor: "#FF8A15",
            color: "white",
          }}
        >
          Save
        </button>
        <button
          onClick={handleEnableEdit}
          type="button"
          className="btn"
          style={{
            backgroundColor: "#FF8A15",
            color: "white",
            marginLeft: "5px",
          }}
        >
          Edit
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <td className="col-right first-row">First Name</td>
            <td className="col-left first-row">
              <input
                type="text"
                disabled={inputDisabled}
                value={Info.firstname}
                onChange={(e) =>
                  setInfo({ ...Info, firstname: e.target.value })
                }
                style={{ color: inputDisabled ? "#999" : "black" }}
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">Last Name</td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                value={Info.lastname}
                onChange={(e) => setInfo({ ...Info, lastname: e.target.value })}
                style={{ color: inputDisabled ? "#999" : "black" }}
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">Date of Birth</td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                value={Info.DOB}
                onChange={(e) => setInfo({ ...Info, DOB: e.target.value })}
                style={{ color: inputDisabled ? "#999" : "black" }}
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">Phone Number</td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                value={Info.phoneNumber}
                onChange={(e) =>
                  setInfo({ ...Info, phoneNumber: e.target.value })
                }
                style={{ color: inputDisabled ? "#999" : "black" }}
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">Email</td>
            <td className="col-left">
              <input
                type="email"
                disabled={inputDisabled}
                value={Info.email}
                onChange={(e) => setInfo({ ...Info, email: e.target.value })}
                style={{ color: inputDisabled ? "#999" : "black" }}
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">Address</td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                value={Info.address}
                onChange={(e) => setInfo({ ...Info, address: e.target.value })}
                style={{ color: inputDisabled ? "#999" : "black" }}
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">Gender</td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                value={Info.gender}
                onChange={(e) => setInfo({ ...Info, gender: e.target.value })}
                style={{ color: inputDisabled ? "#999" : "black" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const TabContent2 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userID, setUserID] = useState("");
  const [inputDisabled, setLocalInputDisabled] = useState(true);
  const [clinicalRecord, setclinicalRecord] = useState({
    symptom_history: "",
    family_members_with_pd: "",
    treatment_plan: "",
    allergies: "",
    ability_to_do_tasks_without_assistance: "",
    other_medical_conditions: "",
    insurance_company: "",
  });

  const handleSave = async () => {
    setLocalInputDisabled(true);
    setIsEditing(false);

    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserID(response.data.User.user_id);

      // Check if clinical record exists
      const clinicalResponse = await api.get("/ClinicalRecord/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const clinicalEntry = clinicalResponse.data.find(
        (entry) => entry.UserID === userID
      );

      if (clinicalEntry) {
        // Update existing clinical record
        await api.patch(
          `/clinical_record/${userID}`,
          {
            SymptomHistory: clinicalRecord.symptom_history,
            FamilyMembersWithPD: clinicalRecord.family_members_with_pd,
            TreatmentPlan: clinicalRecord.treatment_plan,
            Allergies: clinicalRecord.allergies,
            AbilityToDoTasksWithoutAssistance:
              clinicalRecord.ability_to_do_tasks_without_assistance,
            OtherMedicalConditions: clinicalRecord.other_medical_conditions,
            InsuranceCompany: clinicalRecord.insurance_company,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create new clinical record
        await api.post(
          "/ClinicalRecord/",
          {
            UserID: userID,
            SymptomHistory: clinicalRecord.symptom_history,
            FamilyMembersWithPD: clinicalRecord.family_members_with_pd,
            TreatmentPlan: clinicalRecord.treatment_plan,
            Allergies: clinicalRecord.allergies,
            AbilityToDoTasksWithoutAssistance:
              clinicalRecord.ability_to_do_tasks_without_assistance,
            OtherMedicalConditions: clinicalRecord.other_medical_conditions,
            InsuranceCompany: clinicalRecord.insurance_company,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleEnableEdit = () => {
    setIsEditing(true);
    setLocalInputDisabled(false);
  };

  const fetchClinicalRecord = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserID(response.data.User.user_id);
      const clinicalResponse = await api.get("/ClinicalRecord/", {
        headers: { "Content-Type": "application/json" },
      });
      const clinicalEntry = clinicalResponse.data.find(
        (entry) => entry.UserID === userID
      );
      if (clinicalEntry) {
        setclinicalRecord({
          symptom_history: clinicalEntry.SymptomHistory,
          family_members_with_pd: clinicalEntry.FamilyMembersWithPD,
          treatment_plan: clinicalEntry.TreatmentPlan,
          allergies: clinicalEntry.Allergies,
          ability_to_do_tasks_without_assistance:
            clinicalEntry.AbilityToDoTasksWithoutAssistance,
          other_medical_conditions: clinicalEntry.OtherMedicalConditions,
          insurance_company: clinicalEntry.InsuranceCompany,
        });
      } else {
        console.log("Error: User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchClinicalRecord();
  }, [userID]);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          right: "0",
          marginRight: "25px",
          marginTop: "25px",
        }}
      >
        {" "}
        <button
          type="button"
          className="btn"
          disabled={inputDisabled}
          onClick={handleSave}
          style={{
            backgroundColor: "#FF8A15",
            color: "white",
          }}
        >
          Save
        </button>
        <button
          onClick={handleEnableEdit}
          type="button"
          className="btn"
          style={{
            backgroundColor: "#FF8A15",
            color: "white",
            marginLeft: "5px",
          }}
        >
          Edit
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <td className="col-right first-row">Symptom History</td>
            <td className="col-left first-row">
              <input
                type="text"
                disabled={inputDisabled}
                placeholder="e.g. Anxiety, Tremors"
                value={clinicalRecord.symptom_history}
                style={{ color: isEditing ? "black" : "#999" }}
                onChange={(e) =>
                  setclinicalRecord({
                    ...clinicalRecord,
                    symptom_history: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">Family Members with PD</td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                placeholder="-"
                value={clinicalRecord.family_members_with_pd}
                style={{ color: isEditing ? "black" : "#999" }}
                onChange={(e) =>
                  setclinicalRecord({
                    ...clinicalRecord,
                    family_members_with_pd: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">Treatment Plan</td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                value={clinicalRecord.treatment_plan}
                placeholder="e.g. Therapy, Physical Therapy"
                style={{ color: isEditing ? "black" : "#999" }}
                onChange={(e) =>
                  setclinicalRecord({
                    ...clinicalRecord,
                    treatment_plan: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">Allergies</td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                value={clinicalRecord.allergies}
                placeholder="e.g. Peanut Allergy"
                style={{ color: isEditing ? "black" : "#999" }}
                onChange={(e) =>
                  setclinicalRecord({
                    ...clinicalRecord,
                    allergies: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">
              Ability to do tasks without assistance
            </td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                value={clinicalRecord.ability_to_do_tasks_without_assistance}
                placeholder="-"
                style={{ color: isEditing ? "black" : "#999" }}
                onChange={(e) =>
                  setclinicalRecord({
                    ...clinicalRecord,
                    ability_to_do_tasks_without_assistance: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">Other Medical Conditions</td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                placeholder="-"
                value={clinicalRecord.other_medical_conditions}
                style={{ color: isEditing ? "black" : "#999" }}
                onChange={(e) =>
                  setclinicalRecord({
                    ...clinicalRecord,
                    other_medical_conditions: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">Insurance Company</td>
            <td className="col-left">
              <input
                type="email"
                disabled={inputDisabled}
                placeholder="-"
                value={clinicalRecord.insurance_company}
                style={{ color: isEditing ? "black" : "#999" }}
                onChange={(e) =>
                  setclinicalRecord({
                    ...clinicalRecord,
                    insurance_company: e.target.value,
                  })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const TabContent3 = () => {
  const [userID, setUserID] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    current_medications: "",
    type: "",
    duration: 1,
    startDate: "",
    img: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userID) {
      fetchData();
    }
  }, [userID]);

  const fetchUserData = async () => {
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

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const medicationsResponse = await api.get("/PatientMedications/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const medicationEntries = medicationsResponse.data.filter(
        (entry) => entry.UserID === userID
      );
      setMedications(medicationEntries);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOk = async () => {
    const token = localStorage.getItem("token");

    const formattedInputs = {
      CurrentMedications: newMedication.current_medications,
      Type: newMedication.type,
      Duration: newMedication.duration,
      StartDate: newMedication.startDate,
      UserID: userID,
    };

    try {
      const response = await api.post("/PatientMedications/", formattedInputs, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const savedMedication = response.data;
        setMedications([...medications, savedMedication]);
        setNewMedication({
          current_medications: "",
          type: "",
          duration: 1,
          startDate: "",
          img: "",
        });
      } else {
        console.error("Failed to save medication");
      }
    } catch (error) {
      console.error("Error saving medication:", error);
    }

    setIsModalOpen(false);
  };

  const handleChange = (key, value) => {
    setNewMedication({ ...newMedication, [key]: value });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewMedication({
          ...newMedication,
          img: reader.result,
          imgFile: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Modal
        title="Add New Medication"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        okButtonProps={{
          style: { backgroundColor: "#FF8A15", borderColor: "#FF8A15" },
        }}
      >
        Upload Image <br />
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleImageChange}
        />
        <br />
        Medication Name and Dosage <br />
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Panadol 50mg"
          value={newMedication.current_medications}
          onChange={(e) => handleChange("current_medications", e.target.value)}
        />
        <br />
        Type <br />
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Anxiety Medication"
          value={newMedication.type}
          onChange={(e) => handleChange("type", e.target.value)}
        />
        <br />
        Duration (in months) <br />
        <input
          type="number"
          className="form-control"
          min={1}
          max={30}
          value={newMedication.duration}
          onChange={(e) => handleChange("duration", parseInt(e.target.value))}
        />
        <br />
        Start Date <br />
        <input
          type="date"
          className="form-control"
          value={newMedication.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
        />
        <br />
      </Modal>
      <div
        style={{
          position: "absolute",
          right: "0",
          marginRight: "25px",
          marginTop: "25px",
        }}
      >
        <button
          onClick={showModal}
          type="button"
          className="btn"
          style={{ backgroundColor: "#FF8A15", color: "white" }}
        >
          Add
        </button>
      </div>
      <div style={{ overflowY: "scroll", height: "350px" }}>
        <table className="medication-table">
          <thead>
            <tr>
              <th></th>
              <th className="first-row">Medication</th>
              <th className="first-row">Duration</th>
              <th className="first-row">Start Date</th>
            </tr>
          </thead>
          <tbody>
            {medications.map(
              (medication, index) =>
                medication && (
                  <tr key={index}>
                    <td className="col-right">
                      <img
                        src={medication.img || ""}
                        height="80"
                        width="80"
                        alt="Medication"
                        style={{ borderRadius: "20px" }}
                      />
                    </td>
                    <td>
                      <span className="title-medication">
                        {medication.CurrentMedications}
                      </span>
                      <br /> {medication.Type}
                    </td>
                    <td className="table-number">{medication.Duration}</td>
                    <td className="table-number">{medication.StartDate}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TabContent4 = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await api.patch(
        "/reset-password",
        { password: newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Password has been reset successfully.");
        setError("");
      } else {
        setError("Failed to reset password.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Error resetting password.");
      setSuccess("");
    }
  };

  return (
    <div
      style={{
        width: "40%",
        paddingLeft: "25px",
        paddingTop: "25px",
      }}
      className="reset-pass"
    >
      <h1 className="heading-article">Reset your password</h1>
      <p>Choose a new & strong password of minimum 8 characters.</p>
      <div className="col-12">
        <label className="form-label">New Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="************"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="col-12">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="************"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button
        type="button"
        className="btn"
        style={{
          backgroundColor: "#FF8A15",
          color: "white",
          marginTop: "10px",
        }}
        onClick={handlePasswordChange}
      >
        Set Password
      </button>
    </div>
  );
};

const App = () => {
  const [inputDisabled, setInputDisabled] = useState(true);

  const handleEnableInput = () => {
    setInputDisabled(false);
  };

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      type="card"
      style={{ marginLeft: "2%", marginRight: "2%" }}
    >
      <TabPane tab="Personal Info" key="1" className="tab-content">
        <TabContent1
          inputDisabled={inputDisabled}
          handleEnableInput={handleEnableInput}
          setInputDisabled={setInputDisabled}
        />
      </TabPane>
      <TabPane tab="Clinical Record" key="2" className="tab-content">
        <TabContent2
          inputDisabled={inputDisabled}
          handleEnableInput={handleEnableInput}
          setInputDisabled={setInputDisabled}
        />
      </TabPane>
      <TabPane tab="Medications" key="3" className="tab-content">
        <TabContent3 />
      </TabPane>
      <TabPane tab="Reset Password" key="4" className="tab-content">
        <TabContent4 />
      </TabPane>
    </Tabs>
  );
};

export default App;

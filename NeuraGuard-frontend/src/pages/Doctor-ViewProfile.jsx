import DrSidebar from "../components/DrSidebar";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import api from "../api";
import { FloatButton } from "antd";
import { DoubleLeftOutlined } from '@ant-design/icons';
const TabContent2 = () => {
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
    gender: "",
    address: "",
  });
  const [qualifications, setqualifications] = useState("");
  const [about, setabout] = useState("");
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
        console.log("User info fetched:", userEntry);
      } else {
        console.log("Error: User not found");
      }

      const qualificationsResponse = await api.get("/DoctorQualifications/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const qualificationEntry = qualificationsResponse.data.find(
        (entry) => entry.UserID === userID
      );
      if (qualificationEntry) {
        setqualifications(qualificationEntry.Qualifications);
        setabout(qualificationEntry.About);
        console.log(
          "Qualifications fetched:",
          qualificationEntry.Qualifications
        );
      } else {
        console.log("Error: Qualifications not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSave = async () => {
    setLocalInputDisabled(true);
    setIsEditing(false);

    const token = localStorage.getItem("token");
    try {
      await api.patch(
        `/user/${userID}`,
        {
          FirstName: Info.firstname,
          LastName: Info.lastname,
          DateOfBirth: Info.DOB,
          PhoneNumber: Info.phoneNumber,
          Email: Info.email,
          Gender: Info.gender,
          Address: Info.address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const qualificationsResponse = await api.get("/DoctorQualifications/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const qualificationEntry = qualificationsResponse.data.find(
        (entry) => entry.UserID === userID
      );

      if (qualificationEntry) {
        await api.patch(
          `/DoctorQualifications/${userID}`,
          { Qualifications: qualifications, About: about },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await api.post(
          "/DoctorQualifications/",
          { UserID: userID, Qualifications: qualifications, About: about },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    fetchInfo(userID);
  }, [userID]);

  const handleEnableEdit = () => {
    setIsEditing(true);
    setLocalInputDisabled(false); 
  };


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
          <tr>
            <td className="col-right">Qualifications</td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                value={qualifications}
                onChange={(e) => setqualifications(e.target.value)}
                style={{ color: inputDisabled ? "#999" : "black" }}
              />
            </td>
          </tr>
          <tr>
            <td className="col-right">About</td>
            <td className="col-left">
              <input
                type="text"
                disabled={inputDisabled}
                value={about}
                style={{ color: isEditing ? "black" : "#999" }}
                onChange={(e) => setabout(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

function ViewProfile() {
  const [userID, setuserID] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [username, setusername] = useState("");
  const [DoctorInfo, setDoctorInfo] = useState({
    speciality: "",
    office_location: "",
  });
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [about, setabout] = useState("");

  const handleEnableInput = () => {
    setInputDisabled(false);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); // Log the response
      setuserID(response.data.User.user_id);
      setfirstname(response.data.User.fname);
      setlastname(response.data.User.lname);
      setusername(response.data.User.username);
      const doctorResponse = await api.get("/Doctor/", {
        headers: { "Content-Type": "application/json" },
      });
      const doctorEntry = doctorResponse.data.find(
        (entry) => entry.UserID === userID
      );
      if (doctorEntry) {
        setDoctorInfo({
          speciality: doctorEntry.Speciality,
          office_location: doctorEntry.OfficeLocation,
        });
        console.log(doctorEntry);
      } else {
        console.log("No matching Doctor record found for user");
      }
      const qualificationsResponse = await api.get("/DoctorQualifications/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const qualificationEntry = qualificationsResponse.data.find(
        (entry) => entry.UserID === userID
      );
      setabout(qualificationEntry.About);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userID]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        await fetch("http://localhost:3000/users/1", {
          method: "PATCH",
          body: formData,
        });

        setSelectedImage(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error updating image:", error);
      }
    }
  };

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    if (
      currentDate.getMonth() < dobDate.getMonth() ||
      (currentDate.getMonth() === dobDate.getMonth() &&
        currentDate.getDate() < dobDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  return (
    <>
      <DrSidebar isOpen={isSidebarOpen}/>
      <FloatButton onClick={toggleSidebar} icon={<DoubleLeftOutlined />}  className="side-button" />
      <div className="maincontent viewprofile">
        <h1 className="page-header">View Profile</h1>
        <div className="header-viewprofile">
          <div className="main-info wide-article">
            <div className="pp-change">
              <div className="pp-large">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ maxWidth: "100%" }}
                    className="pp-large"
                  />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="imageInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#FF8A15",
                    color: "white",
                    border: "1px solid #FF8A15",
                    borderRadius: "15px",
                    marginTop: "-30px",
                  }}
                  onClick={() => document.getElementById("imageInput")?.click()}
                >
                  <UploadOutlined />
                </button>
              </div>
            </div>
            <div className="main-info-3">
              <ul className="info-list">
                <li className="card-title">
                  {firstname} {lastname}
                </li>
                <li className="card-username">@{username}</li>
                <li className="card-items">
                  Speciality: {DoctorInfo.speciality}
                </li>
                <li className="card-items">
                  Location: {DoctorInfo.office_location}
                </li>
              </ul>
            </div>
          </div>
          <div className="additional-info  wide-article">
            <div className="add-info-header">
              <p className="card-title">About</p>
              <p onChange={(e) => setabout(e.target.value)}>{about}</p>
            </div>
          </div>
        </div>
        <div className="tabs">
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
            <TabPane tab="Reset Password" key="2" className="tab-content">
              <TabContent2 />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}
export default ViewProfile;

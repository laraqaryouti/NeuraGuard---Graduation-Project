import Sidebar from "../components/Sidebar";
import ViewTabs from "../components/Viewtabs";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import api from "../api";

function ViewProfile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState([]);
  const [userID, setuserID] = useState("");
  const [DOB, setDOB] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [status, setstatus] = useState("");
  const [rbdResponse, setrbdResponse] = useState({
    RBDResponse1s: "",
    RBDResponse2s: "",
    RBDResponse3s: "",
    RBDResponse4s: "",
    RBDResponse5s: "",
    RBDResponse6s: "",
    RBDResponse7s: "",
    RBDResponse8s: "",
    RBDResponse9s: "",
    RBDResponse10s: "",
    RBDResponse11s: "",
    RBDResponse12s: "",
    RBDResponse13s: "",
    RBDResponse14s: "",
    RBDResponse15s: "",
    RBDResponse16s: "",
    RBDResponse17s: "",
    RBDResponse18s: "",
    RBDResponse19s: "",
    RBDResponse20s: "",
  });
  const [UPSIT, setUPSIT] = useState("");
  const [datScanResult, setdatScanResult] = useState(0);

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
      setDOB(response.data.User.DOB);
      setfirstname(response.data.User.fname);
      setlastname(response.data.User.lname);
      setusername(response.data.User.username);
      setstatus(response.data.User.status);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchRbdScore = async () => {
    try {
      const token = localStorage.getItem("token");
      const response1 = await api.get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response1.data); // Log the response
      setuserID(response1.data.User.user_id);

      const RBDResponse = await api.get("/RBDQuestionnaire/", {
        headers: { "Content-Type": "application/json" },
      });
      const rbdEntry = RBDResponse.data.find(
        (entry) => entry.UserID === userID
      );
      if (rbdEntry) {
        setrbdResponse({
          RBDResponse1s: rbdEntry.RBDResponse1,
          RBDResponse2s: rbdEntry.RBDResponse2,
          RBDResponse3s: rbdEntry.RBDResponse3,
          RBDResponse4s: rbdEntry.RBDResponse4,
          RBDResponse5s: rbdEntry.RBDResponse5,
          RBDResponse6s: rbdEntry.RBDResponse6,
          RBDResponse7s: rbdEntry.RBDResponse7,
          RBDResponse8s: rbdEntry.RBDResponse8,
          RBDResponse9s: rbdEntry.RBDResponse9,
          RBDResponse10s: rbdEntry.RBDResponse10,
          RBDResponse11s: rbdEntry.RBDResponse11,
          RBDResponse12s: rbdEntry.RBDResponse12,
          RBDResponse13s: rbdEntry.RBDResponse13,
          RBDResponse14s: rbdEntry.RBDResponse14,
          RBDResponse15s: rbdEntry.RBDResponse15,
          RBDResponse16s: rbdEntry.RBDResponse16,
          RBDResponse17s: rbdEntry.RBDResponse17,
          RBDResponse18s: rbdEntry.RBDResponse18,
          RBDResponse19s: rbdEntry.RBDResponse19,
          RBDResponse20s: rbdEntry.RBDResponse20,
        });
        console.log(rbdResponse);
      } else {
        console.log("No matching Question record found for user");
      }
    } catch (error) {
      console.log(rbdResponse);
      console.error("Error fetching RBD score:", error);
    }
  };

  // Function to calculate the RBD score based on yes responses
  const calculateRbdScore = (responses) => {
    let score = 0;
    for (const key in responses) {
      if (responses[key].toLowerCase() === "yes") {
        score++;
      }
    }
    return score;
  };

  const fetchUPSIT = async () => {
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
      const upsitResponse = await api.get("/HealthData/", {
        headers: { "Content-Type": "application/json" },
      });

      const upsitEntry = upsitResponse.data.find(
        (entry) => entry.UserID === userID
      );
      if (upsitEntry) {
        setUPSIT(upsitEntry.UPSIT);
      } else {
        console.log(upsitEntry);
        console.log("No matching UPSIT record found for user");
      }
    } catch (error) {
      console.error("Error fetching UPSIT data:", error);
    }
  };

  const fetchDatScanResult = async () => {
    const token = localStorage.getItem("token");
    const userResponse = await api.get("/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setuserID(userResponse.data.User.user_id);

    const DatScanResponse = await api.get("/DATSCAN/", {
      headers: { "Content-Type": "application/json" },
    });

    const datScanEntry = DatScanResponse.data.find(
      (entry) => entry.UserID === userID
    );
    console.log(datScanEntry.Datscan_Result);
    if (datScanEntry) {
      setdatScanResult(datScanEntry.Datscan_Result);
      if (datScanResult == 1) {
        setdatScanResult("Positive");
      } else {
        setdatScanResult("Negative");
      }
    } else {
      console.log(datScanEntry);
      console.log("No matching DATSCAN record found for user");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchRbdScore();
    fetchUPSIT();
    fetchDatScanResult();
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

  return (
    <>
      <Sidebar />
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
                  {firstname ? firstname : ""} {lastname ? lastname : ""}
                </li>
                <li className="card-username">@{username ? username : ""}</li>
                <li className="card-items">
                  Age: {DOB ? calculateAge(DOB) : ""} years old
                </li>
                <li className="card-items">Status: {status ? "Parkinson Patient" : "Healthy Control"}</li>
              </ul>
            </div>
          </div>
          <div className="additional-info wide-article">
            <div className="add-info-header">
              <p className="card-title">Health Data Summary</p>
              <table className="table-add">
                <tbody>
                  <tr>
                    <td>
                      <li className="card-items info-list">UPSIT Score</li>
                    </td>
                    <td>
                      <li className="card-items col-right-add info-list">
                        {UPSIT}/40
                      </li>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <li className="card-items info-list">
                        RBD Questionnaire
                      </li>
                    </td>
                    <td>
                      <li className="card-items col-right-add info-list">
                        {calculateRbdScore(rbdResponse)}/20
                      </li>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <li className="card-items info-list">DATSCAN Result</li>
                    </td>
                    <td>
                      <li className="card-items col-right-add info-list">
                        {datScanResult}
                      </li>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="tabs">
          <ViewTabs />
        </div>
      </div>
    </>
  );
}

export default ViewProfile;

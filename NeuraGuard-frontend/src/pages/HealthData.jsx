// import HealthNav from "../components/HealthNav";
// import Sidebar from "../components/Sidebar.jsx";
// import React, { useState, useEffect } from "react";
// import api from "../api";

// function HealthData() {
//   const [formData, setFormData] = useState({
//     upsit: "",
//   });
//   const [userID, setuserID] = useState("");
//   const [datscanID, setdatscanID] = useState("");
//   const [questionID, setquestionID] = useState("");

//   const fetchUPSIT = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const headers1 = {
//         "Content-Type": "application/json",
//       };
//       const response = await api.get("/HealthData/", { headers1 });
//       setFormData(response.data);

//       const userResponse = await api.get("/", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setuserID(userResponse.data.User.user_id);

//       const DatScanResponse = await api.get("/DATSCAN/", { headers1 });

//       const datScanEntry = DatScanResponse.data.find(
//         (entry) => entry.UserID === userID
//       );
//       if (datScanEntry) {
//         setdatscanID(datScanEntry.DATSCANID);
//       } else {
//         console.log(datScanEntry);
//         console.log("No matching DATSCAN record found for user");
//       }

//       // if (DatScanResponse.data.UserID===userID) {
//       //   setdatscanID(DatScanResponse.data.DATSCANID);  // Only set the DATSCANID
//       // } else {
//       //   console.log('No matching DATSCAN record found for user');
//       // }
//       // const RBDResponse=await api.get("/RBDQuestionnaire/",{headers1});

//       // if (RBDResponse.data.UserID===userID) {
//       //   setquestionID(RBDResponse.data.QuestionID);  // Only set the DATSCANID
//       // } else {
//       //   console.log('No matching Question record found for user');
//       // }
//       const RBDResponse = await api.get("/RBDQuestionnaire/", {
//         headers: headers1,
//       });
//       const rbdEntry = RBDResponse.data.find(
//         (entry) => entry.UserID === userID
//       );
//       if (rbdEntry) {
//         setquestionID(rbdEntry.QuestionID);
//       } else {
//         console.log(rbdEntry);
//         console.log("No matching Question record found for user");
//       }
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUPSIT();
//   }, [userID]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.upsit > 40 || formData.upsit < 0) {
//       alert("The Score Should be Between 0 and 40!");
//       return;
//     }

//     const formattedData = {
//       UPSIT: parseInt(formData.upsit),
//       UserID: userID,
//       DATSCANID: datscanID,
//       QuestionID: questionID,
//     };

//     console.log("Submitting Data:", JSON.stringify(formattedData));

//     try {
//       const response = await api.post("/HealthData/", formattedData, {
//         headers: { "Content-Type": "application/json" },
//       });
//       console.log("Success:", response.data);
//       fetchUPSIT();
//       setFormData({ upsit: "" });
//     } catch (error) {
//       console.error(
//         "Error posting data:",
//         error.response ? error.response.data : error
//       );
//     }
//   };

//   return (
//     <>
//       <Sidebar />
//       <HealthNav />
//       <div className="maincontent upsitcontent">
//         <div className="wide-article">
//           <h1 className="heading-article">
//             The University of Pennsylvania Smell Identification Test (UPSIT®)
//           </h1>
//           <p>
//             The UPSIT Smell Test, short for the University of Pennsylvania Smell
//             Identification Test, is a widely used clinical tool designed to
//             assess a person's olfactory function. Developed by Dr. Richard L.
//             Doty, the UPSIT consists of a scratch-and-sniff booklet containing
//             40 micro-encapsulated odorants. Test-takers are required to identify
//             each odor by selecting one of four multiple-choice options. The
//             variety of scents spans a range of common odors, including fruits,
//             spices, and everyday items. The test is valuable for evaluating and
//             monitoring olfactory deficits associated with various medical
//             conditions, such as neurodegenerative disorders like Parkinson's
//             disease and Alzheimer's disease. With its simplicity and
//             effectiveness, the UPSIT Smell Test plays a crucial role in helping
//             healthcare professionals assess and understand olfactory dysfunction
//             in their patients.
//           </p>
//           <p>
//             Haven’t done the UPSIT test?
//             <span>
//               <a
//                 href="https://sensonics.com/product/smell-identification-test/"
//                 target="_blank"
//                 style={{ paddingLeft: "5px", color: "#FF8A15" }}
//               >
//                 Order your kit now.
//               </a>
//             </span>{" "}
//           </p>
//         </div>
//         <div>
//           <div className="side-article left-article col-lg-6">
//             <h1 className="heading-article">Upload UPSIT® Test Results</h1>
//             <img
//               src="src\assets\upsit.jpg"
//               alt="UPSIT Test"
//               height="300"
//               width="100%"
//             />
//             <p>
//               {userID}The Upsit test results, scored out of 40, offer a
//               quantitative measure of the individual's olfactory identification
//               proficiency, with a higher score indicating a better sense of
//               smell.
//             </p>
//             <form onSubmit={handleSubmit}>
//               <div className="row g-2">
//                 <div className="col-sm-9">
//                   <input
//                     type="text"
//                     placeholder="UPSIT Test Score"
//                     className="form-control inputs"
//                     name="upsit"
//                     onChange={handleChange}
//                     value={formData.upsit || ""}
//                   />
//                 </div>
//                 <div className="col-sm">
//                   <button
//                     type="submit"
//                     className="btn btn-lg"
//                     style={{
//                       backgroundColor: "#FF8A15",
//                       color: "white",
//                       fontSize: "16px",
//                       paddingLeft: "20px",
//                       paddingRight: "20px",
//                       paddingTop: "10px",
//                       paddingBottom: "10px",
//                       marginTop: "5px",
//                       marginLeft: "3px",
//                     }}
//                   >
//                     Upload
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className="col-lg-6 side-article right-article ">
//             <h1 className="heading-article">
//               Know more about Olfactory Loss & how it affects Parkinson’s
//               patients
//             </h1>
//             <img
//               src="src\assets\smelling.png"
//               alt="Girl smelling Lemon"
//               height="268"
//               width="100%"
//             />
//             <p className="article-paragraph">
//               Olfactory loss is a common early symptom in Parkinson's disease
//               (PD) patients, often preceding motor symptoms. The diminished
//               sense of smell, known as anosmia, can impact the quality of life
//               for individuals with PD. The olfactory system is intricately
//               connected to brain regions affected by the disease, and the
//               degeneration of dopaminergic neurons contributes to the loss of
//               smell.<span style={{ color: "gray" }}>Beyond being...</span>{" "}
//               <span style={{ color: "#4AB8E7" }}>Read More</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default HealthData;

import HealthNav from "../components/HealthNav";
import Sidebar from "../components/Sidebar.jsx";
import React, { useState, useEffect } from "react";
import api from "../api";

function HealthData() {
  const [formData, setFormData] = useState({
    upsit: "",
  });
  const [userID, setUserID] = useState("");
  const [datscanID, setDatscanID] = useState("");
  const [questionID, setQuestionID] = useState("");
  const [existingRecord, setExistingRecord] = useState(null);

  const fetchUPSIT = async () => {
    const token = localStorage.getItem("token");

    try {
      const headers1 = {
        "Content-Type": "application/json",
      };
      const response = await api.get("/HealthData/", { headers: headers1 });

      const userResponse = await api.get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserID(userResponse.data.User.user_id);

      const DatScanResponse = await api.get("/DATSCAN/", { headers: headers1 });
      const datScanEntry = DatScanResponse.data.find(
        (entry) => entry.UserID === userResponse.data.User.user_id
      );
      if (datScanEntry) {
        setDatscanID(datScanEntry.DATSCANID);
      } else {
        console.log("No matching DATSCAN record found for user");
      }

      const RBDResponse = await api.get("/RBDQuestionnaire/", {
        headers: headers1,
      });
      const rbdEntry = RBDResponse.data.find(
        (entry) => entry.UserID === userResponse.data.User.user_id
      );
      if (rbdEntry) {
        setQuestionID(rbdEntry.QuestionID);
      } else {
        console.log("No matching Question record found for user");
      }

      const existing = response.data.find(
        (record) => record.UserID === userResponse.data.User.user_id
      );
      setExistingRecord(existing);
      if (existing) {
        setFormData({
          upsit: existing.UPSIT.toString(),
        });
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchUPSIT();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.upsit > 40 || formData.upsit < 0) {
      alert("The Score Should be Between 0 and 40!");
      return;
    }

    const formattedData = {
      UPSIT: parseInt(formData.upsit),
      UserID: userID,
      DATSCANID: datscanID,
      QuestionID: questionID,
    };

    console.log("Submitting Data:", JSON.stringify(formattedData));

    try {
      if (existingRecord) {
        // If record exists, update it
        const response = await api.patch(
          `/HealthDataUpdate/${userID}`,
          { UPSIT: parseInt(formData.upsit) },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Updated successfully:", response.data);
      } else {
        // If no record exists, create a new one
        const response = await api.post("/HealthData/", formattedData, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Created successfully:", response.data);
      }
      fetchUPSIT();
      setFormData({ upsit: "" });
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
      <HealthNav />
      <div className="maincontent upsitcontent">
        <div className="wide-article">
          <h1 className="heading-article">
            The University of Pennsylvania Smell Identification Test (UPSIT®)
          </h1>
          <p>
            The UPSIT Smell Test, short for the University of Pennsylvania Smell
            Identification Test, is a widely used clinical tool designed to
            assess a person's olfactory function. Developed by Dr. Richard L.
            Doty, the UPSIT consists of a scratch-and-sniff booklet containing
            40 micro-encapsulated odorants. Test-takers are required to identify
            each odor by selecting one of four multiple-choice options. The
            variety of scents spans a range of common odors, including fruits,
            spices, and everyday items. The test is valuable for evaluating and
            monitoring olfactory deficits associated with various medical
            conditions, such as neurodegenerative disorders like Parkinson's
            disease and Alzheimer's disease. With its simplicity and
            effectiveness, the UPSIT Smell Test plays a crucial role in helping
            healthcare professionals assess and understand olfactory dysfunction
            in their patients.
          </p>
          <p>
            Haven’t done the UPSIT test?
            <span>
              <a
                href="https://sensonics.com/product/smell-identification-test/"
                target="_blank"
                style={{ paddingLeft: "5px", color: "#FF8A15" }}
              >
                Order your kit now.
              </a>
            </span>{" "}
          </p>
        </div>
        <div>
          <div className="side-article left-article col-lg-6">
            <h1 className="heading-article">Upload UPSIT® Test Results</h1>
            <img
              src="src\assets\upsit.jpg"
              alt="UPSIT Test"
              height="300"
              width="100%"
            />
            <p>
              The Upsit test results, scored out of 40, offer a quantitative
              measure of the individual's olfactory identification proficiency,
              with a higher score indicating a better sense of smell.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="row g-2">
                <div className="col-sm-9">
                  <input
                    type="text"
                    placeholder="UPSIT Test Score"
                    className="form-control inputs"
                    name="upsit"
                    onChange={handleChange}
                    value={formData.upsit || ""}
                  />
                </div>
                <div className="col-sm">
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
                      marginLeft: "3px",
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6 side-article right-article ">
            <h1 className="heading-article">
              Know more about Olfactory Loss & how it affects Parkinson’s
              patients
            </h1>
            <img
              src="src\assets\smelling.png"
              alt="Girl smelling Lemon"
              height="268"
              width="100%"
            />
            <p className="article-paragraph">
              Olfactory loss is a common early symptom in Parkinson's disease
              (PD) patients, often preceding motor symptoms. The diminished
              sense of smell, known as anosmia, can impact the quality of life
              for individuals with PD. The olfactory system is intricately
              connected to brain regions affected by the disease, and the
              degeneration of dopaminergic neurons contributes to the loss of
              smell.<span style={{ color: "gray" }}>Beyond being...</span>{" "}
              <span style={{ color: "#4AB8E7" }}>Read More</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HealthData;

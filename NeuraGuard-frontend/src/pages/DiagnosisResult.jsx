import React, { useEffect, useState } from "react";
import { PieChart } from "../components/PieChart";
import { BarChart } from "../components/BarChart";
import Sidebar from "../components/Sidebar";
import { getPrediction } from "../predictService";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { FloatButton, Empty, Button } from "antd";
import api from "../api";

function DiagnosisResult() {
  const [prediction, setPrediction] = useState(null);
  const [datscanData, setDatscanData] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [rbdData, setRbdData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState("");
  const [Age, setAge] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rbd, setrbd] = useState("");
  const [upsit, setupsit] = useState("");
  const [userName, setuserName] = useState("");
  const [Datscanresult, setresult] = useState("");
  const [familywithpd, setfamily] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
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
  const convertResponse = (value) => {
    return value === "Yes" ? 1 : 0;
  };

  const calculateRbdScore = (responses) => {
    let score = 0;
    for (const key in responses) {
      if (responses[key].toLowerCase() === "yes") {
        score++;
      }
    }
    return score;
  };

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const token = localStorage.getItem("token");
        const userResponse = await api.get("/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const currentUserId = userResponse.data.User.user_id;
        setUserID(currentUserId);
        setuserName(userResponse.data.User.username);
        
            } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userID) return;

      try {
        const token = localStorage.getItem("token");

        const [
          healthDataResponse,
          datscanResponse,
          rbdResponse,
          ageResponse,
          familyResponse,
        ] = await Promise.all([
          api.get("/HealthData/", {
            headers: { "Content-Type": "application/json" },
          }),
          api.get("/DATSCAN/", {
            headers: { "Content-Type": "application/json" },
          }),
          api.get("/RBDQuestionnaire/", {
            headers: { "Content-Type": "application/json" },
          }),
          api.get("/User/", {
            headers: { "Content-Type": "application/json" },
          }),
          api.get("/ClinicalRecord/", {
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        const healthEntry = healthDataResponse.data.find(
          (entry) => entry.UserID === userID
        );
        const datscanEntry = datscanResponse.data.find(
          (entry) => entry.UserID === userID
        );
        const rbdEntry = rbdResponse.data.find(
          (entry) => entry.UserID === userID
        );
        const ageEntry = ageResponse.data.find(
          (entry) => entry.UserID === userID
        );
        const familyEntry = familyResponse.data.find(
          (entry) => entry.UserID === userID
        );

        setHealthData(healthEntry);
        setDatscanData(datscanEntry);
        setRbdData(rbdEntry);
        setAge(calculateAge(ageEntry.DateOfBirth));
        setfamily(familyEntry);
      } catch (error) {
        console.error("Error fetching data or getting prediction:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  const fetchPrediction = async () => {
    const inputData = {
      PATNO: 124, // Example value
      ENROLL_AGE: Age, // Example value
      AV133STDY: 0, // Example value
      TAUSTDY: 0, // Example value
      GAITSTDY: 0, // Example value
      PISTDY: 0, // Example value
      SVASTDY: 0, // Example value
      PPMI_ONLINE_ENROLL: 2, // Example value
      PHENOCNV: 0, // Example value
      ENRLPINKI: 0, // Example value
      ENRLPRKN: 0, // Example value
      ENRLSRDC: convertResponse(familywithpd.FamilyMembersWithPD), // Example value
      ENRLHPSM: 0, // Example value
      ENRURED: 0, // Example value
      ENRLURRK2: 0, // Example value
      ENRLENCA: 0, // Example value
      ENRLGBA: 0, // Example value
      TOTAL_CORRECT: healthData.UPSIT, // Example value
      PTCGBOTH: 1, // Example value

      DRMVIVID: convertResponse(rbdData.RBDResponse1), // Example value
      DRMAGRAC: convertResponse(rbdData.RBDResponse2), // Example value
      DRMNOCTB: convertResponse(rbdData.RBDResponse3), // Example value
      SLPLMBMV: convertResponse(rbdData.RBDResponse4), // Example value
      SLPINJUR: convertResponse(rbdData.RBDResponse5), // Example value
      DRMVERBL: convertResponse(rbdData.RBDResponse6), // Example value
      DRMFIGHT: convertResponse(rbdData.RBDResponse7), // Example value
      DRMUMV: convertResponse(rbdData.RBDResponse8), // Example value
      DRMOBJFL: convertResponse(rbdData.RBDResponse9), // Example value
      MVAWAKEN: convertResponse(rbdData.RBDResponse10), // Example value
      DRMREMEM: convertResponse(rbdData.RBDResponse11), // Example value
      SLPDSTRB: convertResponse(rbdData.RBDResponse12), // Example value
      STROKE: convertResponse(rbdData.RBDResponse13), // Example value
      HETRA: convertResponse(rbdData.RBDResponse14), // Example value
      PARKISM: convertResponse(rbdData.RBDResponse15), // Example value
      RLS: convertResponse(rbdData.RBDResponse16), // Example value
      NARCLPSY: convertResponse(rbdData.RBDResponse17), // Example value
      DEPRS: convertResponse(rbdData.RBDResponse18), // Example value
      EPILEPSY: convertResponse(rbdData.RBDResponse19), // Example value
      BRNINFM: convertResponse(rbdData.RBDResponse20), // Example value

      DATSCAN: datscanData.Datscan_Result === true ? 1 : 0, // Example value
      DATSCANTRC: 1, // Example value
      SCNLOC: 1, // Example value
      SCNINJCT: 1, // Example value
      DATSCAN_CAUDATE_R: datscanData.caudate_R, // Example value
      DATSCAN_CAUDATE_L: datscanData.caudate_L, // Example value
      DATSCAN_PUTAMEN_R: datscanData.putamen_R, // Example value
      DATSCAN_PUTAMEN_L: datscanData.putamen_L, // Example value
      DATSCAN_PUTAMEN_R_ANT: datscanData.putamen_R_ant, // Example value
      DATSCAN_PUTAMEN_L_ANT: datscanData.putamen_L_ant, // Example value
      DATSCAN_VISINTRP: 1, // Example value
    };

    const predictionResult = await getPrediction(inputData);
    setPrediction(predictionResult);

    setLoading(false);

    setrbd(calculateRbdScore(rbdData));
    setupsit(healthData.UPSIT);
    setresult(datscanData.Datscan_Result);
  };

  useEffect(() => {
    fetchPrediction();
  }, [rbdData, healthData, datscanData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} />
      <FloatButton
        onClick={toggleSidebar}
        icon={<DoubleLeftOutlined />}
        className="side-button"
      />

      {!healthData ? (
        <div
          className="maincontent"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="wide-article" style={{ width: "60%" }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span>
                  It seems like there's no diagnosis data available. <br />
                  Please make sure to fill out all the health data required to
                  initiate the diagnosis process.
                  <br />
                </span>
              }
            />
          </div>
        </div>
      ) : (
        <div className="maincontent diagnosis">
          <h1 className="page-header" style={{ marginLeft: "15px" }}>
            Diagnosis Result
          </h1>
          <div className="wide-article">
            {prediction == 1 ? (
              <h1 className="heading-article">
                Based on your combined results, it is{" "}
                <span style={{ color: "red" }}>highly likely </span> that you
                have Parkinson's Disease
              </h1>
            ) : (
              <h1 className="heading-article">
                Based on your combined results, it is{" "}
                <span style={{ color: "green" }}>unlikely </span> you have
                Parkinson's Disease
              </h1>
            )}
            {Datscanresult == 1 ? (
              <p>
                <span className="diagnosis-title">Positive DaTScan</span> - A
                positive DaTscan suggests evidence of a dopamine transporter
                deficit in the brain. This deficit is often associated with
                neurodegenerative conditions such as Parkinson's disease.
                DaTscan is a nuclear medicine imaging technique that helps
                visualize dopamine transporter levels in specific brain regions.
              </p>
            ) : (
              <p>
                <span className="diagnosis-title">Negative DaTScan</span> - A
                negative DaTscan suggests no evidence of a dopamine transporter
                deficit in the brain. This finding is typically not associated
                with neurodegenerative conditions such as Parkinson's disease.
                DaTscan is a nuclear medicine imaging technique that helps
                visualize dopamine transporter levels in specific brain regions.
              </p>
            )}
            {upsit < 30 ? (
              <p>
                <span className="diagnosis-title">UPSIT Score</span> - A Low
                UPSIT score could indicate a decreased ability to identify
                smells, which has been associated with Parkinson's disease.
                Olfactory dysfunction is a common non-motor symptom in
                Parkinson's.
              </p>
            ) : (
              <p>
                <span className="diagnosis-title">UPSIT Score</span> - A high
                score in the UPSIT test indicates a strong ability to identify
                smells, which generally suggests normal olfactory function.
                Normal olfactory function is less likely to be associated with
                Parkinson's disease, as olfactory dysfunction is a common
                non-motor symptom of the condition.
              </p>
            )}
            {rbd > 10 ? (
              <p>
                <span className="diagnosis-title">RBD Questionnaire</span> - A
                high score on the RBD questionnaire suggests the presence of REM
                Sleep Behavior Disorder (RBD). The presence of RBD has been
                linked to an increased risk of developing Parkinson's disease,
                as RBD is often associated with this neurodegenerative
                condition.
              </p>
            ) : (
              <p>
                <span className="diagnosis-title">RBD Questionnaire</span> - A
                low score on the RBD questionnaire suggests the absence of REM
                Sleep Behavior Disorder (RBD). The absence of RBD is associated
                with a lower risk of developing Parkinson's disease, as RBD has
                been linked to an increased risk of this condition.
              </p>
            )}
            {prediction == 1 ? (
              <p className="dangerous-info">
                We recommend that you consult with a healthcare professional for
                a comprehensive evaluation and personalized advice.
              </p>
            ) : (
              <p className="dangerous-info" style={{ color: "green" }}>
                If you have concerns or symptoms, please consult with a
                healthcare professional for further assessment.
              </p>
            )}
            <a
              href="/appointments"
              className="btn btn-lg"
              style={{
                backgroundColor: "#FF8A15",
                color: "white",
                fontSize: "16px",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              Book a consultation
            </a>
          </div>
          <div
            style={{ display: "flex", marginTop: "25px", marginBottom: "50px" }}
            className="chart-container"
          >
            <div
              style={{ height: "300px", width: "50%", marginLeft: "25px" }}
              className="chart1"
            >
              <h1 className="heading-article">Health Summary</h1>
              <PieChart />
            </div>
            <div style={{ height: "300px", width: "50%" }} className="chart2">
              <h1 className="heading-article chart2-h1">
                DaTScan Visualization
              </h1>
              <BarChart />
            </div>
          </div>
          <div className="wide-article">
            <h1 className="heading-article">
              {" "}
              Learn more about living with Parkinson's Disease
            </h1>
            <p>
              Individuals diagnosed with Parkinson's, as well as their
              caregivers, can benefit from learning about the various symptoms,
              treatment options, and lifestyle strategies that can enhance daily
              functioning. Staying informed about ongoing research, support
              resources, and advancements in Parkinson's care empowers
              individuals to make informed decisions and actively participate in
              their healthcare journey. Additionally, raising awareness about
              Parkinson's disease fosters a supportive community, reduces
              stigma, and encourages collaboration towards finding new therapies
              and potential cures.
            </p>
            <a
              href="https://www.apdaparkinson.org/resources-support/living-with-parkinsons-disease/#:~:text=Once%20you%20are%20diagnosed%20with,in%20select%20cases%2C%20medical%20procedures."
              target="_blank"
              className="btn btn-lg"
              style={{
                backgroundColor: "#FF8A15",
                color: "white",
                fontSize: "16px",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default DiagnosisResult;
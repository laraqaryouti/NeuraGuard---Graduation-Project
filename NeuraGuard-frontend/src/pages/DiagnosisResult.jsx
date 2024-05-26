import { PieChart } from "../components/PieChart";
import { BarChart } from "../components/BarChart";
import Sidebar from "../components/Sidebar";
import api from "../api";
import { FloatButton, Empty, Button } from "antd";
import { DoubleLeftOutlined } from '@ant-design/icons';
import { useState } from "react";
function DiagnosisResult(){
  async function getPrediction(inputData) {
    try {
      const response = await api.post('/predict', { input: inputData });
      console.log(response.data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
    return(<>
    <Sidebar isOpen={isSidebarOpen}/>
    <FloatButton onClick={toggleSidebar} icon={<DoubleLeftOutlined />}  className="side-button" />
    <div className="maincontent diagnosis">
    <h1 className="page-header" style={{ marginLeft: "15px" }}>
         Diagnosis Result
    </h1>
    <div className="wide-article">
        <h1 className="heading-article">Based on your combined results, it is <span style={{color:"red"}}>highly likely </span> that you have Parkinson's Disease</h1>
        <h1 className="heading-article">Based on your combined results, it is <span style={{ color:"green"}}>unlikely </span> you have Parkinson's Disease</h1>
        <p><span className="diagnosis-title">Positive DaTScan</span> - A positive DaTscan suggests evidence of a dopamine transporter deficit in the brain. This deficit is often associated with neurodegenerative conditions such as Parkinson's disease. DaTscan is a nuclear medicine imaging technique that helps visualize dopamine transporter levels in specific brain regions.</p>
        <p><span className="diagnosis-title">Negative DaTScan</span> - A negative DaTscan suggests no evidence of a dopamine transporter deficit in the brain. This finding is typically not associated with neurodegenerative conditions such as Parkinson's disease. DaTscan is a nuclear medicine imaging technique that helps visualize dopamine transporter levels in specific brain regions.</p>
        <p><span className="diagnosis-title">UPSIT Score</span> - A Low UPSIT score could indicate a decreased ability to identify smells, which has been associated with Parkinson's disease. Olfactory dysfunction is a common non-motor symptom in Parkinson's.</p>
        <p><span className="diagnosis-title">UPSIT Score</span> - A high score in the UPSIT test indicates a strong ability to identify smells, which generally suggests normal olfactory function. Normal olfactory function is less likely to be associated with Parkinson's disease, as olfactory dysfunction is a common non-motor symptom of the condition.</p>
        <p><span className="diagnosis-title">RBD Questionnaire</span> - A high score on the RBD questionnaire suggests the presence of REM Sleep Behavior Disorder (RBD). The presence of RBD has been linked to an increased risk of developing Parkinson's disease, as RBD is often associated with this neurodegenerative condition.</p>
        <p><span className="diagnosis-title">RBD Questionnaire</span> - A low score on the RBD questionnaire suggests the absence of REM Sleep Behavior Disorder (RBD). The absence of RBD is associated with a lower risk of developing Parkinson's disease, as RBD has been linked to an increased risk of this condition.</p>
        <p className="dangerous-info">We recommend that you consult with a healthcare professional for a comprehensive evaluation and personalized advice.</p>
        <p className="dangerous-info" style={{color:"green"}}>If you have concerns or symptoms, please consult with a healthcare professional for further assessment.</p>
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
    <div style={{ display: 'flex', marginTop:"25px" , marginBottom:"50px"}} className="chart-container">
      <div style={{ height: '300px', width: '50%', marginLeft: '25px' }} className="chart1">
        <h1 className="heading-article">Health Summary</h1>
        <PieChart />
      </div>
      <div style={{ height: '300px', width: '50%' }} className="chart2">
      <h1 className="heading-article chart2-h1">DaTScan Visualization</h1>
        <BarChart />
      </div>
    </div>
    <div className="wide-article">
        <h1 className="heading-article"> Learn more about living with Parkinson's Disease</h1>
        <p>Individuals diagnosed with Parkinson's, as well as their caregivers, can benefit from learning about the various symptoms, 
            treatment options, and lifestyle strategies that can enhance daily functioning. Staying informed about ongoing research, 
            support resources, and advancements in Parkinson's care empowers individuals to make informed decisions and actively participate in 
            their healthcare journey. Additionally, raising awareness about Parkinson's disease fosters a supportive community, reduces stigma, 
            and encourages collaboration towards finding new therapies and potential cures.
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
    </>)
}
export default DiagnosisResult;
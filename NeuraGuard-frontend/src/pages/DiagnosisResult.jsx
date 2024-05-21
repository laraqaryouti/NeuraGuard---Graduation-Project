import { PieChart } from "../components/PieChart";
import { BarChart } from "../components/BarChart";
import Sidebar from "../components/Sidebar";
import api from "../api"
function DiagnosisResult(){
  async function getPrediction(inputData) {
    try {
      const response = await api.post('/predict', { input: inputData });
      console.log(response.data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  }
  
    return(<>
    
    <Sidebar/>
    <div className="maincontent diagnosis">
    <h1 className="page-header" style={{ marginLeft: "15px" }}>
         Diagnosis Result
    </h1>
    <div className="wide-article">
        <h1 className="heading-article">Based on your combined results, it is <span style={{fontStyle:"italic"}}>highly likely </span> that you have Parkinson's Disease</h1>
        <p><span className="diagnosis-title">Positive DaTScan</span> - A positive DaTscan suggests evidence of a dopamine transporter deficit in the brain. This deficit is often associated with neurodegenerative conditions such as Parkinson's disease. DaTscan is a nuclear medicine imaging technique that helps visualize dopamine transporter levels in specific brain regions.</p>
        <p><span className="diagnosis-title">UPSIT Score</span> - A score of 25/40 could indicate a decreased ability to identify smells, which has been associated with Parkinson's disease. Olfactory dysfunction is a common non-motor symptom in Parkinson's.</p>
        <p><span className="diagnosis-title">RBD Questionnaire</span> - The presence of RBD has been linked to an increased risk of developing Parkinson's disease. A positive indication on the RBD questionnaire suggests the presence of this disorder.</p>
        <p className="dangerous-info">Please consult a health care professional immediately!</p>
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
    <div style={{ display: 'flex', marginTop:"25px" , marginBottom:"50px"}}>
      <div style={{ height: '300px', width: '50%', marginLeft: '25px' }}>
        <h1 className="heading-article">Health Summary</h1>
        <PieChart />
      </div>
      <div style={{ height: '300px', width: '50%' }}>
      <h1 className="heading-article">DaTScan Visualization</h1>
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
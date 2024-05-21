import NavBar from "../components/Navbar";
import "../styling/index.css"
function Index() {
  return (
    <>
    <NavBar/>
      <div className="content">
        <div className="intro">
          <div className="intro-content">
            <h1 className="main-heading">
              Introducing AI in <br /> Parkinson's Detection
            </h1>
            <p className="text">
              Take control of your well-being and join NeuraGuard's <br />
              mission to empower individuals through early detection. <br />
              Sign up now to explore our user-friendly interface, where <br />
              cutting-edge AI technology meets accessible healthcare. <br />
              By enrolling, you gain the opportunity to assess your <br />
              own risk for Parkinson's disease discreetly and efficiently.
            </p>
            <a href="/signup">
              <button className="button">Sign up</button>
            </a>
            <p className="subtext">
              Already have an account?{" "}
              <a href="/signin" className="links">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="about" id="about">
        <div>
        <h1 className="main-heading white">About us</h1>
        <p className="floating">
        NeuraGuard empowers individuals by detecting Parkinson's Disease early through advanced AI and ML analysis of health indicators. Trained on extensive data, including the PPMI database, our platform offers personalized risk assessments and recommendations for early intervention. Additionally, we provide comprehensive support for Parkinson's patients with resources and tools to enhance their well-being.
        This website was created for Parkinson's patients or individuals who suspect they are diagnosed with the disease in order to help them lead a healthy and happy life without feeling restricted by this disease.
       </p>
        </div>
      </div>
      <div className="ppmi" id="ppmi">
        <div className="how">
          <div className="how-content">
      <h1 className="main-heading">How does NeuraGuard work?</h1>
      <p>When you use NeuraGuard, our system analyzes various health indicators, to assess your risk of developing Parkinson's.
      Our AI algorithms have been trained on a vast dataset known as the <a  href="https://www.ppmi-info.org/" target="_blank" className="links">Parkinson's Progression Markers Initiative (PPMI). <br/> </a>
      This dataset contains a wealth of information collected from Parkinson's patients over time, including clinical assessments, imaging data, and biological samples. 
      <span style={{fontStyle:"italic"}}>
      For now, NeuraGuard primarily focuses on analyzing olfactory loss, DaTscan imaging results, and REM sleep behavior disorder (RBD) symptoms to detect potential signs of Parkinson's. <br/>
      </span>
      However, we are continuously improving our algorithms and plan to incorporate additional indicators in the future.
      By comparing your health data to patterns identified in the PPMI dataset, NeuraGuard can provide personalized risk assessments with high accuracy. 
      <br/>This allows for early detection, enabling individuals to take proactive steps towards managing their health and seeking appropriate medical care.
      In addition to its role in powering our detection service, the PPMI dataset also contributes to ongoing research efforts aimed at deepening our understanding of Parkinson's Disease and improving patient outcomes.</p>
      </div>
      </div>
      </div>

      <div className="services" id="services">
        <h1 className="main-heading">Our Services</h1>
        <div className="card-services">
        <div className="row">
  <div className="col-sm-4 mb-3 mb-sm-0">
    <div className="card services1">
      <div className="card-body">
        <h5 className="card-title">Parkinson Detection Service</h5>
        <p className="card-text">NeuraGuard's detection service utilizes AI and ML techniques to detect potential signs of Parkinson's Disease at an early stage focusing on nonmotor symptoms.
         By analyzing various health indicators, including Datscan imaging results, olfactory loss (specifically through the UPSIT test), 
         and REM sleep behavior disorder (RBD) questionnaire responses, our platform provides personalized risk assessments.</p>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card services1">
      <div className="card-body">
        <h5 className="card-title">Appointment Booking</h5>
        <p className="card-text">NeuraGuard facilitates easy appointment booking with experienced doctors specializing in Parkinson's Disease and related therapies. Our platform streamlines the process, allowing users to schedule appointments with qualified professionals who can provide personalized treatment plans and guidance tailored to their specific needs.</p>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card services1">
      <div className="card-body">
        <h5 className="card-title">Disease Progression and Symptom Tracking</h5>
        <p className="card-text">NeuraGuard's tracking service enables users to monitor the progression of Parkinson's Disease and track their symptoms over time. By logging symptoms and health data regularly, individuals can gain valuable insights into their condition and collaborate more effectively with healthcare providers to adjust treatment plans and improve disease management strategies.</p>
      </div>
    </div>
  </div>
</div>
</div>
      </div>
      <footer className="footer" id="contact">
        <h1 id="logo">NeuraGuard</h1>
        <p>Contact us via</p>
        
        <p><img src="src\assets\icons\white-phone-call .png" height="15" width="15" style={{marginRight:"8px"}}/>+1 234 5678</p>
        <p><img src="src\assets\icons\white-mail.png" height="15" width="15" style={{marginRight:"8px"}}/>NeuraGuard@example.com</p>
      </footer>
    </>
  );
}
export default Index;

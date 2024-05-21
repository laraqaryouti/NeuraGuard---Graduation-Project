import { Link } from "react-router-dom";

function HealthNav() {
    return (
      <>
        <ul className="nav justify-content-center healthnav">
          <li className="nav-item">
            <Link to="/healthdata" className="nav-link healthnav-items">Olfactory Loss</Link>
          </li>
          <li className="nav-item">
            <Link to="/rbdquestionnaire" className="nav-link healthnav-items">RBD Questionnaire</Link>
          </li>
          <li className="nav-item">
            <Link to="/datspect" className="nav-link healthnav-items">DATSPECT</Link>
          </li>
        </ul>
      </>
    );
  }
  export default HealthNav;
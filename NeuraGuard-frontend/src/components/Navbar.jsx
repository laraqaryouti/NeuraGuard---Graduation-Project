import "../styling/navbar.css"
function NavBar() {
    return (
      <>
        <nav className="navbar navbar-expand-lg nav-bar">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse menu-items" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#ppmi">
                    PPMI
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#services">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#contact">Contact</a>
                </li>
              </ul>
            </div>
            <a href="/" className="navbar-brand d-flex" id="webname">
              NeuraGuard
            </a>
          </div>
        </nav>
      </>
    );
  }
  
  export default NavBar;
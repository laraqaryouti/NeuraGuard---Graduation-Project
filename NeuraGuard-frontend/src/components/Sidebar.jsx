import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../api"; 

function Sidebar({isOpen}) {
  const [authToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [userID, setuserID] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null); 
  const [logoutHovered, setLogoutHovered] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null); 
  useEffect(() => {
    if (!authToken) {
      navigate("/signin");
    } else {
      fetchData();
    }
  }, [authToken, navigate]);

  const { logout } = useAuth();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setuserID(response.data.User.user_id);
      setfirstname(response.data.User.fname);
      setlastname(response.data.User.lname);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  const icons = [
    { id: 1, img: "src/assets/icons/dashboard.png" },
    { id: 2, img: "src/assets/icons/calendar.png" },
    { id: 3, img: "src/assets/icons/heartbeat.png" },
    { id: 4, img: "src/assets/icons/medical-result.png" },
    { id: 5, img: "src/assets/icons/chat.png" },
    { id: 6, img: "src/assets/icons/settings.png" },
    { id: 7, img: "src/assets/icons/help-web-button.png" },
  ];
  const picons = [
    { id: 1, imgs: "src/assets/icons/passive-dashboard.png" },
    { id: 2, imgs: "src/assets/icons/passive-calendar.png" },
    { id: 3, imgs: "src/assets/icons/passive-heartbeat.png" },
    { id: 4, imgs: "src/assets/icons/passive-medical-result.png" },
    { id: 5, imgs: "src/assets/icons/passive-chat.png" },
    { id: 6, imgs: "src/assets/icons/passive-settings.png" },
    { id: 7, imgs: "src/assets/icons/passive-help-web-button.png" },
  ];
  const paths = [
    "/dashboard",
    "/appointments",
    "/healthdata",
    "/diagnosisResult",
    "/error",
    "/error",
    "/help&support",
    "/signin",
  ];
  const labels = [
    "Dashboard",
    "Appointments",
    "Health Data",
    "Diagnosis Result",
    "Messages",
    "Settings",
    "Help",
    "Log out",
  ];

  const handleLogoutHover = (isHovered) => {
    setLogoutHovered(isHovered);
  };

  const handleIconHover = (index) => {
    setHoveredIndex(index);
  };

  const handleIconClick = (index) => {
    setClickedIndex(index);
  };

  return (
    <div className="App">
      <div div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h1 className="sidebar-title">NeuraGuard</h1>
        <div className="pp">
          {isLoading ? (
            <div
              className="loading-skeleton"
              style={{ width: "100%", height: "100%" }}
            ></div>
          ) : (
            <img
              loading="eager"
              src={"/src/assets/profile-pic.jpg"} 
              alt="Profile Picture"
              className="pp"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                margin: "0",
                padding: "0",
              }}
            />
          )}
        </div>
        <div className="personal-info">
          {isLoading ? (
            <div
              className="loading-skeleton"
              style={{ width: "80%", height: "20px", marginBottom: "10px" }}
            ></div>
          ) : (
            <p id="name">
              {firstname} {lastname}
            </p>
          )}
          <p id="view-profile">
            <NavLink to="/viewprofile" id="view-profile">
              View Profile
            </NavLink>
          </p>
        </div>
        <div className="main-nav-items">
          <ul>
            {icons.slice(0, 5).map((icon, index) => (
              <div key={icon.id}>
                <li
                  onMouseOver={() => handleIconHover(index)}
                  onMouseOut={() => handleIconHover(null)}
                >
                  <NavLink
                    to={paths[index]}
                    activeClassName="active"
                    className="items"
                    onClick={() => handleIconClick(index)}
                  >
                    <img
                      src={
                        index === hoveredIndex || index === clickedIndex
                          ? `${icon.img}`
                          : `${picons[index].imgs}`
                      }
                      alt={`Icon ${icon.id}`}
                      height="15"
                      width="15"
                    />
                    <span style={{ paddingLeft: "15px" }}>{labels[index]}</span>
                  </NavLink>
                </li>
              </div>
            ))}
            <div style={{ height: "15vh" }}></div>
            <div className="items-2">
              {icons.slice(-2).map((icon, index) => (
                <div key={icon.id + 5}>
                  <li
                    onMouseOver={() => handleIconHover(index + 5)}
                    onMouseOut={() => handleIconHover(null)}
                  >
                    <NavLink
                      to={paths[index + 5]}
                      activeClassName="active"
                      className="items"
                      onClick={() => handleIconClick(index + 5)}
                    >
                      <img
                        src={
                          index + 5 === hoveredIndex ||
                          index + 5 === clickedIndex
                            ? `${icon.img}`
                            : `${picons[index + 5].imgs}`
                        }
                        alt={`Icon ${icon.id + 5}`}
                        height="15"
                        width="15"
                      />
                      <span style={{ paddingLeft: "15px" }}>
                        {labels[index + 5]}
                      </span>
                    </NavLink>
                  </li>
                </div>
              ))}
              <li
                onMouseOver={() => handleLogoutHover(true)}
                onMouseOut={() => handleLogoutHover(false)}
                onClick={logout}
                style={{ marginLeft: "5px" }}
              >
                <img
                  src={
                    logoutHovered
                      ? "src/assets/icons/logout.png"
                      : "src/assets/icons/passive-logout.png"
                  }
                  height="15"
                  width="15"
                />
                <span style={{ paddingLeft: "15px" }}>Log out</span>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

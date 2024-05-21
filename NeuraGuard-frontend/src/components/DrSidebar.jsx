import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import api from "../api"; 

function Sidebar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [logoutHovered, setLogoutHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setuserID] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");

  const icons = [
    { id: 1, img: "src/assets/icons/dashboard.png" },
    { id: 2, img: "src/assets/icons/calendar.png" },
    { id: 3, img: "src/assets/icons/patient.png" },
    { id: 4, img: "src/assets/icons/chat.png" },
    { id: 5, img: "src/assets/icons/settings.png" },
    { id: 6, img: "src/assets/icons/help-web-button.png" },
  ];
  const picons = [
    { id: 1, imgs: "src/assets/icons/passive-dashboard.png" },
    { id: 2, imgs: "src/assets/icons/passive-calendar.png" },
    { id: 3, imgs: "src/assets/icons/passive-patient.png" },
    { id: 4, imgs: "src/assets/icons/passive-chat.png" },
    { id: 5, imgs: "src/assets/icons/passive-settings.png" },
    { id: 6, imgs: "src/assets/icons/passive-help-web-button.png" },
  ];
  const paths = [
    "/dashboard-dr",
    "/manageappointments",
    "/patients",
    "/error",
    "/error",
    "/error",
    "/signin",
  ];
  const labels = [
    "Dashboard",
    "Appointments",
    "Patients",
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

  useEffect(() => {
    fetchData();
  }, [userID]);

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
      setIsLoading(false); // Data is loaded
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <div className="sidebar open">
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
              src={"src/assets/doctor-portrait.jpg"} // Assuming you have a placeholder image
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
              Dr. {firstname} {lastname}
            </p>
          )}
          <p id="view-profile">
            <NavLink to="/doctor-profile" id="view-profile">
              View Profile
            </NavLink>
          </p>
        </div>
        <div className="main-nav-items ">
          <ul>
            {icons.slice(0, 4).map((icon, index) => (
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
              {icons.slice(4, 7).map((icon, index) => (
                <div key={icon.id + 4}>
                  <li
                    onMouseOver={() => handleIconHover(index + 4)}
                    onMouseOut={() => handleIconHover(null)}
                  >
                    <NavLink
                      to={paths[index + 4]}
                      activeClassName="active"
                      className="items"
                      onClick={() => handleIconClick(index + 4)}
                    >
                      <img
                        src={
                          index + 4 === hoveredIndex ||
                          index + 4 === clickedIndex
                            ? `${icon.img}`
                            : `${picons[index + 4].imgs}`
                        }
                        alt={`Icon ${icon.id + 4}`}
                        height="15"
                        width="15"
                      />
                      <span style={{ paddingLeft: "15px" }}>
                        {labels[index + 4]}
                      </span>
                    </NavLink>
                  </li>
                </div>
              ))}
               <li
                onMouseOver={() => handleLogoutHover(true)}
                onMouseOut={() => handleLogoutHover(false)}
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

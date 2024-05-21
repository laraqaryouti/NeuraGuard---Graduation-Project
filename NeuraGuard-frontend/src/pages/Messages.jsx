import Sidebar from "../components/Sidebar";
function Messaging() {
  return (
    <>
      <Sidebar />
      <div className="maincontent messagecontent">
        <div className="top-bar">
          <div className="col-lg-3 recentmsg ">
            <div style={{position:"relative"}}>
              {" "}
              <h1 className="page-header msg-header">
                Recent Messages{" "}
                <img
                  src="src\assets\icons\add.png"
                  alt="Add"
                  height="15"
                  width="15"
                  style={{position:"absolute", right:"0", marginRight:"10px" , marginTop:"5px"}}
                />
              </h1>
              <div className="search-bar">
                <img
                  src="src\assets\icons\search.png"
                  alt="Search"
                  height="15"
                  width="15"
                  style={{ marginRight: "5px" }}
                />
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="list-group list-chats list-group-flush">
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action custom-list-item"
                aria-current="true"
              >
                <div className="pfp"></div>
                <div className="msg">
                  <h6 className="name">Full Name</h6>
                  <h6 className="msg-content">Message Content</h6>
                </div>
              </a>
            </div>
          </div>
          <div className="col-lg-9 msgcontent">
            <h1 className="page-header msg-header">Message Content</h1>
            <div style={{ overflowY: "scroll", height: "80vh" }}>
              <h1>testing</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                maxime doloribus magni harum? Quas omnis quam consequatur totam,
                debitis reprehenderit deleniti cum architecto dolorem ullam
                dolores qui. Magnam, temporibus tempore.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                maxime doloribus magni harum? Quas omnis quam consequatur totam,
                debitis reprehenderit deleniti cum architecto dolorem ullam
                dolores qui. Magnam, temporibus tempore.
              </p>
            </div>
            <div className="send-msg">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type message..."
                />
                <button className="btn btn-outline-secondary" type="button">
                  <img
                    src="src\assets\icons\paper-clip.png"
                    height={20}
                    width={20}
                  />
                </button>
                <button className="btn btn-outline-secondary" type="button">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Messaging;

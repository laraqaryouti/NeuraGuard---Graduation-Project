import React, { useState } from "react";
import { message, Modal } from "antd";
import NavBar from "../components/Navbar";
import "../styling/signin.css";
import api from "../api";
import { loginUser } from "../AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function SignIn() {
  const [credentials, setCredentials] = useState({
    Username: "",
    Password: "",
  });

  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const userData = {
      username: credentials.Username,
      password: credentials.Password,
    };

    try {
      const token = await loginUser(userData);
      if (token) {
        login(token);

        if (credentials.Username.length === 8) {
          navigate("/dashboard");
        } else {
          navigate("/dashboard-dr");
        }
      } else {
        message.error("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      message.error("Incorrect Username or Password.");
    }
    setCredentials({
      Username: "",
      Password: "",
    });
  };

  const handleForgetPasswordClick = () => {
    setOpenModal(true);
  };

  const handleModalOk = async () => {
    setConfirmLoading(true);
    try {
      await api.post('/reset-password/', { email });
      message.success("New Password is Sent!");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      message.error("Error in resetting password.")
    } finally {
      setConfirmLoading(false);
      setOpenModal(false);
    }
  };

  const handleModalCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <NavBar />
      <div className="content signin">
        <div className="signin-form">
          <form onSubmit={handleSubmit}>
            <h1 className="main-heading">Welcome Back!</h1>
            <label className="labels">Enter Username</label>
            <br />
            <input
              type="text"
              className="form-control inputs"
              id="Username"
              placeholder="john.smith@example.com"
              name="Username"
              value={credentials.Username}
              onChange={handleChange}
              required
            />
            <br />
            <label className="labels">Enter Password</label>
            <br />
            <input
              type="text"
              className="form-control inputs"
              id="Password"
              placeholder="**************"
              name="Password"
              value={credentials.Password}
              onChange={handleChange}
              required
              style={{ WebkitTextSecurity: "disc" }}
            />
            <a
              style={{
                fontSize: "13px",
                color: "blue",
              }}
              href="#"
              onClick={handleForgetPasswordClick}
            >
              Forget Password?
            </a>
            {error && (
              <div style={{ fontSize: "13px", color: "red" }}>{error}</div>
            )}
            <br />
            <button className="button" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
      <Modal
        title="Forgot Password"
        visible={openModal}
        onOk={handleModalOk}
        confirmLoading={confirmLoading}
        onCancel={handleModalCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{
          style: { backgroundColor: "#FF8A15", borderColor: "#FF8A15" },
        }}
      >
        <p>We will send you an email shortly with your new password.</p>
        <form>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </form>
      </Modal>
    </>
  );
}

export default SignIn;

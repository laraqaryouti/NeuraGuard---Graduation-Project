import NavBar from "../components/Navbar";
import "../styling/signup.css";
import React, { useState } from "react";
import { signupUser } from "../AuthService";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function SignUp() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Username: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
    Address: "",
    Gender: "",
    DateOfBirth: "",
    Status: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const validateForm = () => {
    const usernameRegex = /^\d{8}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?(\d{1,4})?[-.]?(\(?\d{1,4}\)?)?[-.]?\d{1,4}[-.]?\d{1,4}[-.]?\d{1,9}$/;

    if (!usernameRegex.test(formData.Username)) {
      message.warning("Username must be exactly 8 digits.")
      return false;
    }

    if (!emailRegex.test(formData.Email)) {
      message.warning("Please Enter a Valid Email Address.")
      return false;
    }

    if (!phoneRegex.test(formData.PhoneNumber)) {
      message.warning("Please Enter a Valid Phone Number.")
      return false;
    }

    if (formData.Password !== confirmPassword) {
      message.error("Passwords do not match!")
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      fname: formData.FirstName,
      lname: formData.LastName,
      number: formData.PhoneNumber,
      DOB: formData.DateOfBirth,
      email: formData.Email,
      gender: formData.Gender,
      address: formData.Address,
      username: formData.Username,
      password: formData.Password,
      status: formData.Status,
    };

    try {
      const result = await signupUser(userData);
      navigate("/signin");
      if (result) {
        console.log("User created successfully!", result);
      }
    } catch (error) {
      console.error("There was a problem creating the user:", error);
    }

    setFormData({
      FirstName: "",
      LastName: "",
      Username: "",
      Email: "",
      Password: "",
      PhoneNumber: "",
      Address: "",
      Gender: "",
      DateOfBirth: "",
      Status: "",
    });
    setConfirmPassword("");
  };

  return (
    <>
      <NavBar />
      <div className="signup">
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <h1 className="main-heading">Create Account</h1>
            <div className="row mb-3">
              <div className="col">
                <label className="labels">First Name</label>
                <input
                  type="text"
                  className="form-control inputs"
                  placeholder="John"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="labels">Last Name</label>
                <input
                  type="text"
                  className="form-control inputs"
                  placeholder="Smith"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="labels">Username</label>
              <input
                type="text"
                className="form-control inputs"
                placeholder="@JohnSmith"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="labels">Email</label>
              <input
                type="email"
                className="form-control inputs"
                placeholder="john.smith@gmail.com"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="labels">Password</label>
              <input
                type="text"
                className="form-control inputs"
                placeholder="**************"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
                style={{ WebkitTextSecurity: "disc" }}
              />
            </div>
            <div className="mb-3">
              <label className="labels">Re-enter Password</label>
              <input
                type="text"
                className="form-control inputs"
                placeholder="**************"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                style={{ WebkitTextSecurity: "disc" }}
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <label className="labels">Phone Number</label>
                <input
                  type="text"
                  className="form-control inputs"
                  placeholder="+1 123-456-7890"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="labels">Gender</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{ height: "50px" }}
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Choose Gender
                  </option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label className="labels">Date of Birth</label>
                <input
                  type="date"
                  className="form-control inputs"
                  placeholder="**************"
                  name="DateOfBirth"
                  value={formData.DateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label className="labels">Status</label>
                <select
                  className="form-select"
                  style={{ height: "50px" }}
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Are you diagnosed with PD?
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="labels">Address</label>
              <textarea
                className="form-control inputs"
                placeholder="Enter your Address"
                style={{ height: "100px" }}
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                defaultChecked
                required
              />
              <label>I Agree to Terms and Conditions</label>
              <p style={{ fontSize: "13px", textAlign: "justify" }}>
                Thank you for choosing to sign up with us. By signing up, you
                agree that we may collect and process personal information you
                provide for the purpose of improving our Parkinson's disease
                detection algorithms and providing personalized recommendations.
                We take your privacy seriously and adhere to strict data
                protection standards. We will not share your personal
                information with third parties without your consent. You have
                the right to access, correct, or delete your data at any time.
                If you have any questions or concerns about how we use your
                data, please contact us at{" "}
                <span className="links">NeuraGuard@example.com.</span>
              </p>
              <button
                className="button"
                style={{
                  backgroundColor: "#FF8A15",
                  color: "white",
                  fontSize: "16px",
                  padding: "10px 20px",
                  marginTop: "5px",
                }}
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
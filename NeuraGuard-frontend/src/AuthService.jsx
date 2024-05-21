import api from "./api";

export async function loginUser(credentials) {
  const formBody = new URLSearchParams();
  formBody.append("username", credentials.username);
  formBody.append("password", credentials.password);

  try {
    const response = await api.post("/auth/token", formBody.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (!response.data.access_token) {
      throw new Error(response.data.detail || "Authentication failed");
    }
    localStorage.setItem("token", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Login failed:",
      error.response?.data?.detail || error.message
    );
    throw new Error(error.response?.data?.detail || "Authentication failed");
  }
}

export async function signupUser(userData) {
  try {
    const response = await api.post("/auth/", userData);
    console.log("Signup successful", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error.response.data.detail);
    alert(error.response.data.detail);
    return null;
  }
}

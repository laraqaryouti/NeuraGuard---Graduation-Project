import api from "./api";

export const getPrediction = async (inputData) => {
  try {
    const response = await api.post("/predict", inputData);
    return response.data.prediction;
  } catch (error) {
    console.error("Error getting prediction:", error);
    throw error;
  }
};

import axios from "axios";
const API_BASE_URL = "http://localhost:8000";

export const analyzeText = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze`, { 
        text: text
    });
    return response.data;
    } catch (error) {
    console.error("Error analyzing text:", error);
    throw error;
  }
};

export const checkHealth = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/health`);
        return response.data;
    } catch (error) {
        console.error("Backend not responding", error);
        return null;
    }
};
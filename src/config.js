import axios from "axios";
const token = JSON.parse(localStorage.getItem("user")) || "dummytest";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Authorization: `Bearer ${token.jwtToken}`,
  },
});

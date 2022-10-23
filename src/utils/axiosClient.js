import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://breakingbadapi.com/api/",
  timeout: 8000,
});

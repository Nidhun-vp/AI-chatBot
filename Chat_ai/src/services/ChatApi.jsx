
import axios from "axios";

export const sendMessage = (input) => {
  // The key must be "message" to match ChatRoutes.js: const { message } = req.body;
  return axios.post("http://localhost:5000/api/chat", { message: input });
};
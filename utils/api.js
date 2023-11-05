import axios from "axios";
import queryString from 'query-string';
import { CLIENT_ID, CLIENT_SECRET } from "@env";


const API_BASE_URL = "https://api.intra.42.fr/";

const createApiClient = (token) => {
  const defaultHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: defaultHeaders,
  });

  return apiClient;
};

export const fetchAccessToken = async () => {
  try {
    const credentials = {
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    };

    const response = await createApiClient().post("/oauth/token", queryString.stringify(credentials));
    return response.data.access_token;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkTokenValidity = async (token) => {
  try {
    const response = await createApiClient(token).get("/oauth/token/info");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserInformation = async (login, token) => {
  try {
    const response = await createApiClient(token).get(`/v2/users/${login}`);
    return { status: "success", data: response.data };
  } catch (error) {
    if (error.response.status === 404) {
      return { status: "failure", message: "User not found" };
    } else {
      return { status: "failure", message: "Error" };
    }
  }
};

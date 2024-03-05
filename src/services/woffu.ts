import axios from "axios";
import qs from "qs";
import config from "../config";
import { AuthResponse, TrackTimeResponse } from "./woffu-api.model";

export const authenticate = async () => {
  const data = qs.stringify({
    grant_type: 'password',
    username: config.USERNAME,
    password: config.PASSWORD,
  });
  const requestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://app.woffu.com/token',
    headers: { 
      'Accept': 'application/json, text/plain, */*', 
      'Origin': 'https://app.woffu.com', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  const response = await axios.request<AuthResponse>(requestConfig);
  return response.data;
};

export const trackTime = async (token: string) => {
  const data = JSON.stringify({
    "agreementEventId": null,
    "requestId": null,
    "deviceId": "WebApp",
    "latitude": null,
    "longitude": null,
    "timezoneOffset": -60
  });
  
  let requestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: config.TRACK_TIME,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`,
    },
    data,
  };
  
  return axios.request<TrackTimeResponse>(requestConfig)
};
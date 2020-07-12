import axios from "axios";
import { LOCAL_NETWORK_ADRESS } from "../constants/ipAddress";
import { endpointWithParams } from "../utils/endpoint";

export const fetchAllActivies = async () => {
  console.log("FETCH")
  const response = await axios.get(`${LOCAL_NETWORK_ADRESS}api/activity`);
  console.log("END FETCH", LOCAL_NETWORK_ADRESS)

  return response.data;
};

export const deleteActivity = async (activityId) => {
  const endpoint = endpointWithParams(`api/activity/:activityId`, {
    activityId
  });
  const response = await axios.delete(`${LOCAL_NETWORK_ADRESS}${endpoint}`);
  return response.data;
};
export const createActivity = async (name) => {
  const response = await axios.post(`${LOCAL_NETWORK_ADRESS}api/activity`,{name: name, duration: "0", finished: false });
  return response.data;
};
export const updateActivity = async (id, name, duration) => {
  const endpoint = endpointWithParams(`api/activity/:activityId`, {activityId:
    id
  });
  const response = await axios.put(`${LOCAL_NETWORK_ADRESS}${endpoint}`,{name: name, duration: duration.toString() });
  return response.data;
};


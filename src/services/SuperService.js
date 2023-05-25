import axios from "axios";
import store from "../store";

const baseURL = "http://localhost:3006/api/v1/super/admins/";

export const getAdminsRequests = async () => {
  console.log("getAdminsRequests");
  const state = store.getState().CourseReducer1;
  try {
    let response = await axios.get(`${baseURL}approval`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    console.log("------------------->", response.data.data);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Connection Refused");
  }
};

export const grantAdminRequest = async (adminEmail) => {
  console.log("getAdminsRequests");
  const state = store.getState().CourseReducer1;
  try {
    let response = await axios.put(`${baseURL}grant/${adminEmail}`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    console.log("------------------->", response);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Connection Refused");
  }
};

//==============================

export const getAdminsRequestsRejection = async () => {
  console.log("getAdminsRequestsRejection");
  const state = store.getState().CourseReducer1;
  try {
    let response = await axios.get(`${baseURL}rejection`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    console.log("------------------->", response.data.data);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Connection Refused");
  }
};

export const grantAdminRequestRejection = async (adminEmail) => {
  console.log("getAdminsRequestsRejection");
  const state = store.getState().CourseReducer1;
  try {
    let response = await axios.put(`${baseURL}remove/${adminEmail}`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    console.log("------------------->", response);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Connection Refused");
  }
};

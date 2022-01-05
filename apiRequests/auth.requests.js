import apiBaseUrl from "../utils/BASEURL";
import axios from "axios";

export async function getUser(uid) {
  try {
    const response = await axios({
      baseURL: apiBaseUrl,
      method: "GET",
      url: `/auth/${uid}`,
    });
    if (response?.data?.success) {
      return response.data.data;
    } else return null;
  } catch (err) {
    console.log(err);
  }
}

export async function addStudent(data) {
  try {
    const response = await axios({
      baseURL: apiBaseUrl,
      method: "POST",
      url: "/student",
      data: data,
    });

    if (response?.data) {
      return response.data.success;
    } else return null;
  } catch (err) {
    console.log(err);
  }
}

export async function addTeacher(data) {
  try {
    const response = await axios({
      baseURL: apiBaseUrl,
      method: "POST",
      url: "/teacher",
      data: data,
    });

    if (response?.data) {
      return response.data.success;
    } else return null;
  } catch (err) {
    console.log(err);
  }
}

export async function addParent(data) {
  try {
    const response = await axios({
      baseURL: apiBaseUrl,
      method: "POST",
      url: "/parent",
      data: data,
    });

    if (response?.data) {
      return response.data.success;
    } else return null;
  } catch (err) {
    console.log(err);
  }
}

export async function addAdmin(data) {
  try {
    const response = await axios({
      baseURL: apiBaseUrl,
      method: "POST",
      url: "/admin",
      data: data,
    });

    if (response?.data) {
      return response.data.success;
    } else return null;
  } catch (err) {
    console.log(err);
  }
}

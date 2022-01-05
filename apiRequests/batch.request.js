import apiBaseUrl from "../utils/BASEURL";
import axios from "axios";

export async function getAllBatch(token) {
  try {
    const response = await axios({
      baseURL: apiBaseUrl,
      method: "GET",
      url: "/batch/all",
      cancelToken: token,
    });
    if (response?.data?.success) {
      return response.data.data;
    } else return null;
  } catch (err) {
    console.log(err);
  }
}

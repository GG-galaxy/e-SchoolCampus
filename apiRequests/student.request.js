import apiBaseUrl from "../utils/BASEURL";
import axios from "axios";

export async function searchStudentByRoll(rollNo, token) {
  if (!rollNo || rollNo === "") return null;

  try {
    const response = await axios({
      baseURL: apiBaseUrl,
      method: "GET",
      url: `/student/search/roll/${rollNo}`,
      cancelToken: token,
    });
    if (response?.data?.success) {
      return response.data.data;
    } else return null;
  } catch (err) {
    console.log(err);
  }
}

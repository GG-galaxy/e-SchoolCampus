import { parse } from "cookie";

export default function extractCookieData(cookie) {
  const parsedCookie = parse(cookie || "");
  const eSchoolUser = parsedCookie?.eSchoolUser;
  let user = null;

  if (eSchoolUser) {
    user = JSON.parse(eSchoolUser);
  }

  return user;
}

import { getUser } from "../apiRequests/auth.requests";
import extractCookieData from "../utils/cookie";
import styles from "../styles/dashboard.module.css";
import { logout } from "../firebase/auth";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function Dashboard({ user }) {
  const router = useRouter();
  const [, , removeCookie] = useCookies([]);
  const userType = user.userType;
  const data = user.data;

  async function logoutOnClickHandler() {
    const res = await logout();
    if (res) {
      removeCookie("eSchoolUser");
      router.replace("/");
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.details}>
          <h3>{data.name}</h3>
          <small>{userType}</small>
          <p>{`Email:  ${data.email}`}</p>
          <p>{`Contact:  ${data.contact}`}</p>
          <p>{`Address:  ${data.address}`}</p>
        </div>
        <div className={styles.buttonRight}>
          <button className={`btn btn-primary`} onClick={logoutOnClickHandler}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;

  const user = extractCookieData(req.headers.cookie);
  const uid = user?.uid;

  if (!uid || uid === "") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // checking if any user with the uid exists in the DB
  const res = await getUser(uid);

  if (res) {
    return {
      props: {
        user: res,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/register",
        permanent: false,
      },
    };
  }
}

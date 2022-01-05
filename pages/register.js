import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import classes from "../styles/register.module.css";
import logo from "../public/images/logo.png";
import { useState } from "react";
import extractCookieData from "../utils/cookie";
import StudentRegister from "../components/register/student.register";
import TeacherRegister from "../components/register/teacher.register";
import AdminRegister from "../components/register/admin.register";
import ParentRegister from "../components/register/parent.register";
import { getUser } from "../apiRequests/auth.requests";
import { useRouter } from "next/router";

export default function Register({ user }) {
  const router = useRouter();
  const [userType, setUserType] = useState();
  const [openRegisterForm, setOpenRegisterForm] = useState(false);

  function onClickHandler(type) {
    setUserType(type);
    setOpenRegisterForm(true);
  }

  function close() {
    router.push("/");
  }

  function closeRegister() {
    setOpenRegisterForm(false);
  }

  function RegisterForm() {
    if (userType === "student")
      return <StudentRegister user={user} close={closeRegister} />;
    else if (userType === "teacher")
      return <TeacherRegister user={user} close={closeRegister} />;
    else if (userType === "parent")
      return <ParentRegister user={user} close={closeRegister} />;
    else if (userType === "admin")
      return <AdminRegister user={user} close={closeRegister} />;
    else return "";
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>e-SchoolCampus</title>
        <meta name="description" content="Online School Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main + " container"}>
        <div className="row">
          <div className={"col-lg-6 " + styles.left}>
            <div className={styles.heading}>
              <div className={styles.logo}>
                <Image src={logo} alt="e-schoolcampus" />
              </div>
              <h2 className={styles.title}>
                Welcome to
                <br />
                e-SchoolCampus!
              </h2>
            </div>

            <p className={styles.description}>
              <br />
              e-SchoolCampus School Management Software brings the best of
              technology to provide 360 degree experience to schools which not
              only improves productivity of administrative staff but improves
              experience and productivity of all the stakeholders- principal,
              management, teachers, administration staff, students and parents.
            </p>
          </div>

          {openRegisterForm ? (
            <>
              <RegisterForm />
            </>
          ) : (
            <div className={"col-lg-6 " + styles.right}>
              <div className={styles.rightInner}>
                <h4 className={styles.rightInnerHeading}>
                  Login to e-SchoolCampus
                </h4>
                <div className={styles.loginOptions}>
                  <p>-- Login as --</p>
                  <div
                    className="bg-success"
                    onClick={() => onClickHandler("student")}
                  >
                    <h6>Student</h6>
                  </div>
                  <div
                    className="bg-info"
                    onClick={() => onClickHandler("teacher")}
                  >
                    <h6>Teacher</h6>
                  </div>
                  <div
                    className="bg-warning"
                    onClick={() => onClickHandler("parent")}
                  >
                    <h6>Parent</h6>
                  </div>
                  <div
                    className="bg-danger"
                    onClick={() => onClickHandler("admin")}
                  >
                    <h6>Admin</h6>
                  </div>
                </div>

                <button
                  type="button"
                  className={"btn btn-outline-danger " + classes.cancelBtn}
                  onClick={close}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
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
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        user: user,
      },
    };
  }
}

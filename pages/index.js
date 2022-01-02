import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../public/images/logo.png";
import { useState } from "react";
import { useCookies } from "react-cookie";
import "../firebase/config";
import { signUpWithEmail, loginInWithEmail } from "../firebase/auth";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [cookie, setCookie] = useCookies([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState(null);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSigupForm, setOpenSignupForm] = useState(false);
  const [message, setMessage] = useState({});

  function onClickHandler(type) {
    setLoginType(type);
    setOpenLoginForm(true);
  }

  function openSigup() {
    setOpenSignupForm(true);
  }

  async function SignUp(e) {
    e.preventDefault();

    const res = await signUpWithEmail(email, password);

    if (res && res?.data) {
      const msg = {
        data: "Sign-up Successfull! Please check your mail for Verification Email!",
        textColor: "text-success",
      };

      const user = { uid: res.data.uid, email: res.data.email };
      console.log("UserData => ", user);

      setMessage(msg);
      setEmail("");
      setPassword("");
    }
  }

  async function logIn(e) {
    e.preventDefault();
    const res = await loginInWithEmail(email, password);
    if (res && res?.data) {
      const user = { uid: res.data.uid, userType: loginType };
      console.log("UserData => ", user);

      setCookie("eSchoolUser", user, { secure: true });

      setEmail("");
      setPassword("");
      setLoginType("");

      router.push("/register");
    }
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
              In today&apos;s time every school around the world needs one or
              other kind of School Management Sytem or which is called as School
              Management. Most of the schools have experienced one or other kind
              of system, however due to limitations of features, product
              experience or customer support problems they end up looking for
              better options.
              <br />
              <br />
              e-SchoolCampus School Management Software brings the best of
              technology to provide 360 degree experience to schools which not
              only improves productivity of administrative staff but improves
              experience and productivity of all the stakeholders- principal,
              management, teachers, administration staff, students and parents.
            </p>
          </div>
          {openSigupForm ? (
            <div className={"col-lg-6 " + styles.right}>
              <div className={styles.rightInner}>
                <h4 className={styles.rightInnerHeading}>
                  Login to e-SchoolCampus
                </h4>
                <div className={styles.messageBox}>
                  <p className={message.textColor + " text-center"}>
                    {message.data}
                  </p>
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={"form-control " + styles.emailTextField}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.passwordTextField + " form-control"}
                      id="Password"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className={styles.loginFormBtns}>
                    <button
                      type="submit"
                      className={
                        "btn btn-outline-primary " + styles.SignupForm_signupBtn
                      }
                      onClick={SignUp}
                    >
                      Sign Up
                    </button>
                    <button
                      type="button"
                      className={"btn btn-outline-danger " + styles.cancelBtn}
                      onClick={() => setOpenSignupForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className={"col-lg-6 " + styles.right}>
              <div className={styles.rightInner}>
                <h4 className={styles.rightInnerHeading}>
                  Login to e-SchoolCampus
                </h4>
                {openLoginForm ? (
                  <form>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={"form-control " + styles.emailTextField}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Password">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={"form-control " + styles.passwordTextField}
                        id="Password"
                        placeholder="Password"
                      />
                    </div>
                    <div className={styles.loginFormBtns}>
                      <button
                        type="submit"
                        className={"btn btn-outline-success " + styles.loginBtn}
                        onClick={logIn}
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        className={"btn btn-outline-danger "}
                        onClick={() => setOpenLoginForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
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
                )}

                <div className={styles.rightInnerBottom}>
                  <small>
                    <a href="#">Forgot Password?</a>
                  </small>
                  <p>-- Don&apos;t have an account? --</p>
                  <button
                    type="button"
                    className={"btn btn-outline-info " + styles.signupBtn}
                    onClick={openSigup}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

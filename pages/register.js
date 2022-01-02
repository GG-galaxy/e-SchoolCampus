import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../public/images/logo.png";
// import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Register() {
  const [cookie, setCookie] = useCookies([]);
//   const user = cookie.get("eSchoolUser");
  console.log(cookie);

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
        </div>
      </main>
    </div>
  );
}

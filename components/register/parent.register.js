import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { searchStudentByRoll } from "../../apiRequests/student.request";
import { addParent } from "../../apiRequests/auth.requests";
import styles from "../../styles/Home.module.css";
import classes from "../../styles/register.module.css";
import tick from "../../public/check-circle-solid.svg";
import axios from "axios";
import Image from "next/image";

export default function ParentRegister({ user, close }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [selectedStudent, setSelectedStudent] = useState({});
  const [students, setStudents] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [showSelected, setShowSelected] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  document.addEventListener("click", function () {
    if (document.activeElement.getAttribute("id") !== "rollNo") {
      setShowSearch(false);
    }
  });

  useEffect(async () => {
    const source = axios.CancelToken.source();
    const res = await searchStudentByRoll(rollNo, source.token);

    if (res) {
      setStudents(res);
    }

    return () => {
      source.cancel();
    };
  }, [rollNo]);

  async function registerHandler(e) {
    e.preventDefault();

    if (
      name === "" ||
      address === "" ||
      contact === "" ||
      selectedStudent === {} ||
      rollNo === ""
    )
      return;

    const data = {
      name,
      address,
      contact,
      id: user.uid,
      email: user.email,
      studentId: selectedStudent.id,
    };

    const res = await addParent(data);

    if (res) {
      router.replace("/dashboard");
    } else {
      alert("Someting went wrong!");
      router.replace("/");
    }
  }

  function searchStudent(e) {
    const value = e.target.value;
    if (value > 0 && value.length < 20) setRollNo(value);
    else setRollNo("");

    if (!showSearch) setShowSearch(true);
  }

  function onClickHandler(student) {
    setSelectedStudent(student);
    setShowSearch(false);
    setShowSelected(true);
  }

  function RenderAllStudents() {
    if (students?.length > 0) {
      return students.map((student, index) => {
        return (
          <div
            key={index.toString()}
            onClick={() => onClickHandler(student)}
            className={classes.studentContainer}
          >
            <p>{student.name}</p>
            <small>{`Roll no.- ${student.rollNo}`}</small>
            <small>{`Batch:  ${student.batch?.name || ""} ${
              student.batch?.session || ""
            }`}</small>
          </div>
        );
      });
    } else {
      return null;
    }
  }

  function SelectedStudentComponent() {
    const student = selectedStudent;
    return (
      <div className={classes.selectedStudentContainer}>
        <p>{student.name}</p>
        <small>{`Roll no.- ${student.rollNo}`}</small>
        <small>{`Batch:  ${student.batch.name} ${student.batch.session}`}</small>
        <div className={classes.tickIcon}>
          <Image src={tick} alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className={"col-lg-6 " + styles.right}>
      <div className={styles.rightInner}>
        <h4 className={styles.rightInnerHeading}>Login to e-SchoolCampus</h4>
        <form>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className={"form-group " + classes.rollNoContainer}>
            <label htmlFor="rollno">Student Roll number : </label>
            <input
              type="number"
              value={rollNo}
              onChange={searchStudent}
              className="form-control"
              id="rollno"
              placeholder="Roll number"
              required
            />

            {showSearch && (
              <div className={classes.studentsContainer}>
                <RenderAllStudents />
              </div>
            )}
          </div>

          {showSelected && <SelectedStudentComponent />}

          <div className="form-group">
            <label htmlFor="Address">Address</label>
            <input
              type="txt"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="Address"
              placeholder="Address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Contact">Contact</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="form-control "
              id="Contact"
              placeholder="Contact"
              required
            />
          </div>

          <div className={styles.loginFormBtns}>
            <button
              type="submit"
              className={
                "btn btn-outline-primary " + styles.SignupForm_signupBtn
              }
              onClick={registerHandler}
            >
              Register
            </button>
            <button
              type="button"
              className={"btn btn-outline-danger " + styles.cancelBtn}
              onClick={close}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

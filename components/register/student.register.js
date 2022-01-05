import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addStudent } from "../../apiRequests/auth.requests";
import { getAllBatch } from "../../apiRequests/batch.request";
import styles from "../../styles/Home.module.css";
import axios from "axios";

export default function StudentRegister({ user, close }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [allBatches, setAllBatches] = useState([]);
  const [batch, setBatch] = useState("");
  const [rollNo, setRollNo] = useState("");

  useEffect(async () => {
    const source = axios.CancelToken.source();
    const res = await getAllBatch(source.token);

    if (res) {
      setAllBatches(res);
    }

    return () => {
      source.cancel();
    };
  }, []);

  async function registerHandler(e) {

    if (rollNo < 1 || rollNo.length > 20) {
      alert("Invalid Roll No.");
      return;
    }

    if (
      name === "" ||
      address === "" ||
      contact === "" ||
      batch === "" ||
      rollNo === ""
    )
      return;

      e.preventDefault();
    
      const data = {
      name,
      address,
      contact,
      batchId: batch,
      rollNo,
      id: user.uid,
      email: user.email,
    };

    const res = await addStudent(data);

    if (res) {
      router.replace("/dashboard");
    } else {
      alert("Someting went wrong!");
      router.replace("/");
    }
  }

  function RenderAllBatchList() {
    if (allBatches?.length > 0) {
      return allBatches.map((item, index) => {
        return (
          <option key={index.toString()} value={item.id}>
            {`${item.name} (${item.session})`}
          </option>
        );
      });
    } else {
      return null;
    }
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
          <div className="form-group">
            <label htmlFor="rollno">Roll number : </label>
            <input
              type="number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="form-control "
              id="rollno"
              placeholder="Roll number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="batch">Select batch : </label>
            <select
              className="form-control"
              id="batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              <RenderAllBatchList />
            </select>
          </div>

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

import { useRouter } from "next/router";
import { useState } from "react";
import { addTeacher } from "../../apiRequests/auth.requests";
import styles from "../../styles/Home.module.css";

export default function TeacherRegister({ user, close }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  async function registerHandler(e) {
    // e.preventDefault();

    const data = {
      name,
      address,
      contact,
      id: user.uid,
      email: user.email,
    };

    const res = await addTeacher(data);
    if (res) {
      router.replace("/dashboard");
    } else {
      alert("Someting went wrong!");
      router.replace("/");
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

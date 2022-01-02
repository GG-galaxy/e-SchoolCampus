import styles from "../../styles/Home.module.css"


export default function StudentRegister(){
    return(
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
                    <label htmlFor="name">Email address</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={"form-control " + styles.emailTextField}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Address">Address</label>
                    <input
                      type="txt"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={styles.passwordTextField}
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
                      className={styles.passwordTextField}
                      className="form-control"
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
    )
}
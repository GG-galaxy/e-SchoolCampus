import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const auth = getAuth();

export const signUpWithEmail = async (email, password) => {
  //Built in firebase function responsible for signing up a user
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res) {
      const user = res.user;
      console.log("Signed Up Successfully!");
      if (sendVerificationEmail()) {
        return { data: user };
      } else {
        return { data: null };
      }
    }
  } catch (err) {
    console.log(err.message);
    let message = err.message.replace("Firebase:", "");
    message = message.trim();
    alert(message);
    return { data: null };
  }
};

const sendVerificationEmail = async () => {
  //Built in firebase function responsible for sending the verification email
  try {
    await sendEmailVerification(auth.currentUser);
    console.log("Verification Email Sent Successfully!");
    return true;
  } catch (e) {
    console.log(err.message);
    let message = err.message.replace("Firebase:", "");
    message = message.trim();
    alert(message);
    return false;
  }
};

//login in function
export const loginInWithEmail = async (email, password) => {
  try {
    //Built in firebase function responsible for authentication
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login result => ", res);
    if (res.user.emailVerified) {
      return { data: res.user };
    } else {
      alert("Please verify your email to login!");
      return { data: null };
    }
  } catch (err) {
    //Something went wrong
    console.log(err.message);
    let message = err.message.replace("Firebase:", "");
    message = message.trim();
    alert(message);
    return { data: null };
  }
};

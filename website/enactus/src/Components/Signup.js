import React, { useState } from "react";
import { auth, db, firebase } from "../Config/Config";
import { Link } from "react-router-dom";
import LoginImg from "../images/login.png";
import GoogleImg from "../images/google.png";

export const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        db.collection("SignedUpUsersData")
          .doc(cred.user.uid)
          .set({
            Name: name,
            Email: email,
            Password: password,
          })
          .then(() => {
            setName("");
            setEmail("");
            setPassword("");
            setError("");
            props.history.push("/login");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  };

  const googleSignup = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .set({
            Name: user.displayName,
            Email: user.email,
          })
          .then(() => {
            props.history.push("/login");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-fields">
          <div className="login-titles">
            <h2 className="login-heading">Sign up</h2>
            <h5 className="login-sub-heading">
              Create an account to get started!
            </h5>
          </div>
          <form autoComplete="off" className="login-form" onSubmit={signup}>
            <input
              type="text"
              className="email-input"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
            />
            <br />
            <input
              type="email"
              className="email-input"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
            />
            <br />
            <input
              type="password"
              className="password-input"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
            />
            <br />
            <button type="submit" className="login-btn">
              SUBMIT
            </button>
          </form>
          <button onClick={googleSignup} className="google-login-btn">
            <img src={GoogleImg} alt="" className="google-login-img" />
            Sign up with Google
          </button>
          {error && <span className="error-msg">{error}</span>}
          <br />
          <span className="register-here-title">
            Already have an account? Login
            <Link to="login" className="register-here">
              {" "}
              Here
            </Link>
          </span>
        </div>
        <div className="login-image">
          <img src={LoginImg} alt="" border="0" className="" />
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import Nav from "../comps/Nav"

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  //Register user with Firebase
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      alert("User created, contact admin to get admin permissions.");
    } catch (err) {
      alert(`An error occured: ${err.message} Please try again.`);
    }
  };

  return (
    <div className="container">
      <Nav />
      <div className="row">
        <div className="register">
          <h3>Register admin</h3>
          <input
            placeholder="E-mail"
            type="email"
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
          />
          <button onClick={register}>Create user</button>
          <p>
            Already have an admin account?{" "}
            <Link to={"/knitchart/admin/login"}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

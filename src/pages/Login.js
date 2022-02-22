import React, { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsAuth, setUser }) => {
  let navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
      let user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      //Login with Admin uid
      if (user.user.uid === "7a80HoWyASe2E57fp7tTBBHgJEy2") {
        setIsAuth(true);
        setUser(user);
        navigate("/knitchart/admin");
      } else {
        navigate("/knitchart");
      }
    } catch (err) {
      alert(`An error occured: ${err.message} Please try again.`);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="login">
          <h3>Log in</h3>
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
          <button onClick={login}>Login</button>
          {/* <p>
            Don't have an admin account?{" "}
            <Link to={"/knitchart/admin/register"}>Sign up</Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;

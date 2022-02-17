import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
//import Login from './pages/Login';
import Create from "./pages/Create";
import { useState } from "react";
import logo from "./img/knitchart-logo.png";
//import {signOut} from 'firebase/auth';
//import { auth } from './firebase-config';
import Admin from "./pages/Admin";
import Wheel from "./comps/Wheel";
import useOutsideClick from "./hooks/useOutsideClick";
//Spinning wheel imgs
import scarf from "./img/scarf.png";
import cardigan from "./img/cardigan.png";
import hat from "./img/hat.png";
import pillow from "./img/pillow.png";
import top from "./img/top.png";
import socks from "./img/socks.png";
import sweater from "./img/sweater.png";
import xmasSweater from "./img/x-sweater.png";
import mittens from "./img/mittens.png";
import blanket from "./img/blanket.png";

const AllRoutes = () => {
  /*const [isAuth, setIsAuth] = useState(false);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/login';
    })
  }*/
  let [isShown, setIsShown] = useState(true);
  const wheelRef = useRef();

  let wheelItems = [
    {
      items: scarf,
      name: "Scarf",
    },
    {
      items: cardigan,
      name: "Cardigan",
    },
    {
      items: hat,
      name: "Hat",
    },
    {
      items: socks,
      name: "Socks",
    },
    {
      items: top,
      name: "Top",
    },
    {
      items: pillow,
      name: "Pillowcase",
    },
    {
      items: sweater,
      name: "Sweater",
    },
    {
      items: mittens,
      name: "Mittens",
    },
    {
      items: blanket,
      name: "Blanket",
    },
    {
      items: xmasSweater,
      name: "Cute xmas sweater",
    },
  ];
  const toggle = (mode, setMode) => {
    setMode(!mode);
  };

  useOutsideClick(wheelRef, () => {
    if (!isShown) {
      setIsShown((isShown) => !isShown);
    }
  });

  return (
    <div>
      <div className="container">
        <div className="row">
          <nav className="col-12">
            <div className="navbar-header header-logo col-lg-5">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="nav align-self-end col-lg-6">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/create" className="nav-link">
                Create a new Chart
              </Link>
              <h3 onClick={() => toggle(isShown, setIsShown)}>
                Knitting Wheel
              </h3>

              {/*  {!isAuth ? <Link to="/login" className="nav-link">Log in</Link> 
                            : <button onClick={signUserOut}>Sign out</button>} */}
            </div>
          </nav>
        </div>
      </div>
      <div
        ref={wheelRef}
        className={isShown ? "inactive nav-wheel" : "active nav-wheel"}
      >
        <button onClick={() => toggle(isShown, setIsShown)}>×</button>
        <h2>Out of knitting ideas? Spin the wheel!</h2>
        <Wheel items={wheelItems} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/login" element={<Login  setIsAuth={setIsAuth}/>}/>*/}
        <Route path="/create" element={<Create />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};
export default AllRoutes;

import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowResize";
import useOutsideClick from "../hooks/useOutsideClick";
import Wheel from "../comps/Wheel";

//Images
import logo from "../img/knitchart-logo.png";
import scarf from "../img/scarf.png";
import cardigan from "../img/cardigan.png";
import hat from "../img/hat.png";
import pillow from "../img/pillow.png";
import top from "../img/top.png";
import socks from "../img/socks.png";
import sweater from "../img/sweater.png";
import xmasSweater from "../img/x-sweater.png";
import mittens from "../img/mittens.png";
import blanket from "../img/blanket.png";

const Nav = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(true);
  const wheelRef = useRef();
  let hamburger = document.querySelector(".hamburger");
  let [isShown, setIsShown] = useState(true);
  let navigate = useNavigate();

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

  //Remove is-active class from hamburger
  const removeIsActive = () => {
    setMenuOpen((menuOpen) => !menuOpen);
    hamburger.classList.remove("is-active");
  };

  //toggle is-active class
  const openMenu = () => {
    if (menuOpen) {
      hamburger.classList.add("is-active");
    }
    if (!menuOpen) {
      hamburger.classList.remove("is-active");
    }
  };

  //Sign out
  const logout = async () => {
    await signOut(auth);
    setIsAuth(false);
    navigate("/knitchart/admin/login");
  };

  //use hooks
  useWindowSize();

  //Close menu if window is resized and width larger than 767px
  if (!menuOpen && window.innerWidth > 767) {
    removeIsActive();
  }

  useOutsideClick(wheelRef, () => {
    if (!isShown) {
      setIsShown((isShown) => !isShown);
    }
  });
  console.log(window.innerWidth)

  //Keep user authenticated
  //UseEffect to render once
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.uid === "7a80HoWyASe2E57fp7tTBBHgJEy2") {
        setUser(currentUser);
        setIsAuth(true);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <div>
        <div className="row">
          <nav className="col-12">
            <div className="navbar-header header-logo col-lg-5">
              <Link to="/knitchart">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            {window.innerWidth > 767 ? (
              <div className="nav align-self-end col-lg-6">
                <Link to="/knitchart" className="nav-link">
                  Home
                </Link>
                <Link to="/knitchart/create" className="nav-link">
                  Create a new Chart
                </Link>
                <h3 onClick={() => toggle(isShown, setIsShown)}>
                  Knitting Wheel
                </h3>
                {isAuth && (
                  <Link
                    className="nav-link"
                    to="knitchart/admin"
                    onClick={() => {
                      removeIsActive();
                    }}
                  >
                    Admin
                  </Link>
                )}
                {isAuth && (
                  <h3
                    onClick={() => {
                      logout();
                    }}
                  >
                    Sign out
                  </h3>
                )}
              </div>
            ) : (
              <div className="align-self-end col-lg-6">
                <button
                  className="hamburger hamburger--collapse"
                  type="button"
                  onClick={() => {
                    toggle(menuOpen, setMenuOpen);
                    openMenu();
                  }}
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
                {!menuOpen && (
                  <div className="mobile-menu">
                    <Link
                      to="/knitchart"
                      className="nav-link"
                      onClick={() => {
                        removeIsActive();
                      }}
                    >
                      Home
                    </Link>
                    <Link
                      to="/knitchart/create"
                      className="nav-link"
                      onClick={() => {
                        removeIsActive();
                      }}
                    >
                      Create a new Chart
                    </Link>
                    <h3
                      onClick={() => {
                        toggle(isShown, setIsShown);
                        removeIsActive();
                      }}
                    >
                      Knitting Wheel
                    </h3>
                    {isAuth && (
                      <Link
                        className="nav-link"
                        to="knitchart/admin"
                        onClick={() => {
                          removeIsActive();
                        }}
                      >
                        Admin
                      </Link>
                    )}
                    {isAuth && (
                      <h3
                        onClick={() => {
                          removeIsActive();
                          logout();
                        }}
                      >
                        Sign out
                      </h3>
                    )}
                  </div>
                )}
              </div>
            )}
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
    </>
  );
};

export default Nav;

import React, { useRef, useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
//Pages
import Create from "./pages/Create";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
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
    <Router>
      <Routes>
        <Route exact path="/knitchart" element={<Home />} />
        <Route exact path="/knitchart/create" element={<Create />} />
        <Route
          exact
          path="/knitchart/admin"
          element={<Admin isAuth={isAuth} />}
        />
        <Route exact path="/knitchart/admin/register" element={<Register />} />
        <Route
          exact
          path="/knitchart/admin/login"
          element={<Login setIsAuth={setIsAuth} setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

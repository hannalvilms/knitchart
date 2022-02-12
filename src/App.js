import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
//import Login from './pages/Login';
import Create from './pages/Create';
import { useState } from 'react';
import logo from './img/knitchart-logo.png';
//import {signOut} from 'firebase/auth';
//import { auth } from './firebase-config';
import Admin from './pages/Admin';
function App() {
  /*const [isAuth, setIsAuth] = useState(false);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/login';
    })
  }*/
  return (
    <Router>
      <div className="container">
        <div className="row">
          <nav className="">
            <div  className="navbar-header header-logo col-lg-5">
              <Link to="/avaleht">
                <img src={logo} alt="logo"/>
              </Link>
            </div>
            <div className="nav align-self-end col-lg-6">
              <Link to="/create" className="nav-link">Create a new Chart</Link>
             {/*  {!isAuth ? <Link to="/login" className="nav-link">Log in</Link> 
                      : <button onClick={signUserOut}>Sign out</button>} */}
            </div>
          </nav>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />}/>
        {/*<Route path="/login" element={<Login  setIsAuth={setIsAuth}/>}/>*/}
        <Route path="/create" element={<Create />}/>
        <Route path="/admin" element={<Admin />}/>
      </Routes>
    </Router>
  );
}

export default App;

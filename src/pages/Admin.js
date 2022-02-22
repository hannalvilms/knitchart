import React from "react";
import ImgGrid from "../comps/ImgGrid";
import Nav from "../comps/Nav";

const Admin = ({ isAuth }) => {
  return (
    <div className="container">
      <Nav />
      <div className="row">
        <div className="col-12">
          {isAuth && (
            <div>
              <ImgGrid admin={"admin"} title={"Add new Chart"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

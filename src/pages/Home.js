import React from "react";
import ImgGrid from "../comps/ImgGrid";
import Footer from "../comps/Footer";
import Nav from "../comps/Nav";

function Home() {
  return (
    <div className="container">
      <Nav />
      <div className="row">
        <div>
          <ImgGrid title="Free Charts" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Home;

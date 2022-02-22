import React from "react";
import ImgGrid from "../comps/ImgGrid";
import Footer from "../comps/Footer";

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div>
          <ImgGrid title="Free Charts" />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
export default Home;

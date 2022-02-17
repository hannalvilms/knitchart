import React, {useState} from 'react';
import ImgGrid from '../comps/ImgGrid';

function Home() {
  return <div className='container'>
      <div className='row'>
      <h1>Free Charts</h1>
      <div>
          <ImgGrid/>
        </div>
      </div>
  </div>;
}
export default Home;

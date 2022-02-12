import React, { useState } from 'react';
import ImgGrid from '../comps/ImgGrid';
import ProgressBar from '../comps/ProgressBar';

function Admin() {
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(null);

  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    console.log(selected)
    if(selected && types.includes(selected.type)) {
      setFile(selected);
      setErr('');
    } else {
      setFile(null);
      setErr('Please select an image file')
    }
  }

  return <div className='container'>
    <div className='row'>
      <div className='row col-12'>
        <form className='col-12'>
          <h1>Add new Chart</h1>
          <input type='file' className='file-input' onChange={changeHandler}/>
          {err && <div>{err}</div>}
          {file && <div>{ file.name }</div>}
        </form>
        {file && <ProgressBar file={file} setFile={setFile}/>}
        <div>
          <ImgGrid/>
        </div>
      </div>
    </div>
  </div>;
} 

export default Admin;

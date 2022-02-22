import React, { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { projectFirestore } from "../firebase-config";
import ProgressBar from "../comps/ProgressBar";
import { useWindowSize } from "../hooks/useWindowResize";

const ImgGrid = (props) => {
  const { docs } = useFirestore("images");
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  let firstMasonry;
  let secondMasonry;

  useWindowSize();

  //Check uploaded file type
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setErr("");
    } else {
      setErr("Please select an image file");
    }
  };

  //Delete file from firestore
  function deleteFromFS(file) {
    projectFirestore
      .collection("images")
      .doc(file)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        alert("Error removing document: ", error);
      });
  }

  //Calculate halved masonry lenghts
  if ((docs.length / 2) % 0 === 0) {
    firstMasonry = docs.length / 2;
    secondMasonry = -(docs.length / 2);
  } else if ((docs.length / 2) % 0.5 === 0) {
    firstMasonry = docs.length / 2 + 2;
    secondMasonry = -(docs.length / 2 - 1.5);
  }

  return (
    <div className="masonry-container">
      {window.innerWidth > 767 ? (
        <>
          <div className="title-masonry">
            <h1>{props.title}</h1>
            {props.admin && (
              <form className="col-12">
                <input
                  type="file"
                  className="file-input"
                  onChange={changeHandler}
                />
                {err && <div>{err}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
              </form>
            )}
            <div className="masonry-wrapper">
              {docs &&
                docs.slice(firstMasonry).map((doc) => (
                  <div className="img-wrap masonry-item" key={doc.id}>
                    <a href={doc.url} target="_blank" rel="noreferrer">
                      <img
                        src={doc.url}
                        className="masonry-content"
                        alt="uploaded pic"
                      />
                    </a>
                    {props.admin && (
                      <button
                        className="delete-button"
                        onClick={() => {
                          deleteFromFS(doc.id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="masonry-wrapper second-masonry">
            {docs &&
              docs.slice(0, secondMasonry).map((doc) => (
                <div className="img-wrap masonry-item" key={doc.id}>
                  <a href={doc.url} target="_blank" rel="noreferrer">
                    <img
                      src={doc.url}
                      className="masonry-content"
                      alt="uploaded pic"
                    />
                  </a>
                  {props.admin && (
                    <button
                      className="delete-button"
                      onClick={() => {
                        deleteFromFS(doc.id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="title-masonry">
          <h1>{props.title}</h1>
          {props.admin && (
            <form className="col-12">
              <input
                type="file"
                className="file-input"
                onChange={changeHandler}
              />
              {err && <div>{err}</div>}
              {file && <div>{file.name}</div>}
              {file && <ProgressBar file={file} setFile={setFile} />}
            </form>
          )}
          <div className="masonry-wrapper">
            {docs &&
              docs.map((doc) => (
                <div className="img-wrap masonry-item" key={doc.id}>
                  <a href={doc.url} target="_blank" rel="noreferrer">
                    <img
                      src={doc.url}
                      className="masonry-content"
                      alt="uploaded pic"
                    />
                  </a>
                  {props.admin && (
                    <button
                      className="delete-button"
                      onClick={() => {
                        deleteFromFS(doc.id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgGrid;

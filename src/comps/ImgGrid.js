import React, { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { projectFirestore } from "../firebase-config";
import { useHref } from "react-router-dom";
const ImgGrid = (props) => {
  function deleteFromFS(file) {
    console.log(file);

    projectFirestore
      .collection("images")
      .doc(file)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  const { docs } = useFirestore("images");
  console.log((docs.length / 2) % 0.5 )
  let firstMasonry;
  let secondMasonry;
    if (docs.length / 2 % 0 === 0) {
        firstMasonry = docs.length / 2;
        secondMasonry = -(docs.length / 2)
    } else if (docs.length / 2 % 0.5 === 0) {
        firstMasonry = docs.length / 2 + 2;
        secondMasonry = -(docs.length / 2 - 1.5)
    }
  
  return (
    <div className='masonry-container'>
      <div className='title-masonry'>
        <h1>{props.title}</h1>
        <div className="masonry-wrapper">
            {docs &&
              docs.slice(firstMasonry).map((doc) => (
                <div className="img-wrap masonry-item" key={doc.id}>
                  <a href={doc.url} target="_blank">
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
                <a href={doc.url} target="_blank">
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
  );
};

export default ImgGrid;

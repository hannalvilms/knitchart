import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { projectFirestore } from '../firebase-config';
import { useHref } from 'react-router-dom';
const ImgGrid = () => {

    function deleteFromFS(file){
        console.log(file)
        
        projectFirestore.collection("images").doc(file).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const {docs} = useFirestore('images');
    return <div className="img-grid masonry-wrapper">
        <div className='masonry'>
        {docs && docs.map(doc => (
            <div className='img-wrap masonry-item' key={doc.id}>
                <a href={doc.url} target='_blank'>
                    <img src={doc.url} className='masonry-content' alt='uploaded pic'/>
                </a>
                <button className="delete-button" onClick={() => {deleteFromFS(doc.id)}}>Delete</button>
            </div>
        ))}
        </div>
    </div>;
}

export default ImgGrid;

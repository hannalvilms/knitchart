import { useState, useEffect } from "react";
import {projectStorage, projectFirestore, timestamp} from '../firebase-config';

const useStorage = (file) => {
    //Define vars
    const [progess, setProgress] = useState(0);
    const [err, setErr] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //references
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');
        storageRef.put(file).on('state_changed', (snap) => {
            //progress bar
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            //sets error
            setErr(err);
        }, async () => {
            //get url and timestamp
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({url, createdAt})
            setUrl(url);
        })
    }, [file])

    return {progess, url, err}

}

export default useStorage;
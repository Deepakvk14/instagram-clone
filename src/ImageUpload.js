import React,{useState} from 'react';
//import {Button} from "@material-ui/core";
import {storage, db} from "./firebase";
import firebase from "firebase";

import "./ImageUpload.css"

function ImageUpload({UserName}) {
    const [caption, setCaption] = useState('');
    const [image, setImage]= useState("");
    const [progress, setProgress] = useState("");


    const handleChange=(e)=>{
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }

    }
    const handleUpload=()=> {
     const uploadTask = storage.ref(`images/${image.name}`).put(image)
     uploadTask.on(
         "state_Changed",
         (snapshot)=>{
             const progress = Math.round(
                (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
           setProgress(progress);  
         },
         (error)=>{
          alert(error.maessage)
         },
         ()=>{
           storage
           .ref("images")
           .child(image.name)
           .getDownloadURL()
           .then(url =>{
            db.collection("posts").add({
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                caption:caption,
                imageUrl:url,
                UserName:UserName

            });
            setProgress(0);
            setCaption("");
            setImage(null);
           })
           
         }

         );
    }

    return (<>
        <div className="upload">
            <div className="upload_image">
            <input type="file" onChange={handleChange}></input>
           
             
             </div>
             <input type="text" placeholder="write ur caption" value={caption}
             onChange={(event)=>setCaption(event.target.value)}/>
             <div className="upload_image"> 
             <progress value={progress} max="100"/>
             <button onClick={handleUpload}> Upload</button>
            </div>
        </div>
  </>  )
}

export default ImageUpload

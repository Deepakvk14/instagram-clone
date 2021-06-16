import React, {useState} from 'react'
import {db} from "./firebase";
import firebase from "firebase";

function Comments(comments) {
    const [Comments,setComments] = useState("");

     const commentsUpload= (e)=>{
        db.collection("comments").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            comments:comments,
        });
        setComments("");
     }

    return (
        <div>
            <input type="text" placeholder="comments" value={Comments}
             onChange={(event)=>setComments(event.target.value)}/>
             <button onClick={commentsUpload}> Post</button>
        </div>
    )
}

export default Comments

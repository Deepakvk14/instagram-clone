import React, {useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import "./Post.css";
import { db } from './firebase';
import firebase from "firebase";
//import Comments from './Comments';


function Post({postId,UserName,User,imageUrl,caption}) {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState('');

    const postComment = ((event)=>{
       event.preventDefault();
       db.collection("posts").doc(postId).collection("comments").add({
       timestamp:firebase.firestore.FieldValue.serverTimestamp(),
       text:comment,
       UserName: User.displayName,
       });
       setComment("");
    })

    useEffect(()=>{
        let unsubscribe;
        if(postId) {
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=> doc.data()))
            });
        }
        return ()=>{
            unsubscribe();
        };
    },[postId])
    return (
        <div className="post_center">
        <div className="posts">
       <div className="avatar_header">
       <Avatar
            className="post_avatar"  
            alt="Hrithik" src={imageUrl}
        />
            <h3>{UserName}</h3>
       </div>
            <img className="post_image" alt="post_image" src={imageUrl}/>
            <h4 className="post_caption"> <strong>{UserName} </strong> {caption}</h4>
            <div className="post_comments">
                {
                comments.map((comment)=>(
                    <p>
                        <b>{ comment.UserName}</b> {comment.text}
                    </p>
                )
                )
                }
            </div>
            
             <form className="comment_box">
             <input className="post_input" type="text" placeholder="add a comment" value={comment}
             onChange={(event)=>setComment(event.target.value)}/>
             <button className="post_btn" onClick={postComment}> Post</button>
             </form>
        </div>
        </div>
    )
}

export default Post

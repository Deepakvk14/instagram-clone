import React, {useState, useEffect} from "react";
import Post from "./Post"
import {auth, db} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button ,Input} from "@material-ui/core";
import ImageUpload from "./ImageUpload";
//import Comments from "./Comments";
import './App.css';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 200,
   
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    
  },
}));
function App() {
  
const classes = useStyles();
const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([ ]);
  const [open, setOpen] = useState([]);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UserName, setUserName] = useState("");
  const [User, setUser] = useState(null);
  const [OpenSignIn, setOpenSignIn] = useState("");

  useEffect(()=>{
     const unsubscribe = auth.onAuthStateChanged((authUser)=>{
     if(authUser) {
       console.log("authUser",authUser);
       setUser(authUser)
     }else {
       setUser(null)
     }
    })
    return ()=>{
      unsubscribe();
    }
  },[User,UserName])
  
    useEffect(()=>{
    db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot=>
      setPosts(snapshot.docs.map(doc=>({ 
        id:doc.id,
        post:doc.data()}))))
      },[])

      const signUp = (event)=> {
        event.preventDefault()
        auth
        .createUserWithEmailAndPassword(Email,Password)
        .then((authUser)=>{
          return authUser.user.updateProfile({
            displayName:UserName
            })
            
        })
        .catch((error)=>alert(error.message))
        setOpen(false)
       }
       const signIn=((event)=>{
        event.preventDefault()
        auth
        .signInWithEmailAndPassword(Email,Password)
        .catch((error)=>alert(error.message))
        setOpenSignIn(false)
       })

  return (<>
    <div className="App">
    
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        >
        <div style={modalStyle} className={classes.paper}>
        
          <center>
          <form className="sign_up">
          <img  className="header_logo" src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png" alt="logo"/>
          <Input
           type="text"
           placeholder="username"
           value={UserName}
           onChange={(e)=>setUserName(e.target.value)}>
           </Input>
           <Input
           type="email"
           placeholder="enter ur email"
           value={Email}
           onChange={(e)=>setEmail(e.target.value)}>
           </Input>
           <Input
           type="password"
           placeholder="enter ur password"
           value={Password}
           onChange={(e)=>setPassword(e.target.value)}>
           </Input>
           <Button onClick={signUp}>sign up</Button>
           </form>

  
          </center>
        
          </div>
          </Modal>
          <Modal
        open={OpenSignIn}
        onClose={()=>setOpenSignIn(false)}
        >
        <div style={modalStyle} className={classes.paper}>
        
          <center>
          <form className="sign_In">
          <img  className="header_logo" src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png" alt="logo"/>
         
           <Input
           type="email"
           placeholder="enter ur email"
           value={Email}
           onChange={(e)=>setEmail(e.target.value)}>
            </Input>
           <Input
           type="password"
           placeholder="enter ur password"
           value={Password}
           onChange={(e)=>setPassword(e.target.value)}>
           </Input>
           <Button onClick={signIn}>Log In</Button>
           </form>

  
          </center>
        
          </div>
          </Modal>
    <div className="header">
      <img  className="header_logo" src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png" alt="logo"/>
      
      {User?.displayName?(
    <ImageUpload UserName={User.displayName}/>):(
      <h4>sorry you have to log in first</h4>
    )
    }
      {User? (
    <button className="btn" onClick={()=>auth.signOut()}>Logot</button>
    ):(
      <div className="app_login_container">
      <button onClick={()=>setOpenSignIn(true)}>Sign In</button>
      <button onClick={()=>setOpen(true)}>Sign up</button>
      </div>)
    }
    </div>
     
    
    {
       posts.map(({id,post}) => (
         <Post className="Posts" id={id} postId={id} User={User} UserName={post.UserName} caption={post.caption} imageUrl={post.imageUrl}/>
       ))
    }
    {
      <div className="footer">
       this site belongs to rishi verma 
    </div>
    }
    </div>
    
   </>)   }  

export default App;

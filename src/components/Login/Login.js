

import { useContext, useState } from 'react';
import { UserContext } from "../../App.js";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager.js';




function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    newUSer: false,
    name:'',
    email:'',
    password:'',
    photo:''
  });
  initializeLoginFramework();

const [loggedInUser, setLoggedInUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();
let {from } = location.state || {from: {pathname: "/" }};


  const googleSignIn = () =>{
      handleGoogleSignIn()
      .then(res =>{
        handleResponse(res, true);
      })
  }
  const fbSignIn = () =>{
      handleFbSignIn()
      .then(res=>{
        handleResponse(res, true);
      })
  }
  
  const signOut = () =>{
    handleSignOut()
    .then(res=>{
        handleResponse(res, false);
    })
  }
  
  

const handleSubmit = (event) =>{
  // console.log(user.email, user.password)
  if(newUser && user.email && user.password){
    createUserWithEmailAndPassword(user.name, user.email, user.password)
    .then(res=>{
        handleResponse(res, true);
    })

  }
  if(!newUser && user.email && user.password){
    signInWithEmailAndPassword(user.email, user.password)
    .then(res=>{
        handleResponse(res, true);
    })
  }
  event.preventDefault();
}
const handleResponse =(res, redirect) =>{
    setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
}

const handleChange =(event) =>{
  let isFieldValid = true;
  if(event.target.name ==='email'){
    isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    
  }
  if(event.target.name === 'password'){
    const isPasswordValid = event.target.value.length>6;
    const passwordHasNumber = /\d{1}/.test(event.target.value);
    isFieldValid = isPasswordValid && passwordHasNumber;
  }
  if(isFieldValid){
    const newUserInfo = {...user};
    newUserInfo [event.target.name] = event.target.value;
    setUser(newUserInfo);
  }
}


  return (

    
    <div style={{textAlign: 'center'}}>
    { 
      user.isSignedIn 
        ?<button onClick ={signOut}>Sign Out</button> 
        :<button onClick ={googleSignIn}>Sign In</button>   
      
    }
      <br/>
      <button onClick ={fbSignIn}>Sign in using Facebook</button>
    
        {
          user.isSignedIn && <div> 
            <p> Welcome, {user.name}</p>
            <p>Your email:{user.email}</p>
            <img src={user.photo} alt=""/>
          </div>
        }

        <h1>Sign In Please</h1>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New User Sign up</label>
        <form onSubmit ={handleSubmit}>
            {newUser && <input name="name" type = "text" onBlur ={handleChange} placeholder="Name"/>}
            <br/>
            <input type="text" name="email" onBlur={handleChange} placeholder="email" required/>
            <br/>
            <input type="password" name="password" onBlur={handleChange} placeholder="Password" required />
            <br/>
            <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
        </form>
        <p style ={{color: 'red'}}>{user.error}</p>
        {
          user.success && <p style ={{color: 'green'}}> User { newUser ? "Created" : "Logged In"} Successfully</p>
        }

    </div>
  );
}

export default Login;

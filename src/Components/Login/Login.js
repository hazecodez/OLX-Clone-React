import React, { useState , useContext} from 'react';
// import { FirebaseContext } from '../../Store/Context';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Firebase/config';
import { useNavigate } from 'react-router-dom/dist';

import Logo from '../../olx-logo.png';
import './Login.css';
import Header from '../Header/Header';


function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  // const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const loginHandler = (e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth,email,password).then((result)=>{
      navigate('/')
      
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return (
    
    <div >
      <Header/>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={loginHandler}>
          <label htmlFor="fname">Enter your email to Login.</label>
          <br />
          <input
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          placeholder='Email Address'
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname"></label>
          <br />
          <input
          placeholder='Password'
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <p>
          Don't have an account ? <a onClick={()=>{
            navigate('/signup')
          }}>Sign Up</a>
        </p>
      </div>
      
    </div>
    
  );
}

export default Login;

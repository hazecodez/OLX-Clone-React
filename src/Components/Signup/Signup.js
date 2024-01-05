import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../../Firebase/config";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import Header from "../Header/Header";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");


  const formSubmit = (e) => {
    e.preventDefault();
    if (email === null || email === "") {
      alert("Email must be needed");
    } else if (password === null || password === "") {
      alert("Password must be needed");
    } else if (name === null || name === "") {
      alert("Username must be needed");
    } else if (number === null || number === "") {
      alert("Mobileumber must be needed");
    } else {
      createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      )
        .then((result) => {
          const user = result.user;
          updateProfile(user, { displayName: name }).then(() => {
            const usersCollection = collection(firestore, "users");
            addDoc(usersCollection, {
              id: user.uid,
              username: name,
              number: number,
            }).then(() => {
              navigate("/login");
            });
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  return (
    <div>
      <Header/>
      <div className="signupParentDiv">
        <img width="200px" height="200px" alt="logo" src={Logo}></img>
        <form onSubmit={formSubmit}>
          <label htmlFor="fname">Register your account here.</label>
          <br />
          <input
          placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname"></label>
          <br />
          <input
          placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          placeholder="Mobile Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname"></label>
          <br />
          <input
          placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <p>
          Already have an account ?
          <a onClick={()=>{
            navigate('/login')
          }}>Log In</a>
        </p>
      </div>
    </div>
  );
}

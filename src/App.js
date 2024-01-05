import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Store/Context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/config";
import PostView from "./Store/PostContext";


//=====Import Components=====

import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";

function App() {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <PostView>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/viewPost" element={<ViewPost />} />
          </Routes>
        </Router>
      </PostView>
    </div>
  );
}

export default App;

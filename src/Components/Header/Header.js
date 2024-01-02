import React, { useContext } from "react";
import { AuthContext } from "../../Store/Context";
import { auth } from "../../Firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom/dist";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>{
          navigate('/')
        }}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={(e)=>{
            if(e.target.innerText === "LogIn" ) navigate('/login')
          }}>{user ? user.displayName : "LogIn"}</span>
          <hr />
        </div>
        {user && (
          <span
            onClick={() => {
              signOut(auth)
                .then(() => {
                  navigate("/");
                })
                .catch((error) => {
                  alert(error.message);
                });
            }}
          >
            Logout
          </span>
        )}
        <Link to={"/create"}>
          <div className="sellMenu">
            <SellButton></SellButton>

            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;

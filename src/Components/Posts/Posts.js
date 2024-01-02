import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom/dist";
import { postContext } from "../../Store/PostContext";
import { firestore } from "../../Firebase/config";

import { collection, getDocs } from "firebase/firestore";

import Heart from "../../assets/Heart";
import "./Post.css";

function Posts() {
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(postContext);
  useEffect(() => {
    getDocs(collection(firestore, "products"))
      .then((querySnapshot) => {
        const allProducts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(allProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <Link to={"/viewPost"}>
                <div
                  className="card"
                  onClick={() => {
                    setPostDetails(product);
                  }}
                  key={product.url}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.url} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.name}</span>
                    <p className="name"> {product.category}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="freshcards">
          {products.map((product) => {
            return (
              <Link to={"/viewPost"}>
                <div
                  className="card"
                  onClick={() => {
                    setPostDetails(product);
                  }}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.url} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.name}</span>
                    <p className="name"> {product.category}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;

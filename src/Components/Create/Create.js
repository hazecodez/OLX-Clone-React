import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { storage, firestore } from "../../Firebase/config";
import { AuthContext } from "../../Store/Context";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom/dist";


const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = () => {
    if (!user) {
      alert("Please log in to your account.");
      return;
    }

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        alert("Error uploading image: " + error.message);
      },
      () => {
       
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            
            const productsCollection = collection(firestore, "products");
            addDoc(productsCollection, {
              name,
              category,
              price,
              url,
              userId: user.uid,
              createdAt: new Date().toDateString(),
            })
              .then(() => {
                navigate("/");
              })
              .catch((error) => {
                alert("Error adding product to Firestore: " + error.message);
              });
          })
          .catch((error) => {
            alert("Error getting download URL: " + error.message);
          });
      }
    );
  };

  return (
    <Fragment>
      <Header />

      <div className="centerDiv">
        <label htmlFor="fname" style={{ fontSize: "30px", fontWeight: "700" }}>
          Product Details
        </label>
        <br />
        <br />
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          type="text"
          id="fname"
          name="Name"
          defaultValue="John"
        />
        <br />
        <label htmlFor="fname"></label>
        <br />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
          type="text"
          id="fname"
          name="category"
          defaultValue="John"
        />
        <br />
        <label htmlFor="fname"></label>
        <br />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input"
          type="number"
          id="fname"
          name="Price"
        />
        <br />

        <br />
        <img
          alt="Posts"
          width="200px"
          height="200px"
          src={
            image
              ? URL.createObjectURL(image)
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9W-4C8o3gRqwN270j6o_BoQCDeOLUOtyWZ0PisH2l2Z_Z6YDyoHUjzhYft5bkdkEirg&usqp=CAU"
          }
        ></img>

        <br />
        <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        <br />
        <button onClick={submitHandler} className="uploadBtn">
          upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;

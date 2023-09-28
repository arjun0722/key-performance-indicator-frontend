import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfigblog";
import "../App.css";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [createdBy, setCreatedBy] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [createDate, setCreateDate] = useState(
    Timestamp.now().toDate().toString()
  );

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(
      collection(db, "Blog"),
      {
        title,
        createdBy,
        description,
        imgUrl,
        createDate,
      }
      // setCreatedBy("");
      // setTitle("");
      // setDescription("");
      // setImgUrl("");
      // setCreateDate("");
    );
    navigate("/blogs");
  };
  // console.log(author);
  // const form = document.getElementById("my_form");
  // form.reset();

  return (
    <div className="addblog-form">
      <p>Add new Blog</p>
      <form onSubmit={handleSubmit} id="my_form">
        <label>Name</label>
        <input
          type="text"
          name="username"
          placeholder=" bLOG CREATED by"
          onChange={(e) => {
            setCreatedBy(e.target.value);
          }}
        />

        <br></br>

        <label>Blog Title</label>
        <input
          name="title"
          type="text"
          placeholder="Enter 
        Blog Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />

        <label>Blog Description</label>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          type="text"
          placeholder="Write your Blog"
        ></textarea>
        <br />

        <label>Image URL</label>
        <input
          name="image"
          placeholder="Paste Image Url"
          type="text"
          onChange={(e) => {
            setImgUrl(e.target.value);
          }}
        />

        <div className="btn-container">
          <button type="submit"> Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;

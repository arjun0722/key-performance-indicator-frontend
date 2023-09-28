import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { db } from "../firebaseConfig";
import "../App.css";

const BlogDisplay = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const blogref = collection(db, "Blog");
    const q = query(blogref);

    onSnapshot(q, (snapshot) => {
      const allBlogs = snapshot.docs.map((docs) => ({
        id: docs.id,
        ...docs.data(),
      }));

      setBlogs(allBlogs);
    });
  }, []);
  return (
    <div>
      {blogs.length === 0 ? (
        <p>No Blogs found!</p>
      ) : (
        blogs.map((blog) => (
          <div className="blog-container" key={blog.id}>
            <div className="section1">
              <p>{blog.title}</p>
              <p>{blog.createdBy}</p>
            </div>
            <div className="section2">
              <p>
                <img src={blog.imgUrl} alt="" />
              </p>
              {blog.description}
            </div>
            <div className="section3">
              <p> posted on = {blog.createDate}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogDisplay;

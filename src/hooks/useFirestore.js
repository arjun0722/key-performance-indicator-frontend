import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { db } from "../firebaseConfig";

const ImageDisplay = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const Imageref = collection(db, "images");
    const q = query(Imageref, orderBy("createDate"));

    onSnapshot(q, (snapshot) => {
      const allImages = snapshot.docs.map((docs) => ({
        id: docs.id,
        ...docs.data(),
      }));

      setImages(allImages);
    });
  }, []);

  return (
    <div>
      {images.length === 0 ? (
        <p>No Images found!</p>
      ) : (
        images.map((image) => (
          <div className="image-container" key={image.id}>
            <img src={image.url} alt="" />
          </div>
        ))
      )}
    </div>
  );
};

export default ImageDisplay;

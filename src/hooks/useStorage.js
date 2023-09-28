import React, { useEffect, useState } from "react";
import { storage } from "../firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [createDate, setCreateDate] = useState(
    Timestamp.now().toDate().toString()
  );

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      //   const collectionRef = db.collection("images");

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl((prev) => ({ ...prev, img: downloadURL }));
          });
          await addDoc(collection(db, "images"), {
            url,
            createDate,
          });

          // const url = await storageRef.getDownloadURL();
          setUrl(url);
        }
      );
    };
    file && uploadFile();
  }, [file]);

  return { progress, url, error };
};

export default useStorage;

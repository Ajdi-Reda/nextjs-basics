"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const imageInputRef = useRef();
  const handleClickPick = () => {
    imageInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setUploadedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setUploadedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name} className="">
        {label}
      </label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {uploadedImage ? (
            <Image src={uploadedImage} alt="Image uploaded by the user" fill />
          ) : (
            <p>No image uploaded yet</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, img/jpeg"
          name={name}
          ref={imageInputRef}
          onChange={handleImageUpload}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleClickPick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

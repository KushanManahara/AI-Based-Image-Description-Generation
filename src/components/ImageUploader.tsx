// FileUploader.tsx

import React, { ChangeEvent, useState } from "react";
import "./components.css";
import "react-bootstrap";

interface ImageUploaderProps {
  onFileUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileUpload }) => {
  // const [imageFile, setImageFile] = useState<File>();

  const handleInputFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      // await setImageFile(file);
      // console.log("File selected", file);
      onFileUpload(file);
      console.log("File uploaded", file);
    }
  };

  // const handleGenerate = () => {
  //   if (imageFile) {
  //     onFileUpload(imageFile);
  //     // console.log("generated", imageFile);
  //   } else {
  //     console.log("else", imageFile);
  //     // console.log("no image data found");
  //   }
  // };

  return (
    <div className="image-input-container">
      <label className="img-input-label" htmlFor="imageInput">
        Select an image
      </label>
      <input
        type="file"
        id="imageInput"
        name="image"
        accept="image/*"
        onChange={handleInputFileChange}
      />
      {/* <button onClick={handleGenerate}>Generate Description</button> */}
    </div>
  );
};

export default ImageUploader;

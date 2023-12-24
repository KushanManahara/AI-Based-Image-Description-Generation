// FileUploader.tsx

import React, { ChangeEvent, useState } from "react";
import "./components.css";
import "react-bootstrap";

interface ImageUploaderProps {
  onFileUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileUpload }) => {
  const [imageFile, setImageFile] = useState<File>();

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      console.log("File selected");
    }
  };

  const handleGenerate = () => {
    if (imageFile) {
      onFileUpload(imageFile);
      console.log("generated", imageFile);
    }
  };

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
      <button onClick={handleGenerate}>Generate Description</button>
    </div>
  );
};

export default ImageUploader;

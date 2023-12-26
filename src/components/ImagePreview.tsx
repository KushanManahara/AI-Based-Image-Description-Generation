import React, { useEffect, useState } from "react";

interface ImagePreviewProps {
  file: File | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    if (file) {
      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        const ratio = image.width / image.height;
        setAspectRatio(ratio);
      };
    }
  }, [file]);

  if (!file || aspectRatio === null) {
    return null;
  }

  const imageUrl = URL.createObjectURL(file);

  // Set the maximum width and height
  const maxWidth = 250; // Set your maximum width here
  const maxHeight = maxWidth / aspectRatio;

  return (
    <div>
      {/* <h2>Image Preview</h2> */}
      <img
        src={imageUrl}
        alt={file.name}
        style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }}
      />
    </div>
  );
};

export default ImagePreview;

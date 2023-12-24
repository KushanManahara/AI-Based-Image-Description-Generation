// import React, { useState } from "react";
// import ImageUploader from "./components/ImageUploader";
// import DescriptionGenerator from "./components/DescriptionGenerator";
// import "react-bootstrap";

// import "./App.css";
// import { Button } from "react-bootstrap";
// import RoundedButton from "./components/RoundedButton";

// const API_KEY = "AIzaSyCoR9Z1KBj0hU7KR7x5IRdEYpNyJr7rfsw";
// const MODEL_NAME = "gemini-pro-vision";

// const App: React.FC = () => {
//   const [imageData, setImageData] = useState<string | null>(null);

//   const handleFileUpload = (file: File) => {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const imageData = e.target?.result?.toString().split(",")[1];
//       setImageData(imageData || null);
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="container flex flex-grow">
//       <h1>Image Description Generator</h1>

//       <div className="uploader-generator-box">
//         <ImageUploader onFileUpload={handleFileUpload} />
//         <DescriptionGenerator
//           apiKey={API_KEY}
//           modelName={MODEL_NAME}
//           imageData={imageData}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;

// ... (previous imports)

// --------------------------------------------------------------------------

// const App: React.FC = () => {
//   const [imageData, setImageData] = useState<string | null>(null);
//   const [generateOptions, setGenerateOptions] = useState<string[]>([
//     "option 01",
//   ]);

//   const handleFileUpload = (file: File) => {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const imageData = e.target?.result?.toString().split(",")[1];
//       setImageData(imageData || null);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleAddOption = () => {
//     setGenerateOptions((prevOptions) => [...prevOptions, "New Option"]);
//   };

//   return (
//     <div className="container flex flex-grow">
//       <h1>Image Description Generator</h1>

//       {generateOptions.map((option, index) => (
//         <div key={index} className="generate-option">
//           <div className="uploader-generator-box">
//             <ImageUploader onFileUpload={handleFileUpload} />
//             <DescriptionGenerator
//               apiKey={API_KEY}
//               modelName={MODEL_NAME}
//               imageData={imageData}
//             />
//           </div>
//           {index == generateOptions.length - 1 && (
//             <div className="add-new-btn-container">
//               <RoundedButton onClick={handleAddOption}>
//                 Add new prompt
//               </RoundedButton>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;

// ---------------------------------------------------------------------------------

import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import DescriptionGenerator from "./components/DescriptionGenerator";
import RoundedButton from "./components/RoundedButton";
import "./App.css";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

// const API_KEY = "AIzaSyCoR9Z1KBj0hU7KR7x5IRdEYpNyJr7rfsw";
const MODEL_NAME = "gemini-pro-vision";

interface Prompt {
  imageData: string | null;
  imageFile: File | null;
  description: string | null;
}

const App: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([
    { imageData: null, imageFile: null, description: null },
  ]);

  const handleFileUpload = (file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target?.result?.toString().split(",")[1];
      setPrompts((prevPrompts) => {
        const updatedPrompts = [...prevPrompts];
        if (imageData) {
          updatedPrompts[index].imageData = imageData;
          updatedPrompts[index].imageFile = file;
        }
        return updatedPrompts;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAddOption = () => {
    setPrompts((prevPrompts) => [
      ...prevPrompts,
      { imageData: null, imageFile: null, description: null },
    ]);
  };

  return (
    <div className="container flex flex-grow">
      <h1>Image Description Generator</h1>

      {prompts.map((prompt, index) => (
        <div key={index} className="generate-option">
          <div className="uploader-generator-box">
            <ImageUploader
              onFileUpload={(file: File) => handleFileUpload(file, index)}
            />
            <DescriptionGenerator
              apiKey={API_KEY}
              modelName={MODEL_NAME}
              imageData={prompt.imageData}
            />
          </div>
        </div>
      ))}

      <div className="add-new-btn-container">
        <RoundedButton onClick={handleAddOption}>Add new prompt</RoundedButton>
      </div>
    </div>
  );
};

export default App;

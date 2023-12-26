import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import DescriptionGenerator from "./components/DescriptionGenerator";
import RoundedButton from "./components/RoundedButton";
import "./App.css";
import ImagePreview from "./components/ImagePreview";
import { Row, Col } from "react-bootstrap";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

const MODEL_NAME = "gemini-pro-vision";

interface Prompt {
  imageFile: File | null;
  description: string | null;
  imageData: string | null;
}

const App: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([
    { imageFile: null, description: null, imageData: null },
  ]);

  const handleFileUpload = (file: File, index: number) => {
    console.log("index", index);
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageData = event.target?.result?.toString().split(",")[1];
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
    console.log("imageData", index);
  };

  const handleGenerateDescription = (index: number, description: string) => {
    console.log("description in app.tsx : ", description);
    console.log("des index : ", index);
    setPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[index].description = description;
      return updatedPrompts;
    });
  };

  const handleAddOption = () => {
    setPrompts((prevPrompts) => [
      ...prevPrompts,
      { imageData: null, imageFile: null, description: null },
    ]);
    console.log("prompts.length :", prompts.length);
  };

  return (
    <div className="container flex flex-grow">
      <h1>Image Description Generator</h1>

      {prompts.map((prompt, promptIndex) => (
        <div key={promptIndex} className="generate-option">
          {promptIndex === prompts.length - 1 ? (
            <div className="uploader-generator-box">
              {/* Render ImageUploader and DescriptionGenerator only for the last prompt */}
              <ImageUploader
                onFileUpload={(file: File) =>
                  handleFileUpload(file, promptIndex)
                }
              />
              <Row>
                <Col md={2}>
                  <ImagePreview file={prompt.imageFile} />
                </Col>
                <Col md={6}>
                  {prompt.imageData && (
                    <DescriptionGenerator
                      apiKey={API_KEY}
                      modelName={MODEL_NAME}
                      imageData={prompt.imageData}
                      onChangeDescription={(description: string) =>
                        handleGenerateDescription(promptIndex, description)
                      }
                    />
                  )}
                </Col>
              </Row>
            </div>
          ) : (
            <div className="generated-description">
              <div>
                <ImagePreview file={prompt.imageFile} />
                <p>{prompt.description}</p>
              </div>
            </div>
          )}

          {promptIndex === prompts.length - 1 && prompt.description != null && (
            <div className="add-new-btn-container">
              <RoundedButton onClick={handleAddOption}>
                Add new prompt
              </RoundedButton>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;

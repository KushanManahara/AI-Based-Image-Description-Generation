import React, { useState, useRef, useEffect } from "react";
import ImageUploader from "./components/ImageUploader";
import DescriptionGenerator from "./components/DescriptionGenerator";
import RoundedButton from "./components/RoundedButton";
import "./App.css";
import ImagePreview from "./components/ImagePreview";
import { Col } from "react-bootstrap";

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
  const lastPromptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastPromptRef.current) {
      lastPromptRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [prompts]);

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
      <h1>Descriptify.ai</h1>

      {prompts.map((prompt, promptIndex) => (
        <div
          key={promptIndex}
          className="generate-option d-flex justify-content-center"
          ref={promptIndex === prompts.length - 1 ? lastPromptRef : null}
        >
          {promptIndex === prompts.length - 1 ? (
            <div className="uploader-generator-box current-box">
              {/* Render ImageUploader and DescriptionGenerator only for the last prompt */}
              <Col>
                <ImageUploader
                  onFileUpload={(file: File) =>
                    handleFileUpload(file, promptIndex)
                  }
                />
              </Col>
              <div className="img-dec">
                <ImagePreview file={prompt.imageFile} />
                <div className="description-container">
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
                </div>
              </div>
            </div>
          ) : (
            <div className="uploader-generator-box">
              <div className="img-dec">
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

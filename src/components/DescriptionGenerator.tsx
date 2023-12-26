import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import "./components.css";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import PropagateLoader from "react-spinners/PropagateLoader";

interface DescriptionGeneratorProps {
  apiKey: string;
  modelName: string;
  imageData: string | null;
  onChangeDescription: any;
}

const DescriptionGenerator: React.FC<DescriptionGeneratorProps> = ({
  apiKey,
  modelName,
  imageData,
  onChangeDescription,
}) => {
  const [generatedDescription, setGeneratedDescription] = useState<string>();
  const [generating, setGenerating] = useState(false);
  const generateDescription = async () => {
    if (!imageData) {
      console.log("no image data");
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const generationConfig = {
      temperature: 0.4,
      topK: 32,
      topP: 1,
      maxOutputTokens: 4096,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      {
        text: "give me a big explanation for this image. what is this image? what is the important, and with more details (750 charactors).:\n",
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData,
        },
      },
    ];

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });

      const response = result.response;
      setGeneratedDescription(response.text());
      return response.text();
    } catch (error) {
      console.error(error);
      setGeneratedDescription("Error generating description.");
    }
  };

  const handleGenerateDescription = async () => {
    setGenerating(true);
    const res = await generateDescription();
    onChangeDescription(res);
    setGenerating(false);
    return res;
  };

  return (
    <>
      {!generatedDescription && (
        <button className="generate-btn" onClick={handleGenerateDescription}>
          Generate Description
        </button>
      )}

      {generating && (
        <div className="loader-container">
          <PropagateLoader color="#8a2be2" size={20} speedMultiplier={1.3} />
        </div>
      )}
      {generatedDescription && (
        <div className="generated-description-container">
          <br />
          {generatedDescription && (
            <>
              <TypeAnimation
                sequence={[
                  generatedDescription || "Failed to generate description",
                ]}
                wrapper="span"
                speed={90}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default DescriptionGenerator;

// // DescriptionGenerator.tsx

// import React, { useEffect, useState } from "react";
// import { TypeAnimation } from "react-type-animation";

// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";

// interface DescriptionGeneratorProps {
//   apiKey: string;
//   modelName: string;
//   imageData: string | null;
// }

// const DescriptionGenerator: React.FC<DescriptionGeneratorProps> = ({
//   apiKey,
//   modelName,
//   imageData,
// }) => {
//   const [generatedDescription, setGeneratedDescription] = useState<
//     string | null
//   >(null);

//   useEffect(() => {
//     const generateDescription = async () => {
//       if (!imageData) {
//         return;
//       }

//       const genAI = new GoogleGenerativeAI(apiKey);
//       const model = genAI.getGenerativeModel({ model: modelName });

//       const generationConfig = {
//         temperature: 0.4,
//         topK: 32,
//         topP: 1,
//         maxOutputTokens: 4096,
//       };

//       const safetySettings = [
//         {
//           category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//           threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//         // Add other safety settings as needed
//       ];

//       const parts = [
//         {
//           text: "Describe what this image with more explanation:\n",
//         },
//         {
//           inlineData: {
//             mimeType: "image/jpeg",
//             data: imageData,
//           },
//         },
//       ];

//       try {
//         const result = await model.generateContent({
//           contents: [{ role: "user", parts }],
//           generationConfig,
//           safetySettings,
//         });

//         const response = result.response;
//         setGeneratedDescription(response.text());
//       } catch (error) {
//         console.error(error);
//         setGeneratedDescription("Error generating description.");
//       }
//     };

//     generateDescription();
//   }, [apiKey, modelName, imageData]);

//   return (
//     <>
//       {generatedDescription !== null && (
//         <div className="generated-description">
//           <h2>Generated Description</h2>
//           <TypeAnimation
//             sequence={[generatedDescription]}
//             wrapper="span"
//             speed={90}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default DescriptionGenerator;

import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

interface DescriptionGeneratorProps {
  apiKey: string;
  modelName: string;
  imageData: string | null;
}

const DescriptionGenerator: React.FC<DescriptionGeneratorProps> = ({
  apiKey,
  modelName,
  imageData,
}) => {
  const [generatedDescription, setGeneratedDescription] = useState<
    string | null
  >(null);

  const handleGenerateDescription = async () => {
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
      // Add other safety settings as needed
    ];

    const parts = [
      {
        text: "Describe what this image with more explanation:\n",
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
    } catch (error) {
      console.error(error);
      setGeneratedDescription("Error generating description.");
    }
  };

  useEffect(() => {
    // Optional: You can generate the description immediately when the component mounts
    handleGenerateDescription();
  }, [imageData]);

  return (
    <>
      {generatedDescription !== null && (
        <div className="generated-description">
          <h2>Generated Description</h2>
          <TypeAnimation
            sequence={[generatedDescription]}
            wrapper="span"
            speed={90}
          />
        </div>
      )}
    </>
  );
};

export default DescriptionGenerator;

# 🚀 Getting Started with Image Description Generator

This project was bootstrapped with Create React App.

## 📋 Available Scripts

In the project directory, you can run:

### `npm start` 🏃‍♂️

Runs the app in the development mode.\
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test` 🧪

Launches the test runner in the interactive watch mode.\
See the section about running tests for more information.

### `npm run build` 🏗️

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about deployment for more information.

### `npm run eject` ⚠️

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## 📚 Learn More

You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

## 🖼️ About Image Description Generator

This application allows you to generate descriptions for images. It uses the Gemini Pro Vision model to generate the descriptions. You can upload an image and it will generate a description for you.

Remember to add your API key to a `.env` file at the root of your project with the name `REACT_APP_GEMINI_API_KEY`.

Here's an example of how to use it:

```javascript
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

const MODEL_NAME = "gemini-pro-vision";

// ... rest of your code
```

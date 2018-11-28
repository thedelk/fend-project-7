# Neighborhood Map - OKC Coffee

## Contents
- [Neighborhood Map - OKC Coffee](#neighborhood-map---okc-coffee)
  - [Contents](#contents)
  - [Introduction](#introduction)
  - [Dependencies](#dependencies)
    - [Libraries](#libraries)
    - [Other](#other)
  - [Using Locally](#using-locally)
  - [Contributing](#contributing)
- [Neighborhood Map (Original Rubric)](#neighborhood-map-original-rubric)
  - [Available Scripts](#available-scripts)
    - [`npm start`](#npm-start)
    - [`npm test`](#npm-test)
    - [`npm run build`](#npm-run-build)
    - [`npm run eject`](#npm-run-eject)
  - [Learn More](#learn-more)

## Introduction

This is the final project for Udacity's Front-End Nanodegree program.  The goal was to create from scratch an application using React.js that utilizes the Google Maps API to display a local map of hotspots.

This iteration searches local places around Oklahoma City with the keyword "coffee."

## Dependencies

### Libraries

The following are a few libraries on which this project is dependent.  A huge thank-you to the developers and contributors to these utilities, because without them, this project would have been much more difficult!

- [axios](https://www.npmjs.com/package/axios)
- [eslint](https://eslint.org) & [prettier](https://prettier.io)
- [foursquare](https://developer.foursquare.com)
- [google-maps-react](https://www.npmjs.com/package/google-maps-react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-scripts](https://www.npmjs.com/package/react-scripts)

### Other

- [milligram](https://milligram.io) - While I didn't use the entire Milligram CSS framework, I did use some aspects of it for styling

## Using Locally

To fire it up on your own machine, fork or clone your own copy.  You'll need a Google Maps API key and Foursquare API ID and Secret.

1. From the project root, open a terminal and run `npm install` to install package dependencies.
2. In `src/util` you'll need to create an `auth.js` file.  This is where your API keys will be called.  Make sure it looks like the following:
    ```
    export const FS_ID = "YOUR_FOURSQUARE_CLIENT_ID";
    export const FS_SECRET = "YOUR_FOURSQUARE_CLIENT_SECRET";
    export const G_KEY = "YOUR_GOOGLE_API_KEY";
    ```
3. Run `npm start` from your terminal to start up a local server instance at `http://localhost:3000`.
4. Click around and have fun!

## Contributing

If you've read this far then you know this was an assigned project, and as such will not be open to pull requests or contributions. I imagine someone smarter than me could write it better, anyway!

# Neighborhood Map (Original Rubric)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## ERS stack

Electron, react and SQLite stack.

First install the dependencies using
### `yarn install`

<br />
Now you will face this error - <b>pdfjs-dist error</b>
<br />
after yarn install<br />
1. remove the pdfjs-dist folder from node_modules/pdf-viewer-reactjs/node_modules<br />
2. copy the pdfjs-dist folder present in the node_modules into the pdf-viewer-reactjs/node_modules folder<br />
3. update the node_modules/pdf-viewer-reactjs/package.json where<br />
   "dependencies": { <br />
   "pdfjs-dist": "2.5.207", <br />
   "prop-types": "^15.7.2" <br />
   }, <br />

<br />

Now to run you project, first make a build
### `yarn build`

<br />

<b>Now copy the src folder into build folder</b>

<br />

Then to run it run command
### `electron ./Build/electron.js`

<br />

Then to make an exe package run command
### `yarn package`
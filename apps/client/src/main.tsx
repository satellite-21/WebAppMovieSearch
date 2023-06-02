import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

//  ---------------------COMPONENT IMPORT----------------------------
import App from './app/app';
// ------------------------------------------------------------------
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

// ---------------------------------------------DOCUMENTATION-------------------------------------
// this code renders the component `App` 

// Inside the ReactDOM.render() function, the App component is wrapped in a <StrictMode> component.
// StrictMode is a development mode feature of React that performs additional checks and warnings to help find potential issues in the code.


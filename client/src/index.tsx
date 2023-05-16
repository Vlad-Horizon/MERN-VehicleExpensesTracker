import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

// routs
import { BrowserRouter } from "react-router-dom";

// redux
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store'; 

// Auth
import AuthContainer from './auth/AuthContainer';

// App
import App from './App';

// Report
// import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// ----------------------------------------------------------------------

root.render(
  // <React.StrictMode>
  <AuthContainer>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </HelmetProvider>
  </AuthContainer>
  // </React.StrictMode>
);

// reportWebVitals();

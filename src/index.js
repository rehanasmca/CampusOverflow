import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './application/app/App';
import * as serviceWorker from './application/service/serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
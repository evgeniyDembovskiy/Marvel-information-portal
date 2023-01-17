import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
// import MarvelService from './services/MarverService';
import './style/style.scss';

ReactDOM
    .createRoot(document.getElementById("root"))
    .render(
        <App />
    );

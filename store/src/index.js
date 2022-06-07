import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { client } from './apolloClient';


ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>

    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
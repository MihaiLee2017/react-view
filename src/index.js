import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';


import './static/css/fonts.css'
import './static/scss/index.scss'

import { Provider } from 'react-redux'
import AppRouter from './router/AppRouter'
import configureStore from './store/configureStore'
const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <AppRouter></AppRouter>
    </Provider>
    ,
    document.getElementById('root')
);
registerServiceWorker();

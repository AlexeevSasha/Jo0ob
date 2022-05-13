import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {ThemeProvider} from "styled-components";
import {theme} from './assets/css/theme'
import {store} from './redux/store'
import App from './App';

import 'antd/dist/antd.less'
import './assets/css/index.css';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
        </Provider>
    </React.StrictMode>
);



import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {createStore} from "redux";
import {Provider} from 'react-redux'
import reducers from './reducers'
import middleware from './middleware'
import ReduxThunk from "redux-thunk";


const store = createStore(reducers, middleware)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
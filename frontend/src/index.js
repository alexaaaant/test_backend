import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import {Provider} from "react-redux"
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from './store/reducers/rootReducer';
import 'bootstrap/dist/css/bootstrap.min.css';


const store = createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store = {store}>
		<App/>
	</Provider>, document.getElementById('root'))

serviceWorker.unregister()
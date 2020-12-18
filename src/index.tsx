import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.scss'; // 全局css
import 'antd/dist/antd.css'; // antd css
import Router from './router'; // 路由
// redux
import { Provider } from 'react-redux';
import { store, persistedStore } from './store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistedStore}>
			<Router />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

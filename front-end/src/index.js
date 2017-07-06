import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import ToDo from './toDo';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ToDo />, document.getElementById('root'));
registerServiceWorker();

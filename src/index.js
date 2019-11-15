import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

require('dotenv').config();

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

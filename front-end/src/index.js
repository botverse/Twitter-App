import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InfiniteS from './InfiniteScroll';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<InfiniteS />, document.getElementById('root'));
registerServiceWorker();

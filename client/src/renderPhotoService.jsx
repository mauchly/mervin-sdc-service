import React from 'react';
import ReactDOM from 'react-dom';
import PhotoService from './PhotoService.jsx';
import '../../public/style.css';

ReactDOM.hydrate(<PhotoService/>, document.getElementById('PhotoService'));
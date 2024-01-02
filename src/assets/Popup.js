import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default ({errorMessage}) => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Error : {errorMessage}</div>
  </Popup>
);


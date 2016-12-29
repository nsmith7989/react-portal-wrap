import React from 'react';
import { render } from 'react-dom';
import PortalWrap from 'react-portal-wrap';

render((
  <div className="parent">
    <h1>{'hi'}</h1>
    <PortalWrap>
      <h2>{'it works!'}</h2>
    </PortalWrap>
  </div>
), document.getElementById('root'));

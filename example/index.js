import React from 'react';
import { render } from 'react-dom';
import PortalWrap from 'react-portal-wrap';

const tree = <div className="parent">
    <PortalWrap>
        <div className="rebel" />
    </PortalWrap>
</div>;

render(tree, document.getElementById('root'));

import React from 'react';
import { render } from 'react-dom';

class PortalWrap extends React.Component {

    componentDidMount() {
        const { children, node = () => {
            const node = document.createElement('div');
            document.body.appendChild(node);
            return node;
        } } = this.props;

        this.node = (typeof node.nodeType !== 'undefined') ?
                node :
                node.call(this);

        this.renderChildren(children);
    }

    renderChildren(children) {
        this.wrapper = render(
            children,
            this.node
        );
    }

    componentWillReceiveProps(newProps) {
        // re-render children on update
        this.renderChildren(newProps.children);
    }

    render() {
        return null;
    }
}

export default PortalWrap;

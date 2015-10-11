import { Component } from 'react';
import { render } from 'react-dom';

class PortalWrap extends Component {

    static propTypes = {
        node: (props, propName) => {
            if (!props[propName]) return;
            if (typeof props[propName] !== 'function' || typeof props[propName] !== 'undefined') {
                return new Error('node should be a node or a function that returns a node');
            }
        }
    };

    componentDidMount() {
        const { children, node = () => {
            const node = document.createElement('div');
            document.body.appendChild(node);
            return node;
        } } = this.props;

        this.node = (typeof node.nodeType !== 'undefined') ?
                node :
                (typeof node === 'function') ?
                    node.call(this) :
                    null;

        this.renderChildren(children);
    }

    renderChildren(children) {
        if (!this.node) return; // do nothing, no node provided
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

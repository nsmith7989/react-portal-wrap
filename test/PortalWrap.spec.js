import React from 'react';
import { render } from 'react-dom';
import expect from 'expect';
import jsdom from 'mocha-jsdom';
import PortalWrap from '../src/index.js';

function isDecendent(parent, child) {

    var node = child.parentNode;

    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

describe('PortalWrap Default Behavior', () => {
    jsdom();

    beforeEach(() => {
        const mount = document.createElement('div');
        document.body.appendChild(mount);
        render(<div className="parent">
            <PortalWrap>
                <div className="rebel" />
            </PortalWrap>
        </div>, mount);
    });

    it('renders child element', () => {
        const rebel = document.querySelector('.rebel');
        expect(rebel).toExist();
    });

    it('renders child outside of parent', () => {
        const child = document.querySelector('.rebel');
        const nonParent = document.querySelector('.parent');
        expect(isDecendent(nonParent, child)).toBe(false);
    });

    it('rerenders rebel\'s parent as a direct child of body by default', () => {
        // parent parent should be body
        const rebel = document.querySelector('.rebel');
        expect(rebel.parentNode.parentNode).toBe(document.body);
    });

});


describe('PortalWrap Custom Behavior', () => {

    jsdom();

    beforeEach(() => {
        const mount = document.createElement('div');
        document.body.appendChild(mount);
        mount.setAttribute('id', 'root');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should render the rebel container at an arbitary dom point, event if that is unattched to the document', () => {

        render(<div className="parent">
            <PortalWrap node={() => document.createElement('section')}>
                <div className="rebel" />
            </PortalWrap>
        </div>, document.getElementById('root'));

        // not attached this should fail
        const unMountedRebel = document.querySelector('.rebel');
        expect(unMountedRebel).toNotExist();

    });

    it('should render the rebel into an attached element', () => {

        const createElement = () => {
            return document.body.appendChild(
                document.createElement('span')
            );
        };

        render(<div className="parent">
            <PortalWrap node={createElement}>
                <div className="rebel" />
            </PortalWrap>
        </div>, document.getElementById('root'));

        const rebel = document.querySelector('.rebel');

        expect(rebel.parentNode.tagName).toBe('SPAN');

    });

});

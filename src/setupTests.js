// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
	render,
	cleanup,
	fireEvent,
	waitForElement,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.React = React;
global.render = render;
global.cleanup = cleanup;
global.fireEvent = fireEvent;
global.waitForElement = waitForElement;
global.waitForElementToBeRemoved = waitForElementToBeRemoved;
global.timeoutInMS = 15000;

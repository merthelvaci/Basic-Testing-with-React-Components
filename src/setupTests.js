// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
	render,
	cleanup,
	wait,
	waitForElement,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() }); */

//global.shallow = shallow;
global.React = React;
global.render = render;
global.cleanup = cleanup;
global.userEvent = userEvent;
global.wait = wait;
global.waitForElement = waitForElement;
global.waitForElementToBeRemoved = waitForElementToBeRemoved;
global.timeoutInMs = 15000;

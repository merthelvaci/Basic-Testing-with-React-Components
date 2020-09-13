import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';

const App = () => {
	return (
		<div className="App">
			<Header header="My Header" />
			<Posts />
		</div>
	);
};

export default App;

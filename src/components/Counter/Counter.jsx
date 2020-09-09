import React, { useCallback, useState } from 'react';

const Counter = () => {
	const [counter, setCounter] = useState(0);

	const incrementCounterHandler = useCallback(() => {
		setCounter((prevState) => prevState + 1);
	}, [counter]);

	const decrementCounterHandler = useCallback(() => {
		setTimeout(() => {
			setCounter((prevState) => prevState - 1);
		}, 500);
	}, [counter]);

	return (
		<div className="counter-wrapper">
			<button data-testid="incBtn" onClick={incrementCounterHandler}>
				Increment
			</button>
			<button data-testid="decBtn" onClick={decrementCounterHandler}>
				Decrement
			</button>
			<span data-testid="counterText">Counter: {counter}</span>
		</div>
	);
};

export default Counter;

import { useReducer } from 'react';
import axios from 'axios';

export const useFetch = (url, initialState, reducer) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { error, loading, fetchedData } = state;
	const fetch = async () => {
		dispatch({
			type: 'FETCH_START',
			error: null,
			fetchedData: null,
			loading: true,
		});
		try {
			const response = await axios.get(url);
			const data = response.data;
			dispatch({
				// perform proper state update
				type: 'FETCH_SUCCESS',
				error: null,
				loading: false,
				fetchedData: data,
			});
		} catch (e) {
			dispatch({
				// in case any failure in fetching data, set "error" state to true along with proper update of other states
				type: 'FETCH_FAIL',
				error: true,
				loading: false,
				fetchedData: null,
			});
		}
	};

	return { error, loading, fetchedData, fetch };
};

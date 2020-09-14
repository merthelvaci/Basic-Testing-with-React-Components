import React, { useCallback, useReducer } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import Post from './Post';
import { useFetch } from '../../hooks/useFetch';
import Button from '../UI/Button/Button';

// reducer function which will be triggered upon each state update
export const postsReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_START':
			return {
				...state,
				error: action.error,
				loading: action.loading,
				fetchedData: action.fetchedData,
			};
		case 'FETCH_SUCCESS':
			return {
				...state,
				error: action.error,
				loading: action.loading,
				fetchedData: action.fetchedData,
			};
		case 'FETCH_FAIL':
			return {
				...state,
				error: action.error,
				loading: action.loading,
				fetchedData: action.fetchedData,
			};
		default:
			return state;
	}
};

// initial component state to be start with
const initialPostsState = {
	fetchedData: null,
	loading: false,
	error: null,
};

const Posts = () => {
	const { error, fetchedData, loading, fetch } = useFetch(
		'https://jsonplaceholder.typicode.com/posts',
		initialPostsState,
		postsReducer
	);
	return (
		<>
			{loading && <Spinner />}
			{error && !loading && (
				<div className="error-wrapper">
					<p className="error-text">An error occurred</p>
				</div>
			)}
			{!fetchedData && !error && !loading && (
				<div className="normal-content-wrapper">
					<p className="normal-content-text">
						No data fetching occurs yet
					</p>
					{/* <button type="button" onClick={fetch}>
						FETCH POSTS
					</button> */}
					<Button onClick={fetch}>FETCH POSTS</Button>
				</div>
			)}
			{fetchedData &&
				fetchedData.map((post) => (
					<Post
						key={post.body}
						body={post.body}
						id={post.id}
						title={post.title}
						userId={post.userId}
					/>
				))}
		</>
	);
};

export default Posts;

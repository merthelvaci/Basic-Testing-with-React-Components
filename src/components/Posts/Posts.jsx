import React, { useCallback, useReducer } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import Post from './Post';
import { useFetch } from '../../hooks/useFetch';

// reducer function which will be triggered upon each state update
export const postsReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_POSTS_START':
			return {
				...state,
				error: action.error,
				loading: action.loading,
				posts: action.posts,
			};
		case 'FETCH_POSTS_SUCCESS':
			return {
				...state,
				error: action.error,
				loading: action.loading,
				posts: action.posts,
			};
		case 'FETCH_POSTS_FAIL':
			return {
				...state,
				error: action.error,
				loading: action.loading,
				posts: action.posts,
			};
		default:
			return state;
	}
};

// initial component state to be start with
const initialPostsState = {
	posts: null,
	loading: false,
	error: null,
};

const actionTypes = [
	'FETCH_POSTS_START',
	'FETCH_POSTS_SUCCESS',
	'FETCH_POSTS_FAIL',
];

const Posts = () => {
	const [postsState, postsDispatch] = useReducer(
		postsReducer,
		initialPostsState
	);
	const { error, loading, posts } = postsState; // desctructure component state

	const fetchPostsHandler = useCallback(() => {
		// define a function being responsible for making request to API to fetch required data
		const fetch = async () => {
			postsDispatch({
				// before even trying to fetch data, set "loading" state to true in order to indicate a spinner to user
				type: 'FETCH_POSTS_START',
				error: null,
				posts: null,
				loading: true,
			});
			try {
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/posts'
				);
				const data = response.data;
				return postsDispatch({
					// perform proper state update
					type: 'FETCH_POSTS_SUCCESS',
					error: null,
					loading: false,
					posts: data,
				});
			} catch (e) {
				return postsDispatch({
					// in case any failure in fetching data, set "error" state to true along with proper update of other states
					type: 'FETCH_POSTS_FAIL',
					error: true,
					loading: false,
					posts: null,
				});
			}
		};
		fetch(); // call the async function
	}, []);
	return (
		<>
			{loading && <Spinner />}
			{error && !loading && (
				<div className="error-wrapper">
					<p className="error-text">An error occurred</p>
				</div>
			)}
			{!posts && !error && !loading && (
				<div className="normal-content-wrapper">
					<p className="normal-content-text">
						No data fetching occurs yet
					</p>
					<button type="button" onClick={fetchPostsHandler}>
						FETCH POSTS
					</button>
				</div>
			)}
			{posts &&
				posts.map((post) => (
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

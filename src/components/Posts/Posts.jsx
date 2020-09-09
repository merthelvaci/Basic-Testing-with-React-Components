import React, { useCallback, useReducer } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import Post from './Post';

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

const Posts = () => {
	const [postsState, postsDispatch] = useReducer(
		postsReducer,
		initialPostsState
	);
	const { error, loading, posts } = postsState; // desctructure component state

	const fetchPostsHandler = useCallback((url) => {
		try {
			postsDispatch({
				// before even trying to fetch data, set "loading" state to true in order to indicate a spinner to user
				type: 'FETCH_POSTS_START',
				error: null,
				posts: null,
				loading: true,
			});
			const fetch = async () => {
				// define a function being responsible for making request to API to fetch required data
				const response = await axios.get(url);
				return postsDispatch({
					// perform proper state update
					type: 'FETCH_POSTS_SUCCESS',
					error: null,
					loading: false,
					posts: response.data,
				});
			};
		} catch (e) {
			return postsDispatch({
				// in case any failure in fetching data, set "error" state to true along with proper update of other states
				type: 'FETCH_POSTS_FAIL',
				error: true,
				loading: false,
				posts: null,
			});
		}
		fetch(); // call the async function
	}, []);

	let content = <Spinner />; // assign a default content to be a Spinner

	if (error && !loading) {
		// if there will be an error during data fetching after loading is done
		content = (
			<div data-testid="error_wrapper" className="error-wrapper">
				<p data-testid="error_text" className="error-text">
					An error occurred
				</p>
			</div>
		);
	}

	if (!posts && !error) {
		// content to be rendered upon component mounting and unless clicking event onto "FETCH POSTS" button occurs and so no errors arise
		const url = 'https://jsonplaceholder.typicode.com/posts';
		content = (
			<div
				data-testid="normal_content_wrapper"
				className="normal-content-wrapper"
			>
				<p
					data-testid="normal_content_text"
					className="normal-content-text"
				>
					No data fetching occurs yet
				</p>
				<button
					aria-label="fetch_data"
					data-testid="fetch_btn"
					onClick={() => fetchPostsHandler(url)}
				>
					FETCH POSTS
				</button>
			</div>
		);
	}

	if (posts) {
		// upon successful data fetching occurs, update "content"
		content = posts.map((post) => (
			<Post
				key={post.body}
				body={post.body}
				id={post.id}
				title={post.title}
				userId={post.userId}
			/>
		));
	}

	return content;
};

export default Posts;

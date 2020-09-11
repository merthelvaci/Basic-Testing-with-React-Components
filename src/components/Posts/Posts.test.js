import Posts, { postsReducer } from '.';
import { screen } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

// perform cleanup operation after each test
afterEach(cleanup);

jest.mock('axios');

describe('<Posts /> component tests', () => {
	it('should render <Posts /> component correctly', () => {
		const { asFragment } = render(<Posts />);
		expect(asFragment()).toMatchSnapshot();
	});

	describe('postsReducer function tests ~~ check that postReducer function works as desired under different conditions', () => {
		let initialState = {
			error: null,
			loading: false,
			posts: null,
		};
		it('should set error state to true upon failing data fetching', () => {
			const updatedState = postsReducer(initialState, {
				type: 'FETCH_POSTS_FAIL',
				error: true,
				loading: false,
				posts: null,
			});
			expect(updatedState.error).toBeTruthy();
			expect(updatedState.loading).toBeFalsy();
			expect(updatedState.posts).toBeFalsy();
		});

		it('should set loading state to true upon starting data fetching', () => {
			const updatedState = postsReducer(initialState, {
				type: 'FETCH_POSTS_START',
				error: null,
				posts: null,
				loading: true,
			});
			expect(updatedState.error).toBeFalsy();
			expect(updatedState.loading).toBeTruthy();
			expect(updatedState.posts).toBeFalsy();
		});

		it('should reset error state to false upon successing data fetching', () => {
			initialState = {
				error: true,
				loading: false,
				posts: null,
			};
			const updatedState = postsReducer(initialState, {
				type: 'FETCH_POSTS_SUCCESS',
				error: null,
				loading: false,
			});
			expect(updatedState.error).toBeFalsy();
			expect(updatedState.loading).toBeFalsy();
		});
	});

	it('should render no post(s) at startup', () => {
		render(<Posts />);
		expect(screen.getByText(/no data fetching/i)).toBeInTheDocument();
	});

	it.only('should have a loading spinner displayed while data fetching in progress', async () => {
		const { container } = render(<Posts />);

		await act(async () => {
			await userEvent.click(
				screen.getByRole('button', { name: new RegExp(/fetch posts/i) })
			);
		});

		screen.debug();

		expect(container.querySelector('.lds-roller')).toBeInTheDocument(); // '.lds-roller' class belongs to '<div>' element in Spinner.jsx
	});

	it('should render a fake post data upon successful data fetching', async () => {
		const fakeData = {
			data: [
				{
					body: 'Post Body 1', // in order to get more detail about fetch request, please refer to Line-111 in Posts.jsx
					id: 'Post Id 1',
					title: 'Post Title 1',
					userId: 'Post User Id 1',
				},
				{
					body: 'Post Body 2', // in order to get more detail about fetch request, please refer to Line-111 in Posts.jsx
					id: 'Post Id 2',
					title: 'Post Title 2',
					userId: 'Post User Id 2',
				},
			],
		};

		expect(axios.get).toHaveBeenCalledTimes(0);

		axios.get.mockImplementationOnce(() => Promise.resolve(fakeData));

		render(<Posts />);

		/* await userEvent.click(
			screen.getByRole('button', { name: new RegExp(/fetch posts/i) })
		);

		await screen.findAllByText(/Title/); */

		await act(async () => {
			await userEvent.click(
				screen.getByRole('button', { name: new RegExp(/fetch posts/i) })
			);
		});

		await act(async () => {
			await screen.findAllByText(/Title/);
		});

		expect(axios.get).toHaveBeenCalledTimes(1);
	});
});

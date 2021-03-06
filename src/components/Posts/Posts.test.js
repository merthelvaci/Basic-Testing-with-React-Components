import Posts from '.';
import { screen, act } from '@testing-library/react';
import axiosMock from 'axios';
import { postsReducerMock } from './__mocks__/postsReducerMock';
import Button from '../UI/Button/Button';

// perform cleanup operation after each test
afterEach(() => {
	cleanup(); // perform cleanup operation to clear all DOM elements
	axiosMock.get.mockClear(); // clear mock implementation after each test so that number of calls to "axiosMock" is set to 0.
	postsReducerMock.mockClear(); // clear mock implementation after each test so that number of calls to "postsReducerMock" is set to 0.
});

describe('<Posts /> component tests', () => {
	it('should render <Posts /> component correctly', () => {
		const { asFragment } = render(<Posts />);
		expect(asFragment()).toMatchSnapshot();
	});

	describe('postsReducer function tests ~~ check that postReducer function works as desired under different conditions', () => {
		it('should set loading state to true upon starting data fetching', () => {
			const updatedState = postsReducerMock('FETCH_START');
			expect(updatedState.error).toBeFalsy();
			expect(updatedState.loading).toBeTruthy();
			expect(updatedState.fetchedData).toBeFalsy();
		});

		it('should set error state to true upon failing data fetching', () => {
			const updatedState = postsReducerMock('FETCH_FAIL');
			expect(updatedState.error).toBeTruthy();
			expect(updatedState.loading).toBeFalsy();
			expect(updatedState.fetchedData).toBeFalsy();
		});

		it('should reset error state to false upon successing data fetching', () => {
			const updatedState = postsReducerMock('FETCH_SUCCESS');
			expect(updatedState.error).toBeFalsy();
			expect(updatedState.loading).toBeFalsy();
		});
	});

	it('should render no post(s) at startup', () => {
		render(<Posts />);
		expect(screen.getByText(/no data fetching/i)).toBeInTheDocument();
	});

	it('should test if a handler function is triggered upon clicking "FETCH POSTS" button', () => {
		const onFetch = jest.fn();
		expect(onFetch).toHaveBeenCalledTimes(0);
		const { container } = render(
			<Button onClick={onFetch}>FETCH POSTS</Button>
		);
		const button = container.querySelector('Button');
		button.click();
		expect(onFetch).toHaveBeenCalledTimes(1);
	});

	it('should have a loading spinner displayed while data fetching in progress', async () => {
		await act(async () => {
			render(<Posts />);
			await userEvent.click(
				screen.getByRole('button', {
					name: new RegExp(/fetch posts/i),
				})
			);
			expect(screen.getByTestId('spinner_wrapper')).toBeInTheDocument(); // '.lds-roller' class belongs to '<div>' element in Spinner.jsx
		});
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

		expect(axiosMock.get).toHaveBeenCalledTimes(0);

		axiosMock.get.mockResolvedValueOnce(fakeData);

		render(<Posts />);

		await act(async () => {
			await userEvent.click(
				screen.getByRole('button', { name: new RegExp(/fetch posts/i) })
			);
		});

		await act(async () => {
			await screen.findAllByText(/Title/);
		});

		expect(axiosMock.get).toHaveBeenCalledTimes(1);
	});

	it('should throw an error upon failed data fetching', async () => {
		expect(axiosMock.get).toHaveBeenCalledTimes(0);

		axiosMock.get.mockImplementationOnce(() =>
			Promise.reject({ error: 'An error occurred' })
		);

		render(<Posts />);

		await act(async () => {
			await userEvent.click(
				screen.getByRole('button', { name: new RegExp(/fetch posts/i) })
			);
		});

		await act(async () => {
			await screen.findAllByText(/error occurred/i);
		});

		expect(axiosMock.get).toHaveBeenCalledTimes(1);
	});
});

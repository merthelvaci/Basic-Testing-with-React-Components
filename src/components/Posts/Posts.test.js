import Posts, { postsReducer } from '.';
import { mount } from 'enzyme';
import axiosMock from 'axios';

let asFrag;
let byLabelText;
let _container;
beforeEach(() => {
	const { asFragment, container, getByLabelText } = render(<Posts />);

	// following 3 variables are used as placeholders in each test
	asFrag = asFragment;
	byLabelText = getByLabelText;
	_container = container;
});

// perform cleanup operation after each test
afterEach(cleanup);

describe('<Posts /> component tests', () => {
	it('should render <Posts /> component correctly', () => {
		expect(asFrag()).toMatchSnapshot();
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
		const noPostsText = byLabelText('normal_content_text');
		expect(noPostsText).toHaveTextContent('No data fetching occurs yet');
	});

	it('should have a loading spinner displayed while data fetching in progress', () => {
		const fetchBtn = byLabelText('fetch_data');
		fireEvent.click(fetchBtn);

		expect(_container.querySelector('.lds-roller')).toBeInTheDocument(); // '.lds-roller' class belongs to '<div>' element in Spinner.jsx
	});

	/* it('should fetch posts data upon clicking "FETCH POSTS" button', async () => {
		// Starting from Line-86 through Line-102, Enzyme is used. In order to test using React Testing Library (RTL) implementation,
		// please comment out those lines and uncomment lines starting from Line-105
		const component = mount(<Posts />);
		const fetchPostsData = axiosMock.get.mockResolvedValueOnce({
			data: {
				// fake data representation. It has these properties since the response returned from the API has this shape as well.
				body: 'Post Body 1', // in order to get more detail about fetch request, please refer to Line-107 in Posts.jsx
				id: 'Post Id 1',
				title: 'Post Title 1',
				userId: 'Post User Id 1',
			},
		});

		expect(fetchPostsData).toHaveBeenCalledTimes(0); // ensure that before firing click event, mock function will not be called
		component
			.find('[data-testid="fetch_btn"]')
			.simulate('click', fetchPostsData);

		expect(fetchPostsData).toHaveBeenCalledTimes(1); // check that mock function was triggered upon simulating a click action

		// Following code snippet is COMPLETELY WRONG! I dont know how to test async function triggered upon click event using RTL!
		const fetchButtonEl = byRole('fetch_btn');
        fireEvent.click(fetchButtonEl);
		await axiosMock.get.mockResolvedValueOnce({
			data: {
				body: 'Post Body 1',
				id: 'Post Id 1',
				title: 'Post Title 1',
				userId: 'Post User Id 1',
			},
		});

		await waitForElement(() =>
			expect(axiosMock.get).toHaveBeenCalledTimes(1)
		);
	}); */

	it('should render a fake post data upon successful data fetching', async () => {
		axiosMock.get.mockResolvedValueOnce({
			data: {
				body: 'Post Body 1', // in order to get more detail about fetch request, please refer to Line-111 in Posts.jsx
				id: 'Post Id 1',
				title: 'Post Title 1',
				userId: 'Post User Id 1',
			},
		});

		const fetchButtonEl = byLabelText('fetch_data');
		fireEvent.click(fetchButtonEl);
		await wait(() => byLabelText('post_wrapper'));

		expect(byLabelText('post_title')).toHaveTextContent(
			'Title: Post Title 1'
		);
	});
});

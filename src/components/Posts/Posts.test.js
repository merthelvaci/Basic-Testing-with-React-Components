import Posts, { postsReducer } from '.';
import axiosMock from 'axios';

let asFrag;
let byTestId;
let byText;
let _container;
beforeEach(() => {
	const { asFragment, container, getByTestId, getByText } = render(<Posts />);
	asFrag = asFragment;
	byTestId = getByTestId;
	byText = getByText;
	_container = container;
});

afterEach(cleanup);

describe('<Posts /> component tests', () => {
	it('should render <Posts /> component correctly', () => {
		expect(asFrag()).toMatchSnapshot();
	});

	describe('postsReducer function tests', () => {
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
		const noPostsText = byTestId('normal_content_text');

		expect(noPostsText).toHaveTextContent('No data fetching occurs yet');
	});

	it('should have a loading spinner displayed while data fetching in progress', () => {
		const fetchBtn = byTestId('fetch_btn');
		fireEvent.click(fetchBtn);

		expect(_container.querySelector('.lds-roller')).toBeInTheDocument();
	});

	/* it('should fetch posts data upon clicking "FETCH POSTS" button', async () => {
		// Starting from Line-85 through Line-101, Enzyme is used. In order to test using React Testing Library (RTL) implementation,
		// please comment out those lines and uncomment lines starting from Line-103
		const component = mount(<Posts />);
		const fetchPostsData = axiosMock.get.mockResolvedValueOnce({
			data: {
				// fake data representation. It has these properties since the response returned from the API has this shape as well.
				body: 'Post Body 1', // in order to get more detail about fetch request, please refer to Line-111 in Posts.jsx
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
		const fetchButtonEl = byTestId('fetch_btn');
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

		const fetchButtonEl = byTestId('fetch_btn');
		fireEvent.click(fetchButtonEl);
		await wait(() => byTestId('post_wrapper'));

		expect(byTestId('post_title')).toHaveTextContent('Title: Post Title 1');
	});
});

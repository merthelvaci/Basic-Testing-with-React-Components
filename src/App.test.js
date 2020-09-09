import App from './App';

afterEach(cleanup);

describe('<App /> component tests', () => {
	let tree;
	it('should render App component correctly', () => {
		const { asFragment } = render(<App />);
		expect(asFragment()).toMatchSnapshot();
	});
});

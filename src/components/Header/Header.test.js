import Header from '.';

afterEach(cleanup);

describe('<Header /> component tests', () => {
	const testHeader = 'My Header';
	it('should render Header component correctly', () => {
		const { asFragment } = render(<Header header={testHeader} />);
		expect(asFragment()).toMatchSnapshot();
	});

	it(`should have h1 element with text content ${testHeader}`, () => {
		const { getByTestId } = render(<Header header={testHeader} />);
		expect(getByTestId('h1tag')).toHaveTextContent(testHeader);
	});
});

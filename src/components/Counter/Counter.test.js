import Counter from '.';

let asFrag;
let byTestId;
let byText;
beforeEach(() => {
	const { asFragment, getByTestId, getByText } = render(<Counter />);
	asFrag = asFragment;
	byTestId = getByTestId;
	byText = getByText;
});

afterEach(cleanup);

describe('<Counter /> component tests', () => {
	it('should render <Counter /> component correctly', () => {
		expect(asFrag()).toMatchSnapshot();
	});

	it('should render counter as 0 at startup', () => {
		expect(byTestId('counterText')).toHaveTextContent('0');
	});

	it('should increment counter upon clicking "Increment" button', () => {
		const incButtonEl = byTestId('incBtn');
		fireEvent.click(incButtonEl);
		expect(byTestId('counterText')).toHaveTextContent('1');
	});

	it('should dcrement counter asynchronously upon clicking "Decrement" button', async () => {
		const decButtonEl = byTestId('decBtn');
		fireEvent.click(decButtonEl);

		const counterSpan = await waitForElement(() => byText('Counter: -1'));
		expect(counterSpan).toHaveTextContent('-1');
	});
});

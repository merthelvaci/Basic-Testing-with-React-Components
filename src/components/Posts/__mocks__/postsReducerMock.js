export const postsReducerMock = jest.fn().mockImplementation((actionType) => {
	switch (actionType) {
		case 'FETCH_START':
			return {
				error: null,
				loading: true,
				fetchedData: null,
			};
		case 'FETCH_SUCCESS':
			return {
				error: null,
				loading: false,
				fetchedData: {},
			};
		case 'FETCH_FAIL':
			return {
				error: true,
				loading: false,
				fetchedData: null,
			};
		default:
			return {
				error: null,
				loading: false,
				fetchedData: null,
			};
	}
});

export const updateHeaderTitle = (title) => ({
	type: "UPDATE_HEADER_TITLE",
	title
});
export const setView = (view) => ({
	type: "SET_VIEW",
	payload: view,
});

export const input = {
	type: "SET_INPUT",
	input: "",
};

export const setModal = (modal, mode = "new") => {
	return {
		type: "SET_MODAL",
		modal,
		mode
	};
};


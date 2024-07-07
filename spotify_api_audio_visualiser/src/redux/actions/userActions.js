import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import axios from "../../utils/axios";

const fetchUserSuccess = user => {
	return {
		type: "FETCH_USER_SUCCESS",
		user
	};
};

const fetchUserError = () => {
	return {
		type: "FETCH_USER_ERROR"
	};
};

export const fetchUser = () => async (dispatch, getState) => {
  const token = getState().sessionReducer.token;
  try {
    const response = await axios.get("/me");
    dispatch({
      type: 'SET_USER',
      user: response.data,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    dispatch(fetchUserError());
  }
};

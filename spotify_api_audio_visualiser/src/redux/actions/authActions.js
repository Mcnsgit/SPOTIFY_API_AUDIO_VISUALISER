// actions/authActions.js
export const loginSuccess = (accessToken, refresh_token, expiresIn) => ({
	type: "LOGIN_SUCCESS",
	payload: { accessToken, refresh_token, expiresIn },
});
  
export const loginFailure = (error) => ({
	type: "LOGIN_FAILURE",
	payload: { error },
});
  
export const logout = () => ({
	type: "LOGOUT",
});
  
export const getAccessToken = () => ({
	type: "GET_ACCESS_TOKEN",
});
export const getRefreshToken = () => ({
	type: "GET_REFRESH_TOKEN",
});

export const refresh_tokenSuccess = (accessToken, expiresIn) => ({
	type: "REFRESH_TOKEN_SUCCESS",
	payload: { accessToken, expiresIn },
});
  
export const refresh_tokenFailure = (error) => ({
	type: "REFRESH_TOKEN_FAILURE",
	payload: { error },
});
  

export const setUserProfile = (profile) => ({
	type: "SET_USER_PROFILE",
	payload: { profile },
});
 
  
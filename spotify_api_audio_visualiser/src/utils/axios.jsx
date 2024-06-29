import axios from "axios";

const path = "https://api.spotify.com/v1";

const instance = axios.create({
	baseURL: path,
	headers: {}
});

export default instance;

// import axios from 'axios';


// const path = 'https://api.spotify.com/v1';

// export const instance = axios.create({
//   baseURL: path,
//   headers: {}
// });




// const     apiClient = axios.create({
//   baseURL: 'http://localhost:3001',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiClient.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');
//     if (token && token.access_token) {
//       config.headers.Authorization = `Bearer ${token.access_token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

// apiClient.interceptors.response.use(
//   response => response,
//   async error => {
//     if (error.response.status === 401 && !error.config._retry) {
//       error.config._retry = true;
//       const token = JSON.parse(localStorage.getItem('token')); {
//         try {
//           const response = await axios.post('http://localhost:3001/auth/refresh',{
//             params: {refresh_token: token.refresh_token },  
//           });
//           localStorage.setItem('token', JSON.stringify({
//             access_token: response.access_token,
//             refresh_token: token.refresh_token,
//             expires_at: new Date().getTime() + 3600 * 1000,
//           })); 
//           apiClient.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
//           return apiClient(error.config);
//       } catch (refreshError) {
//           console.error('Error refreshing token', refreshError);
//           return Promise.reject(refreshError);
//       }
//     }
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;



     
// export const getRefreshToken = async () => {
//   const refresh_token = localStorage.getItem('refresh_token');
//   const client_id = '1f42356ed83f46cc9ffd35c525fc8541';
//   const url = 'https://accounts.spotify.com/api/token';
//   try {
//     const response = await apiClient.post('https://accounts.spotify.com/api/token', new URLSearchParams({
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token,
//     }));
//     localStorage.setItem('access_token', response.data.access_token);
//     localStorage.setItem('refresh_token', response.data.refresh_token);
//     return response.data;
//   } catch (error) {
//     console.error('Error refreshing token', error);
//     return Promise.reject(error);
//   }
// };

// // Example API call function
// export const fetchUserProfile = async () => {
//   try {
//     const response = await apiClient.get('/me');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user profile', error);
//     return Promise.reject(error);
//   }
// };

// //   getRefreshToken();
// //   apiClient.interceptors.response.use(
// //     response => response,
// //   async error => {
// //     const originalRequest = error.config;
    
// //     if (error.response && error.response.status === 401 && !originalRequest._retry) {
// //       originalRequest._retry = true;
      
// //       try {
// //         const refresh_token = localStorage.getItem('refresh_token');
// //       }

// //       try {
// //         const refresh_token = localStorage.getItem('refresh_token');
// //         const url = 'https://accounts.spotify.com/api/token';
// //         apiClient.interceptors.response.use(
// //           response => response,
// //         async error => {
// //           const originalRequest = error.config;
          
// //           if (error.response && error.response.status === 401 && !originalRequest._retry) {
// //             originalRequest._retry = true;
            
// //             try {
// //               const refresh_token = localStorage.getItem('refresh_token');
// //             } catch (error) {
// //               console.error('Error refreshing token', error); 
// //         }
// //   const response = await axios.post('http://localhost:3001/auth/refresh', {
// //           params: {
// //             refresh_token: refresh_token,
// //           },
// //         });

// //         const { access_token } = response.data;
// //         localStorage.setItem('access_token', access_token);

// //         apiClient.defaults.headers.common.Authorization = `Bearer ${access_token}`;
// //         originalRequest.headers.Authorization = `Bearer ${access_token}`;

// //         return apiClient(originalRequest);
// //       } catch (error) {
// //         console.error('Error refreshing token', error);
// //       }
// //     }

// //     return Promise.reject(error);
// //   }
// // );


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//axiosInstance.interceptors.request.use((config) => {
//
//  return config;
//});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("🚀 ~ response:", response)
    return response;
  },
 async (error) => {
    console.log("🚀 ~ error.response:", error?.response)
    const originalReq = error.config;
    if (
      error?.response?.status === 401 &&
      originalReq &&
      !originalReq?._isRetry
    ) {
      originalReq._isRetry = true;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        console.log("🚀refresh token ~ res:", res)
        return axiosInstance.request(originalReq)
      } catch (error) {
        console.error("Error while refreshing token", error)
        throw Error("Error occurred while Refreshing token!")
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

import axios from 'axios';

// Custom Axios instance with timeout and retry
const axiosInstance = axios.create({
  timeout: 15000, // 15 seconds (adjust as needed)
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Optional
});

// Retry logic for timeouts
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (error.code === 'ECONNABORTED' || !error.response) {
      console.log('Retrying request...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s
      return axiosInstance(config); // Retry
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
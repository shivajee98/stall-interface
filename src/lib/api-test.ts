// Simple API test utility
import axios from 'axios';

export const testAPI = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api/startup";
    console.log('Testing API URL:', apiUrl);

    const response = await axios.get(apiUrl, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    console.log('API Response Status:', response.status);
    console.log('API Response Data:', response.data);
    console.log('Data length:', Array.isArray(response.data) ? response.data.length : 'Not an array');

    return response.data;
  } catch (error) {
    console.error('API Test Error:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
    throw error;
  }
};

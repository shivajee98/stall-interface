// Test the API directly
const testAPI = async () => {
  try {
    const response = await fetch('https://opexn-expo.onrender.com/api/startup');
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};

// Test alternative API endpoint if first one doesn't work
const testAlternativeAPI = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/startup');
    const data = await response.json();
    console.log('Local API Response:', data);
    return data;
  } catch (error) {
    console.error('Local API Error:', error);
    return null;
  }
};

// Export for use in components
if (typeof window !== 'undefined') {
  window.testAPI = testAPI;
  window.testAlternativeAPI = testAlternativeAPI;
}

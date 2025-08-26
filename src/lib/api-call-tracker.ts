// API call tracker for testing
let apiCallCount = 0;

export const resetApiCallCount = () => {
  apiCallCount = 0;
  console.log('API call count reset to 0');
};

export const incrementApiCallCount = () => {
  apiCallCount++;
  console.log(`API call count incremented to: ${apiCallCount}`);
  return apiCallCount;
};

export const getApiCallCount = () => {
  console.log(`Current API call count: ${apiCallCount}`);
  return apiCallCount;
};

// Helper to add to window for testing
if (typeof window !== 'undefined') {
  (window as any).apiCallTracker = {
    reset: resetApiCallCount,
    increment: incrementApiCallCount,
    get: getApiCallCount
  };
}

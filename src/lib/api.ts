import axios from "axios"

// Test function to verify API connectivity
export const testApiConnection = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log("🧪 Testing API connection to:", apiUrl);

    if (!apiUrl) {
        console.log("❌ API URL not configured");
        return { success: false, error: "API URL not configured" };
    }

    try {
        const response = await axios.get(apiUrl, { timeout: 5000 });
        console.log("✅ API Test Success - Status:", response.status);
        return { success: true, data: response.data, status: response.status };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.log("❌ API Test Failed:", errorMessage);
        return { success: false, error: errorMessage };
    }
};

export const exhibitor = async () => {
try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log("🌐 API URL:", apiUrl);

    if (!apiUrl) {
        console.error("❌ NEXT_PUBLIC_BACKEND_URL is not defined");
        return [];
    }

    console.log("🔄 Fetching exhibitor data from:", apiUrl);
    const response = await axios.get(apiUrl, {
        timeout: 10000, // 10 second timeout
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    console.log("✅ API Response:", response.data);
    return response.data
} catch (error) {
    console.error("❌ Exhibitor API error:", error);
    if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        console.error("Status Text:", error.response?.statusText);
        console.error("Response Data:", error.response?.data);
        console.error("Request URL:", error.config?.url);
    }
    return [];
}
}

import axios from "axios"

export const exhibitor = async () => {
try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}`)
    return response.data
} catch (error) {
    console.error("exhibitor api error:", error);
    return []; 
}
}

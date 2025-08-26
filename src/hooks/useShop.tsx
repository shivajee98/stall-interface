"use client"

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ExhibitorData } from "@/types";
import { getMockData } from "@/lib/mock-data";
import { incrementApiCallCount } from "@/lib/api-call-tracker";

export const useShop = () => {
    const [data, setData] = useState<ExhibitorData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiCallNumber = incrementApiCallCount();
                console.log(`🚀 Making API call #${apiCallNumber}`);

                const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api/startup";
                console.log('Fetching from API URL:', apiUrl);

                const response = await axios.get<ExhibitorData[]>(apiUrl, {
                    timeout: 10000, // 10 second timeout
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });

                console.log('API Response Status:', response.status);
                console.log('API Response Data:', response.data);
                console.log('Data length:', Array.isArray(response.data) ? response.data.length : 'Not an array');

                if (Array.isArray(response.data) && response.data.length > 0) {
                    setData(response.data);
                } else {
                    console.warn('API returned empty array or invalid data, using mock data');
                    setData(getMockData());
                }
            } catch (err) {
                console.error('API Error:', err);

                let errorMessage = 'An unknown error occurred';

                if (err instanceof AxiosError) {
                    if (err.code === 'ECONNABORTED') {
                        errorMessage = 'Request timeout - API is taking too long to respond';
                    } else if (err.response) {
                        errorMessage = `API Error: ${err.response.status} - ${err.response.statusText}`;
                        console.error('Response data:', err.response.data);
                    } else if (err.request) {
                        errorMessage = 'Network error - Unable to reach the API server';
                    } else {
                        errorMessage = err.message || 'Request setup error';
                    }
                } else if (err instanceof Error) {
                    errorMessage = err.message;
                }

                console.warn('API failed, falling back to mock data:', errorMessage);
                setData(getMockData());
                setError(errorMessage + ' (Using mock data)');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

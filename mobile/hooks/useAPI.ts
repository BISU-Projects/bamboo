import { useState } from 'react';

interface PredictionResult {
  class?: string;
  confidence?: number;
  error?: string;
  predicted_class?: string;
  probability?: number;
  score?: number;
  label?: string;
  [key: string]: any;
}

interface UseApiReturn {
  result: PredictionResult | null;
  loading: boolean;
  error: string | null;
  sendToAPI: (uri: string) => Promise<void>;
  clearResult: () => void;
}

const API_ENDPOINT = "https://bamboo-6xoh.onrender.com/predict";

export const useApi = (): UseApiReturn => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendToAPI = async (uri: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      // Extract filename and determine file type
      const filename = uri.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1].toLowerCase()}` : "image";

      // Create FormData
      const formData = new FormData();
      // @ts-ignore - React Native FormData expects this format
      formData.append("file", { 
        uri, 
        name: filename, 
        type 
      });

      // Make API request
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      setResult(json);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      setResult({ error: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const clearResult = (): void => {
    setResult(null);
    setError(null);
  };

  return {
    result,
    loading,
    error,
    sendToAPI,
    clearResult,
  };
};

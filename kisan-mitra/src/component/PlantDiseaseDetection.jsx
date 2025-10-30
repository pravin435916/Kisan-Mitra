import { useState } from "react";
import axios from "axios";

export default function PlantDiseaseDetection() {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");

  // Handle image file upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // API call to predict disease based on the uploaded image
  const handleDetection = async () => {
    if (!selectedFile) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(`http://localhost:8000/predict${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;
      setPrediction(result); // Assuming result has fields: name, accuracy, and treatments
    } catch (error) {
      console.error("Error in prediction:", error);
    }

    setIsLoading(false);
  };

  // Clear the result and reset the form
  const handleClear = () => {
    setImage(null);
    setSelectedFile(null);
    setUrl("");
    setPrediction(null);
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Plant Disease Detection</h2>
        <div>
          <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
            Upload Plant Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {image && (
          <div className="mt-4">
            <img src={image} alt="Uploaded plant" className="max-w-full h-auto rounded-lg" />
          </div>
        )}

        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleDetection}
            disabled={!selectedFile || isLoading}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
              isLoading ? "bg-gray-400" : "bg-indigo-600"
            } hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Detecting...
              </>
            ) : (
              "Detect Disease"
            )}
          </button>

          <button
            onClick={handleClear}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Clear Result
          </button>
        </div>

        {prediction && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Detection Results</h3>
            <p className="mt-2">
              <strong>Predicted Disease:</strong> {prediction.name}
            </p>
            <p>
              <strong>Accuracy:</strong> {(prediction.accuracy * 100).toFixed(2)}%
            </p>
            <div className="mt-2">
              <strong>Recommended Treatments:</strong>
              <ul className="list-disc list-inside pl-5 mt-1">
                {prediction.treatments.map((treatment, index) => (
                  <li key={index}>{treatment}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

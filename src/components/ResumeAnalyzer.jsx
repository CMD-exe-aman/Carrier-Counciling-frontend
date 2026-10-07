import { useState } from "react";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [out, setOut] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle PDF file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyze = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setOut(null);
      
     const API_URL = import.meta.env.VITE_API_URL;

      // Packages the file into FormData so the backend can read it
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_URL}/api/resume/analyze`, {
        method: "POST",
        // Note: Do NOT set "Content-Type" manually when sending FormData.
        // The browser will automatically set it to "multipart/form-data".
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to analyze resume.");

      const data = await res.json();
      setOut(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Resume Analyzer</h2>
      
      {/* File Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
        <label className="block text-gray-700 font-medium mb-4">Upload your Resume (PDF only)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 
            file:mr-4 file:py-3 file:px-6 
            file:rounded-lg file:border-0 
            file:text-sm file:font-bold 
            file:bg-blue-100 file:text-blue-700 
            hover:file:bg-blue-200 cursor-pointer transition-colors"
        />
      </div>
      
      <button 
        onClick={analyze} 
        disabled={loading || !file}
        className="mt-6 w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md"
      >
        {loading ? "Analyzing Document..." : "Analyze Resume"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 text-center font-medium">
          {error}
        </div>
      )}

      {/* Formatted Text Output Section */}
      {out && (
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
          <h3 className="font-bold text-xl text-gray-800 mb-4 border-b pb-2">Analysis Results</h3>
          
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
              <span className="font-bold text-gray-600">Score:</span>
              <span className={`font-black text-lg ${out.score > 70 ? 'text-green-600' : 'text-red-600'}`}>
                {out.score} / 100
              </span>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <span className="font-bold text-gray-600 block mb-1">Feedback:</span>
              <p className="text-gray-800">{out.feedback}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
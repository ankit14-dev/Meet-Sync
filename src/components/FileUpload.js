// src/components/FileUpload.js
import React, { useState } from "react";

export default function FileUpload({ onGenerateOutput, onReset }) {
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("None");
  const [previousUrl, setPreviousUrl] = useState("");
  const [previousFile, setPreviousFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [isOutputGenerated, setIsOutputGenerated] = useState(false);

  // Simulate file upload progress
  const simulateFileUpload = () => {
    setShowProgress(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowProgress(false), 2000); // Hide progress bar after 2 seconds
          return 100;
        }
        return oldProgress + 10;
      });
    }, 100);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name === previousFile) {
        alert("You have already uploaded this file.");
        return;
      }
      setFileName(file.name);
      setPreviousFile(file.name);
      simulateFileUpload();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (url === previousUrl) {
      alert("You have already entered this URL.");
      return;
    }
    onGenerateOutput({ url, fileName });
    setPreviousUrl(url);
    setIsOutputGenerated(true);
  };

  const handleReset = () => {
    setUrl("");
    setFileName("None");
    setProgress(0);
    setShowProgress(false);
    setIsOutputGenerated(false);
    setPreviousUrl("");
    setPreviousFile("");
    onReset(); // Clear the output display
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="urlInput" className="form-label">
            Enter URL
          </label>
          <input
            type="url"
            className="form-control"
            id="urlInput"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <p className="or-divider">OR</p>
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Upload File
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="form-control"
          />
          {showProgress && (
            <div className="progress mt-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progress}%
              </div>
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Generate
        </button>
      </form>

      {isOutputGenerated && (
        <button className="btn btn-warning mt-3" onClick={handleReset}>
          Reset
        </button>
      )}
    </>
  );
}

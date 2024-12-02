import React, { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("None");
  const [outputText, setOutputText] = useState("No output yet.");
  const [uploadProgress, setUploadProgress] = useState(0); // Progress state
  const [isUploading, setIsUploading] = useState(false); // Uploading state
  const [previousUrl, setPreviousUrl] = useState(""); // Track previously entered URL
  const [previousFile, setPreviousFile] = useState(""); // Track previously uploaded file

  // Drag and drop functions
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("dragging");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("dragging");
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("dragging");
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.name === previousFile) {
        alert("You have already uploaded this file.");
        return;
      }
      setFileName(file.name);
      simulateFileUpload(); // Start simulated upload
      setPreviousFile(file.name); // Update previous file
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name === previousFile) {
        alert("You have already uploaded this file.");
        return;
      }
      setFileName(file.name);
      simulateFileUpload(); // Start simulated upload
      setPreviousFile(file.name); // Update previous file
    }
  };

  // Simulate file upload
  const simulateFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prevProgress + 10; // Increase progress
      });
    }, 300); // Simulate progress every 300ms
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!url && fileName === "None") {
      alert("Please provide either a URL or upload a file.");
      return;
    }

    // Check if the URL is the same as the previous one
    if (url === previousUrl) {
      alert("You have already entered this URL.");
      return;
    }

    setOutputText(`
      <p><strong>URL:</strong> ${url || "N/A"}</p>
      <p><strong>File Name:</strong> ${fileName}</p>
    `);

    setPreviousUrl(url); // Update previous URL
  };

  // Handle output text download
  const handleDownload = () => {
    const blob = new Blob([outputText], { type: "text/plain" });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "output.txt";
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

  // Copy output text to clipboard
  const handleCopy = () => {
    navigator.clipboard
      .writeText(outputText.replace(/<\/?[^>]+(>|$)/g, ""))
      .then(() => {
        alert("Output copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  // Reset form and output
  const handleReset = () => {
    setUrl("");
    setFileName("None");
    setOutputText("No output yet.");
    setPreviousUrl(""); // Clear previous URL
    setPreviousFile(""); // Clear previous file
  };

  return (
    <>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              MeetSynC
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="ms-auto">
                <a href="/signup" className="btn btn-primary me-2">
                  Sign Up
                </a>
                <a href="/login" className="btn btn-outline-secondary">
                  Login
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Section */}
        <section className="container mt-5">
          <h1 className="py-3 pt-5">Welcome to MeetSynC</h1>
          <div className="row mt-4 content">
            {/* Form Column */}
            <div className="col-md-6">
              <form id="outputForm" onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="urlInput" className="form-label">
                    Enter URL
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="urlInput"
                    name="url"
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
                  <div
                    id="fileDropArea"
                    className="file-drop-area"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleFileDrop}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <p>
                      Click to add file
                      <br />
                      Or
                      <br />
                      Drag & Drop your file here
                    </p>
                    <div className="file-info">
                      File: <span id="fileName">{fileName}</span>
                    </div>
                    <input
                      type="file"
                      id="fileInput"
                      name="file"
                      hidden
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* Progress Bar */}
                {isUploading && (
                  <div className="progress mt-3">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${uploadProgress}%` }}
                      aria-valuenow={uploadProgress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {uploadProgress}%
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary mt-3">
                  Generate
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2 mt-3"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </form>
            </div>

            {/* Output Column */}
            <div className="col-md-6">
              <div className="output-area" id="output">
                <div className="output-text">
                  <div className="output-buttons">
                    <button
                      className="btn btn-success mx-2 mt-2"
                      onClick={handleDownload}
                    >
                      <i className="fa-solid fa-download"></i>
                    </button>
                    <button
                      className="btn btn-secondary mt-2"
                      onClick={handleCopy}
                    >
                      <i className="fa-regular fa-copy"></i>
                    </button>
                  </div>
                  <h4>Output</h4>
                  <hr className="container shadow" />
                  <div
                    id="outputText"
                    dangerouslySetInnerHTML={{
                      __html: outputText,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4">
          <p>
            MeetSynC is a platform designed to bring teams together and
            streamline communication and collaboration.
          </p>
          <p>&copy; 2024 MeetSynC. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

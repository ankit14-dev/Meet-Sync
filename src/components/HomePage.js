import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage() {

    const [url, setUrl] = useState('');
    const [fileName, setFileName] = useState('None');
    const [outputText, setOutputText] = useState('No output yet.');
  
    const handleFileDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        setFileName(file.name);
      }
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFileName(file.name);
      }
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      setOutputText(`
        <p><strong>URL:</strong> ${url}</p>
        <p><strong>File Name:</strong> ${fileName}</p>
      `);
    };
  
    const handleDownload = () => {
      const blob = new Blob([outputText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'output.txt';
      link.click();
      URL.revokeObjectURL(url);
    };
  
    const handleCopy = () => {
      navigator.clipboard.writeText(outputText).then(() => {
        alert('Output copied to clipboard!');
      }).catch(err => {
        console.error('Error copying text: ', err);
      });
    };

    return (
        <>
       <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">MeetSynC</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="ms-auto">
              <a href="/signup" className="btn btn-primary me-2">Sign Up</a>
              <a href="/login" className="btn btn-outline-secondary">Login</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="container mt-5">
        <h1 className="mt-10">Welcome to MeetSynC</h1>
        <div className="row mt-4 content">
          {/* Form Column */}
          <div className="col-md-6">
            <form id="outputForm" onSubmit={handleFormSubmit}>
              {/* URL Input */}
              <div className="mb-3">
                <label htmlFor="urlInput" className="form-label">Enter URL</label>
                <input
                  type="url"
                  className="form-control"
                  id="urlInput"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </div>

              {/* OR divider */}
              <p className="or-divider">OR</p>

              {/* File Upload Input with Drag and Drop */}
              <div className="mb-3">
                <label htmlFor="fileInput" className="form-label">Upload File</label>
                <div
                  id="fileDropArea"
                  className="file-drop-area"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <p>Click to add file<br />Or<br />Drag & Drop your file here</p>
                  <div className="file-info">File: <span id="fileName">{fileName}</span></div>
                  <input
                    type="file"
                    id="fileInput"
                    name="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">Generate</button>
            </form>
          </div>

          {/* Output Column */}
          <div className="col-md-6">
            <div className="output-area" id="output">
              <div className="output-text">
                <div className="output-buttons">
                  <button className="btn btn-success mt-2" onClick={handleDownload}><i className="fa-solid fa-download"></i></button>
                  <button className="btn btn-secondary mt-2" onClick={handleCopy}><i className="fa-regular fa-copy"></i></button>
                </div>
                <h4>Output</h4>
                <hr className="container shadow" style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }} />
                <div id="outputText" dangerouslySetInnerHTML={{ __html: outputText }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p>MeetSynC is a platform designed to bring teams together and streamline communication and collaboration.</p>
        <p>&copy; 2024 MeetSynC. All rights reserved.</p>
      </footer>
    </div>
      </>
      
    )
  }
  
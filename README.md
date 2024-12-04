# File Upload System with Transcription

## Overview
A React-based file upload system that allows users to upload files and receive transcriptions and summaries. The system features a progress bar, file name truncation, and real-time upload status tracking.

## Features
- File upload with progress tracking
- File name truncation for better UI
- Upload status indicators (select, uploading, done)
- Real-time progress bar
- File validation
- Transcription and summary generation
- Responsive design

## Tech Stack
- Frontend: React.js
- Backend: Node.js/Express
- API Endpoint: `http://13.201.188.161:5000/upload`
- Styling: CSS3
- Icons: Material Symbols

## Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
cd <project-directory>
npm install

# Start the development server
npm start
```

# Usage
1. Click the upload button to select a file.
2. The system will validate the file.
3. Click upload to send the file to the server.
4. The progress bar shows the upload status.
5. View transcription and summary in output tabs.
# API Endpoints
- POST /upload: Uploads file and returns transcription
    -- Accepts: multipart/form-data
    -- Returns: JSON with transcription and summary

# Component Structure
```
src/
├── components/
|   |── fileUploader
|   |   |── FileUpload.jsx
│   |   └── FileUpload.css
|   |── Footer.js
|   |── HomePage.js
|   |── Navbar.js
│   ├── Output.js
│   └── Output.css
```
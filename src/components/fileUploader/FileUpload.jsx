import React, { useRef, useState } from "react";
import "./FileUpload.css";
import axios from "axios";

function FileUpload({ callback }) {
  const inputRef = useRef();
  //State variable for tracking file related information
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("Select"); //"select"||uploading || "done"

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };
  const handleUpload = async () => {
    //if upload is already done clear and return
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }
    try {
      //set upload status to uploading
      setUploadStatus("uploading");
      //create form Data and append selected file
      const formData = new FormData();
      formData.append("file", selectedFile);
      //make a asynchronous POST Request to the serverfor file upload
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            //update progress base on upload progress
            const percentageCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentageCompleted);

          },
        }
      );
      setUploadStatus("done");
      callback(response);
    } catch (error) {
      setUploadStatus("select");
    }
  };
  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {!selectedFile && (
        <button className="file-btn" onClick={onChooseFile}>
          <span className="material-symbols-outlined">upload</span>
        </button>
      )}

      {selectedFile && (
        <>
          <div className="file-card">
            <span class="material-symbols-outlined">description</span>
            <div className="file-info">
              <div style={{ flex: 1 }}>
                {/* {display file name and progress bar} */}
                <h6>{selectedFile.name}</h6>
                <div className="progress-bg">
                  <div className="progress" style={{ width: `${progress}` }} />
                </div>
              </div>
              {/* {Display clear button or upload progress/check mark} */}

              {uploadStatus === "select" ? (
                <button onClick={clearFileInput}>
                  <span class="material-symbols-outlined close-icon">
                    close
                  </span>
                </button>
              ) : (
                <div className="check-circle">
                  {uploadStatus === "uploading" ? (
                    `${progress}%`
                  ) : uploadStatus === "done" ? (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "20px" }}
                    >
                      check
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          {/* button to fianilise upload or clear selection */}
          <button className="upload-btn" onClick={handleUpload}>
            {uploadStatus === "select" || uploadStatus === "uploading"
              ? "Upload"
              : "Done"}
          </button>
        </>
      )}
    </div>
  );
}

export default FileUpload;

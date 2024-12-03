// src/components/Navbar.js
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">MeetSynC</a>
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
            <a href="/signup" className="btn btn-primary me-2">Sign Up</a>
            <a href="/login" className="btn btn-outline-secondary">Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

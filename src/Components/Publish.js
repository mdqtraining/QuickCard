import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Using a chevron down icon for the dropdown

const Publish = () => {
  const [subject, setSubject] = useState("Your Subject Here");
  const [emailBody, setEmailBody] = useState(
    `Dear [Name],\n\nI hope you're doing well. I wanted to reach out to introduce myself and offer you assistance with [your service]. Let me know if you're interested!\n\nBest regards,\n[Your Name]`
  );
  const [selectedTemplate, setSelectedTemplate] = useState("Template1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleEmailBodyChange = (event) => {
    setEmailBody(event.target.value);
  };

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    setIsDropdownOpen(false); // Close dropdown after selecting an option
    // Update subject and body based on template selection
    switch (template) {
      case "Template1":
        setSubject("Subject for Template 1");
        setEmailBody(
          `Dear [Name],\n\nI hope you're doing well. I wanted to introduce myself and offer you [service]. Let me know if you're interested.\n\nBest regards,\n[Your Name]`
        );
        break;
      case "Template2":
        setSubject("Subject for Template 2");
        setEmailBody(
          `Hi [Name],\n\nI wanted to reach out and discuss [service]. If you're interested, let me know!\n\nCheers,\n[Your Name]`
        );
        break;
      case "Template3":
        setSubject("Subject for Template 3");
        setEmailBody(
          `Hello [Name],\n\nI hope all is well! I wanted to see if you'd be open to a quick conversation about [service]. Let me know your thoughts!\n\nBest,\n[Your Name]`
        );
        break;
      default:
        setSubject("Your Subject Here");
        setEmailBody(
          `Dear [Name],\n\nI hope you're doing well. I wanted to reach out to introduce myself and offer you assistance with [your service]. Let me know if you're interested!\n\nBest regards,\n[Your Name]`
        );
        break;
    }
  };

  const handlePublish = () => {
    alert("Email Published Successfully!");
    setSubject("Your Subject Here");
    setEmailBody(
      `Dear [Name],\n\nI hope you're doing well. I wanted to reach out to introduce myself and offer you assistance with [your service]. Let me know if you're interested!\n\nBest regards,\n[Your Name]`
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        // paddingTop: "none",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
        boxSizing: "border-box",
        borderRadius: "30px",
        justifyContent: "center", // Center content vertically
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {/* Title if needed */}
      </h2>

      <div
        style={{
          width: "100%", // Make container width flexible
          maxWidth: "800px", // Limit max width for large screens
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "30px",
        }}
      >
        {/* Custom Template Dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="template"
            style={{
              fontSize: { xs: "10px", sm: "14px", md: "16px" },
              marginBottom: "8px",
              display: "block",
              textAlign: "left",
              fontWeight: "600",
            }}
          >
            Select Template
          </label>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#f9f9f9",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 0 10px rgba(61, 90, 128, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "none";
            }}
          >
            <span>{selectedTemplate}</span>
            <FaChevronDown /> {/* Dropdown Icon */}
          </div>

          {isDropdownOpen && (
            <div
              style={{
                marginTop: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                onClick={() => handleTemplateChange("Template1")}
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#453c72"; // Hover color
                  e.target.style.color = "white"; // Text color white
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#fff"; // Reset background
                  e.target.style.color = "black"; // Reset text color
                }}
              >
                Template 1
              </div>
              <div
                onClick={() => handleTemplateChange("Template2")}
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#453c72"; // Hover color
                  e.target.style.color = "white"; // Text color white
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#fff"; // Reset background
                  e.target.style.color = "black"; // Reset text color
                }}
              >
                Template 2
              </div>
              <div
                onClick={() => handleTemplateChange("Template3")}
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#453c72"; // Hover color
                  e.target.style.color = "white"; // Text color white
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#fff"; // Reset background
                  e.target.style.color = "black"; // Reset text color
                }}
              >
                Template 3
              </div>
            </div>
          )}
        </div>

        {/* Subject Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="subject"
            style={{
              fontSize: "16px",
              marginBottom: "8px",
              display: "block",
              textAlign: "left",
              fontWeight: "600",
            }}
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
            placeholder="Enter the subject"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
              backgroundColor: "#f9f9f9",
            }}
          />
        </div>

        {/* Email Body */}
        <div style={{ marginBottom: "20px" }}>
          <textarea
            id="emailBody"
            value={emailBody}
            onChange={handleEmailBodyChange}
            rows={10}
            placeholder="Enter the body of the email"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
              backgroundColor: "#f9f9f9",
            }}
          />
        </div>

        {/* Publish Button */}
        <div>
          <button
            onClick={handlePublish}
            style={{
              width: "150px",
              padding: "12px",
              backgroundColor: "#453c72",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;

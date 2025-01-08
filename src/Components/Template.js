import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const Template = () => {
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [richContent, setRichContent] = useState(""); // For rich-text editor content

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Template Submitted:", {
      templateName,
      subject,
      richContent,
    });
  };

  return (
    <div
      className="template"
      style={{
        padding: "20px",
        // paddingTop: "10px",
        backgroundColor: "#f4f4f9", // Background color added here
        borderRadius: "30px",
        minHeight: "100vh",
        width: "100%", // Ensure full width
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 0,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold",
          color: "#333",
          // paddingTop: "20px",
        }}
      ></Typography>
      <Container
        maxWidth="800px" // Container width limited for better responsiveness
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Heading for the Template form */}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="templateName"
              className="form-label"
              style={{
                display: "block",
                textAlign: "left",
                marginBottom: "8px",
              }}
            >
              Template Name
            </label>
            <TextField
              id="templateName"
              variant="outlined"
              fullWidth
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
              style={{
                backgroundColor: "#fff",
                marginBottom: "20px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="subject"
              className="form-label"
              style={{
                display: "block",
                textAlign: "left",
                marginBottom: "8px",
              }}
            >
              Subject
            </label>
            <TextField
              id="subject"
              variant="outlined"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              style={{
                backgroundColor: "#fff",
                marginBottom: "20px",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="richContent"
              className="form-label"
              style={{
                display: "block",
                textAlign: "left",
                marginBottom: "8px",
              }}
            >
              Message
            </label>
            <ReactQuill
              id="richContent"
              theme="snow"
              value={richContent}
              onChange={setRichContent}
              style={{
                height: "200px",
                marginBottom: "20px",
                backgroundColor: "#fff",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "60px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#453c72" }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Template;

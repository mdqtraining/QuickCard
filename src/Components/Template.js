import React, { useState } from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../App.css"; // Import global styles

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
        backgroundColor: "#f4f4f9", // Background color added here
        borderRadius: "30px",
        minHeight: "100vh",
        width: "100%", // Ensure full width
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="800px"
        sx={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <label htmlFor="templateName" className="form-label">
              Template Name
            </label>
            <TextField
              id="templateName"
              variant="outlined"
              fullWidth
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
            />
          </Box>

          <Box mb={2}>
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <TextField
              id="subject"
              variant="outlined"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
            />
          </Box>

          <Box mb={2}>
            <label htmlFor="richContent" className="form-label">
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
                // fontSize: { xs: "8px", sm: "12px" },
              }}
            />
          </Box>

          {/* Submit button container */}
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{
              mt: { xs: "130px", sm: "60px" },
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#453c72",
                fontSize: { xs: "10px", sm: "12px" },
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default Template;

import React, { useState } from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/system";

const DragDropArea = styled(Box)(({ theme }) => ({
  border: "2px dashed #52459f",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center",
  color: "#1976d2",
  cursor: "pointer",
  marginBottom: "20px",
}));

const ImageUploading = () => {
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState(false);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    if (file) {
      setNotification(true);
    } else {
      alert("Please upload an image before submitting.");
    }
  };

  const handleCloseNotification = () => {
    setNotification(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f9",
        padding: "40px",
        borderRadius: "30px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Upload Image
      </Typography>
      <DragDropArea
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ color: "#52459f" }}
      >
        <Typography style={{ color: "#52459f" }}>
          DRAG AND DROP FILES HERE OR CLICK TO SELECT
        </Typography>
        <input
          type="file"
          style={{ display: "none" }}
          id="file-upload"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            component="span"
            sx={{ mt: 2, backgroundColor: "#52459f", color: "white" }}
          >
            Upload Images
          </Button>
        </label>
      </DragDropArea>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{
          marginTop: "40px",
          backgroundColor: "#52459f",
          color: "white",
        }}
      >
        Submit
      </Button>

      <Snackbar
        open={notification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="success"
          sx={{ width: "100%" }}
        >
          Uploaded successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ImageUploading;

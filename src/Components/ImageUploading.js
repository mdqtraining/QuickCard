import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
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

  // Check if the screen size is mobile
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f9",
        padding: isMobile ? "10px" : "40px", // Reduce padding for mobile
        borderRadius: "30px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: isMobile ? "20px" : "32px" }}
      >
        Upload Image
      </Typography>

      <DragDropArea
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ color: "#52459f" }}
      >
        <Typography sx={{ fontSize: isMobile ? "10px" : "16px" }}>
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
            sx={{
              mt: 2,
              backgroundColor: "#52459f",
              color: "white",
              fontSize: isMobile ? "10px" : "16px", // Smaller font size on mobile
              padding: isMobile ? "6px 12px" : "8px 16px", // Smaller padding on mobile
            }}
          >
            Upload Images
          </Button>
        </label>
      </DragDropArea>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          marginTop: { xs: "20px", sm: "30px", md: "40px" },
          backgroundColor: "#52459f",
          color: "white",
          fontSize: isMobile ? "10px" : "16px", // Smaller font size on mobile
          padding: isMobile ? "6px 12px" : "8px 16px", // Smaller padding on mobile
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

import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  Tooltip,
  TablePagination,
  InputBase,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add"; // Import AddIcon for the mobile view

const TemplateTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState([
    { id: 1, name: "Template 1", action: "Action 1" },
    { id: 2, name: "Template 2", action: "Action 2" },
    { id: 3, name: "Template 3", action: "Action 3" },
    { id: 4, name: "Template 4", action: "Action 4" },
    { id: 5, name: "Template 5", action: "Action 5" },
    { id: 6, name: "Template 6", action: "Action 6" },
    { id: 7, name: "Template 7", action: "Action 7" },
  ]);
  const [editedTemplate, setEditedTemplate] = useState({
    name: "",
    action: "",
  });
  const [isAddTemplate, setIsAddTemplate] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Media query for detecting screen size (mobile vs desktop)
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleOpenDialog = (isAdd = false, template = null) => {
    setIsAddTemplate(isAdd);
    setOpenDialog(true);
    if (isAdd) {
      setEditedTemplate({ name: "", action: "" });
    } else {
      setSelectedTemplate(template);
      setEditedTemplate({ name: template.name, action: template.action });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    if (isAddTemplate) {
      const newTemplate = {
        id: templates.length + 1,
        name: editedTemplate.name,
        action: "",
      };
      setTemplates([...templates, newTemplate]);
    } else {
      const updatedTemplates = templates.map((template) =>
        template.id === selectedTemplate.id
          ? {
              ...template,
              name: editedTemplate.name,
              action: editedTemplate.action,
            }
          : template
      );
      setTemplates(updatedTemplates);
    }
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    const filteredTemplates = templates.filter(
      (template) => template.id !== id
    );
    setTemplates(filteredTemplates);
  };

  const handleView = (template) => {
    alert(`Viewing template: ${template.name}\nAction: ${template.action}`);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleDeleteSelected = () => {
    const filteredTemplates = templates.filter(
      (template) => !selectedRows.includes(template.id)
    );
    setTemplates(filteredTemplates);
    setSelectedRows([]);
  };

  // Handle Pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when changing rows per page
  };

  // Filter templates based on search query
  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
        padding: "20px",
        position: "relative",
        // width: "90%",
        maxWidth: "1200px",
        margin: "0 auto",
        borderRadius: "30px",
        position: "relative",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: "20px", alignItems: "center" }}
      >
        {/* Create Template Button */}
        <Grid item xs={6} sm={6} md={6}>
          <Button
            variant="contained"
            onClick={() => handleOpenDialog(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#453c72",
              fontWeight: "bold",
              justifyContent: "center",
              padding: "6px 10px",
              fontSize: isMobile ? "10px" : "12px",
              minWidth: "unset",
              width: "auto",
            }}
          >
            {isMobile ? (
              <AddIcon sx={{ fontSize: "20px" }} />
            ) : (
              "Create Template"
            )}
          </Button>
        </Grid>

        {/* Search Bar */}
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          sx={{
            display: "flex",
            justifyContent: isMobile ? "flex-start" : "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f2f6fa",
              borderRadius: "4px",
              width: isMobile ? "100%" : "200px", // Set width to 200px for desktop
              padding: "2px 10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <SearchIcon sx={{ color: "#453C72" }} />
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                color: "#453C72",
                fontSize: "14px",
              }}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>

      {selectedRows.length > 0 && (
        <Tooltip title="Delete Selected">
          <IconButton
            onClick={handleDeleteSelected}
            style={{
              position: "absolute",
              top: "127px",
              right: "80px",
              backgroundColor: "#f44336",
              color: "#fff",
              zIndex: 10,
            }}
          >
            <MdOutlineDelete />
          </IconButton>
        </Tooltip>
      )}

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
              <TableCell sx={{ fontSize: isMobile ? "12px" : "14px" }}>
                <Checkbox
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < filteredTemplates.length
                  }
                  checked={
                    selectedRows.length > 0 &&
                    selectedRows.length === filteredTemplates.length
                  }
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked
                        ? filteredTemplates.map((template) => template.id)
                        : []
                    )
                  }
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: isMobile ? "12px" : "14px" }}
              >
                ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: isMobile ? "12px" : "14px" }}
              >
                Template Name
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: isMobile ? "12px" : "14px" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTemplates
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((template, index) => (
                <TableRow
                  key={template.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f3f3f3",
                  }}
                >
                  <TableCell sx={{ fontSize: isMobile ? "12px" : "14px" }}>
                    <Checkbox
                      checked={selectedRows.includes(template.id)}
                      onChange={() => handleCheckboxChange(template.id)}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: isMobile ? "12px" : "14px" }}
                  >
                    {String(template.id).padStart(3, "0")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: isMobile ? "12px" : "14px" }}
                  >
                    {template.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: isMobile ? "12px" : "14px" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <Tooltip title="View">
                        <IconButton onClick={() => handleView(template)}>
                          <AiOutlineEye style={{ fontSize: "20px" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => handleOpenDialog(false, template)}
                        >
                          <BiSolidEdit style={{ fontSize: "20px" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDelete(template.id)}
                          color="error"
                        >
                          <MdOutlineDelete
                            style={{ fontSize: "20px", color: "gray" }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTemplates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          fontSize: isMobile ? "12px" : "14px", // Adjust font size for mobile view
        }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {isAddTemplate ? "Add Template" : "Edit Template"}{" "}
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Template Name"
            variant="outlined"
            fullWidth
            value={editedTemplate.name}
            onChange={(e) =>
              setEditedTemplate({ ...editedTemplate, name: e.target.value })
            }
            sx={{
              marginTop: "10px",
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              },
              "& .MuiInputLabel-root": {
                fontSize: "16px",
                color: "#333",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TemplateTable;

import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Paper,
  TablePagination,
  InputBase,
} from "@mui/material";
import { LuSend } from "react-icons/lu";
import { IoAlert } from "react-icons/io5";
import { LuReply } from "react-icons/lu";
import SearchIcon from "@mui/icons-material/Search";

const Status = () => {
  const [currentTab, setCurrentTab] = useState("sent");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const emailStatusData = {
    sent: [
      { id: 1, recipient: "user1@example.com", subject: "Meeting Update" },
      { id: 2, recipient: "user2@example.com", subject: "Invoice Details" },
      { id: 3, recipient: "user3@example.com", subject: "Project Update" },
      { id: 4, recipient: "user4@example.com", subject: "Event Invitation" },
      { id: 5, recipient: "user5@example.com", subject: "Support Request" },
      { id: 6, recipient: "user6@example.com", subject: "Follow-up" },
    ],
    failed: [
      { id: 7, recipient: "user7@example.com", subject: "Proposal Rejected" },
      { id: 8, recipient: "user8@example.com", subject: "Event Failure" },
      { id: 9, recipient: "user9@example.com", subject: "System Error" },
    ],
    responded: [
      { id: 10, recipient: "user10@example.com", subject: "Query Response" },
      { id: 11, recipient: "user11@example.com", subject: "Request Answer" },
    ],
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setPage(0); // Reset to the first page when the tab changes
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const filterEmails = (emails) => {
    if (!searchQuery) return emails;
    return emails.filter(
      (email) =>
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.recipient.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderEmails = (emails) => {
    const filteredEmails = filterEmails(emails);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const emailsToDisplay = filteredEmails.slice(startIndex, endIndex);

    return emailsToDisplay.length > 0 ? (
      <List sx={{ padding: 0 }}>
        {emailsToDisplay.map((email) => (
          <ListItem
            key={email.id}
            sx={{
              borderBottom: "1px solid #e0e0e0",
              ":hover": {
                backgroundColor: "#f9f9f9", // Light hover effect
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
              },
              transition: "background-color 0.3s, box-shadow 0.3s",
            }}
          >
            <ListItemText
              primary={email.subject}
              secondary={`Recipient: ${email.recipient}`}
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "16px",
                color: "#333", // Neutral color for primary text
              }}
              secondaryTypographyProps={{
                color: "#666",
                fontSize: "14px",
              }}
            />
          </ListItem>
        ))}
      </List>
    ) : (
      <Typography
        color="textSecondary"
        sx={{ textAlign: "center", fontStyle: "italic" }}
      >
        No emails match your search.
      </Typography>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        paddingTop: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f4f4f9",
        borderRadius: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f2f6fa",
          borderRadius: "4px",
          width: "200px",
          padding: "2px 10px",
          position: "absolute", // Make sure it stays on the right
          right: "120px", // Position to the right side
          marginbottom: "20px",
          boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <SearchIcon sx={{ color: "#635bff" }} />
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: "#635bff",
            fontSize: "14px",
          }}
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>

      <Paper
        elevation={3}
        sx={{
          maxWidth: "1200px",
          width: "90%",
          padding: "30px",
          borderRadius: "8px",
          marginTop: "30px",
          paddingBottom: "30px",
          marginTop: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
            paddingBottom: "10px",
          }}
        >
          <Typography
            sx={{
              fontWeight: currentTab === "sent" ? "bold" : "normal",
              backgroundColor: currentTab === "sent" ? "#635bff" : "#e0e0e0",
              color: currentTab === "sent" ? "white" : "black",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "6px",
              ":hover": {
                backgroundColor: currentTab === "sent" ? "#635bff" : "#d6d6d6",
              },
              fontSize: "16px",
            }}
            onClick={() => setCurrentTab("sent")}
          >
            <LuSend /> Sent
          </Typography>
          <Typography
            sx={{
              fontWeight: currentTab === "failed" ? "bold" : "normal",
              backgroundColor: currentTab === "failed" ? "#635bff" : "#e0e0e0",
              color: currentTab === "failed" ? "white" : "black",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "6px",
              ":hover": {
                backgroundColor:
                  currentTab === "failed" ? "#635bff" : "#d6d6d6",
              },
              fontSize: "16px",
            }}
            onClick={() => setCurrentTab("failed")}
          >
            <IoAlert /> Failed
          </Typography>
          <Typography
            sx={{
              fontWeight: currentTab === "responded" ? "bold" : "normal",
              backgroundColor:
                currentTab === "responded" ? "#635bff" : "#e0e0e0",
              color: currentTab === "responded" ? "white" : "black",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "6px",
              ":hover": {
                backgroundColor:
                  currentTab === "responded" ? "#635bff" : "#d6d6d6",
              },
              fontSize: "16px",
            }}
            onClick={() => setCurrentTab("responded")}
          >
            <LuReply /> Responded
          </Typography>
        </Box>

        <Box sx={{ paddingBottom: "20px" }}>
          {renderEmails(emailStatusData[currentTab])}
        </Box>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filterEmails(emailStatusData[currentTab]).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Status;

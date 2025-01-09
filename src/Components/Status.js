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
  useMediaQuery,
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
  const isMobile = useMediaQuery("(max-width: 600px)"); // Detect mobile screens

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                backgroundColor: "#f9f9f9",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
                color: "#333",
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
        paddingTop: "20px",
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
          justifyContent: "flex-end",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f2f6fa",
            borderRadius: "4px",
            width: { xs: "120px", sm: "200px" },
            padding: "2px 10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            justifyContent: "space-between",
          }}
        >
          <SearchIcon
            sx={{
              color: "#635bff",
              fontSize: { xs: "18px", sm: "20px" },
            }}
          />
          <InputBase
            sx={{
              flex: 1,
              color: "#635bff",
              fontSize: "14px",
            }}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
      </Box>

      <Paper
        elevation={3}
        sx={{
          maxWidth: "1200px",
          width: { xs: "100%", sm: "90%", md: "100%" },
          padding: "30px",
          borderRadius: "8px",
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
          {["sent", "failed", "responded"].map((tab) => {
            const isActive = currentTab === tab;
            const Icon =
              tab === "sent" ? LuSend : tab === "failed" ? IoAlert : LuReply;

            return (
              <Typography
                key={tab}
                sx={{
                  fontWeight: isActive ? "bold" : "normal",
                  backgroundColor: isActive ? "#52459f" : "#e0e0e0",
                  color: isActive ? "white" : "black",
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  boxShadow: isActive
                    ? "0 4px 8px rgba(82, 69, 159, 0.5)"
                    : "none",
                  ":hover": {
                    backgroundColor: isActive ? "#52459f" : "#d6d6d6",
                  },
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setCurrentTab(tab)}
              >
                {isMobile ? (
                  <Icon />
                ) : (
                  <>
                    <Icon /> {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </>
                )}
              </Typography>
            );
          })}
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
          sx={{
            "& .MuiTablePagination-selectLabel": {
              fontSize: isMobile ? "12px" : "14px", // Adjust font size for mobile
            },
            "& .MuiTablePagination-select": {
              fontSize: isMobile ? "12px" : "14px", // Adjust font size for mobile
              padding: isMobile ? "4px 8px" : "6px 10px", // Adjust padding for mobile
            },
            "& .MuiTablePagination-toolbar": {
              minHeight: isMobile ? "48px" : "56px", // Adjust toolbar height for mobile
            },
            "& .MuiTablePagination-caption": {
              fontSize: isMobile ? "12px" : "14px", // Adjust font size for mobile
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default Status;

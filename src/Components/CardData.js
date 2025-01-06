import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputBase,
  TablePagination,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const data = [
  {
    no: 1,
    name: "Dharani Mano",
    email: "dharanim@mdqualityapps.in",
    mobile: "+91 9876543210",
    address: "2B, Vel Nagar, Maduravoyal, Chennai",
    position: "Software Developer",
    companyName: "MDQuality apps solutions LLP",
    website: "www.mdqualityapps.in",
  },
  {
    no: 2,
    name: "Divya",
    email: "divya@mdqualityapps.in",
    mobile: "+91 9876543210",
    address: "2B, Vel Nagar, Maduravoyal, Chennai",
    position: "Software Developer",
    companyName: "MDQuality apps solutions LLP",
    website: "www.mdqualityapps.in",
  },
  {
    no: 3,
    name: "Manikandan",
    email: "manikandan@mdqualityapps.in",
    mobile: "+91 9876543210",
    address: "2B, Vel Nagar, Maduravoyal, Chennai",
    position: "Software Developer",
    companyName: "MDQuality apps solutions LLP",
    website: "www.mdqualityapps.in",
  },
  {
    no: 1,
    name: "Mohammed Rizwan",
    email: "dharanim@mdqualityapps.in",
    mobile: "+91 9876543210",
    address: "2B, Vel Nagar, Maduravoyal, Chennai",
    position: "Software Developer",
    companyName: "MDQuality apps solutions LLP",
    website: "www.mdqualityapps.in",
  },
  {
    no: 1,
    name: "Bhuvaneswari",
    email: "bhuvaneswari@mdqualityapps.in",
    mobile: "+91 9876543210",
    address: "2B, Vel Nagar, Maduravoyal, Chennai",
    position: "Software Developer",
    companyName: "MDQuality apps solutions LLP",
    website: "www.mdqualityapps.in",
  },
  {
    no: 1,
    name: "Ganesh B",
    email: "ganeshb@mdqualityapps.in",
    mobile: "+91 9876543210",
    address: "2B, Vel Nagar, Maduravoyal, Chennai",
    position: "Software Developer",
    companyName: "MDQuality apps solutions LLP",
    website: "www.mdqualityapps.in",
  },
];

function CardData() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase()) ||
      row.mobile.toLowerCase().includes(search.toLowerCase()) ||
      row.address.toLowerCase().includes(search.toLowerCase()) ||
      row.position.toLowerCase().includes(search.toLowerCase()) ||
      row.companyName.toLowerCase().includes(search.toLowerCase()) ||
      row.website.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div
      style={{
        padding: "40px",
        borderRadius: "30px",
        backgroundColor: "#f2f6fa",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          padding: "20px",
        }}
      >
        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f2f6fa",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "200px",
            padding: "2px 10px",
            position: "absolute",
            right: "40px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            marginTop: "60px",
            width: "100%",
            overflowX: "auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#52459f",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  No.
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#52459f",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#52459f",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#52459f",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Mobile
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#52459f",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Address
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#52459f",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Position
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#52459f",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Company Name
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#52459f",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Website
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.no}>
                    <TableCell>{row.no}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.position}</TableCell>
                    <TableCell>{row.companyName}</TableCell>
                    <TableCell>{row.website}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            width: "100%", // Full width for pagination
          }}
        />
      </Box>
    </div>
  );
}

export default CardData;

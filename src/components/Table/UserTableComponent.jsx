import React, { useState,useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,  
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  TableSortLabel,
  Skeleton,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import UserViewDetailDialogComponent from "../Dialog/User/UserViewDetailDialogComponent.jsx";
import DeleteDialogComponent from "../Dialog/DeleteDialogComponent.jsx";
import UserCreateDialogComponent from "../Dialog/User/create/UserCreateDialogComponent.jsx";
import { _DecryptService } from "../../service/EncryptDecryptService.js";
import _JWTDecodeService from './../../service/JWTDecodeService';
import UserResetFailCountDialog from "../Dialog/User/UserResetFailCountDialog.jsx";

const UserTableComponent = ({
  data,
  showIdColumns,
  tableHeaders,
  isLoading,  
  handleDelete,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false); // State for managing UserCreateDialogComponent
  const [openResetDialog, setOpenResetDialog] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [Email, setEmail] = useState('')
  useEffect(() => {
    const decryptedToken = _DecryptService(sessionStorage.getItem("token"));

    // Step 2: Decode the token to get the UserId (assuming it's in the payload of the token)
    const decodedToken = _JWTDecodeService(decryptedToken);
    const email = _DecryptService(decodedToken?.Email);

    setEmail(email)
    

  }, [])

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle sorting request
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);    
  };

  // Handle menu click
  const handleMoreClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  // Close menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle view details click
  const handleViewDetailsClick = () => {
    setOpenDetailDialog(true);
    handleClose();
  };

  //handel reset fail count
  const handleResetFailCount = () => {
    setOpenResetDialog(true);
    handleClose();
  }

  // Handle delete click
  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);    
    handleClose();
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setOpenResetDialog(false);
    setOpenDetailDialog(false);
    setOpenDeleteDialog(false);
    setOpenCreateDialog(false); // Close the create user dialog
    setSelectedRow(null);
  };

  // Filter and sort data
  const filteredData = data.filter((row) =>
    tableHeaders.some(
      (header) =>
        row[header] &&
        row[header].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === "") return 0;
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={tableHeaders.length}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" flexGrow={1}>
                    <TextField
                      label="Search"
                      variant="outlined"
                      size="small"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      style={{ marginRight: 10 }}
                    />
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    color="primary"
                    onClick={() => setOpenCreateDialog(true)} // Open the create user dialog
                    sx={{
                      justifySelf: "end",
                      textTransform: 'none'
                    }}
                  >
                    Add New User
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell
                  key={header}
                  style={{
                    display:
                      (header.includes("Id") || header.includes("By")) &&
                      !showIdColumns
                        ? "none"
                        : "table-cell",
                  }}
                  sortDirection={orderBy === header ? order : false}
                >
                  {header === "Actions" ? (
                    header
                  ) : (
                    <TableSortLabel
                      active={orderBy === header}
                      direction={orderBy === header ? order : "asc"}
                      onClick={() => handleRequestSort(header)}
                    >
                      {header}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array.from(new Array(10)).map((_, index) => (
                <TableRow key={index}>
                  {tableHeaders.map((header) => (
                    <TableCell
                      key={header}
                      style={{
                        display:
                          header.includes("Id") && !showIdColumns
                            ? "none"
                            : "table-cell",
                      }}
                    >
                      <Skeleton variant="text" width="100%" height={40} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : sortedData.length > 0 ? (
              sortedData.map((row) => (
                <TableRow key={row.UserId}>
                  {tableHeaders.map((header) => (
                    <TableCell
                      key={header}
                      style={{
                        display:
                          (header.includes("Id") || header.includes("By")) &&
                          !showIdColumns
                            ? "none"
                            : "table-cell",
                      }}
                    >
                      {header === "Actions" ? (
                        <IconButton
                          onClick={(event) => handleMoreClick(event, row)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      ) : (
                        row[header] || ""
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <UserViewDetailDialogComponent
        open={openDetailDialog}
        onClose={handleDialogClose}
        rowData={selectedRow}
        onRefresh={onRefresh}
      />
      <DeleteDialogComponent
        open={openDeleteDialog}
        onClose={handleDialogClose}
        onDelete={() => handleDelete(selectedRow,setOpenDeleteDialog)} // Pass the delete handler to the dialog
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleViewDetailsClick}>View Details</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        {Email === "pyaephyoswe@gmail.com" && (
          <MenuItem onClick={handleResetFailCount}>Reset Fail Count</MenuItem>
        )}
      </Menu>
      {/* User Create Dialog */}
      <UserCreateDialogComponent
        open={openCreateDialog}
        onClose={handleDialogClose}        
        onRefresh={onRefresh}
      />

      <UserResetFailCountDialog
      rowData={selectedRow}
        open={openResetDialog}
        onClose={handleDialogClose}        
        onRefresh={onRefresh}
      />
    </>
  );
};

export default UserTableComponent;

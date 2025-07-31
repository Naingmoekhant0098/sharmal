import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Button,
  TextField,
  TableSortLabel,
  Skeleton,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon
import DeleteDialogComponent from "../Dialog/DeleteDialogComponent";
import { stableSort, getComparator } from "../../service/TableSortingService";

import { toast } from "react-toastify";
import AdsViewDetailDialogComponent from "../Dialog/Ads/AdsViewDetailDialogComponent";
import AdsDialog from "../Dialog/Ads/AdsDialog";
import theme from "../../../src/theme.js";
import { ThemeProvider } from "@mui/material/styles";

const AdsTableComponent = ({
  data,
  showIdColumns,
  handleStatusChange,
  tableHeaders,
  isLoading,
  setIsFilter,
  handleDelete,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogStatus, setdialogStatus] = useState('create')

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
    setAnchorEl(event.target);
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

  // Handle delete click
  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleClose();
  };



  // Handle dialog close
  const handleDialogClose = (setOpenDialog, setSelectedRow) => {
    setOpenDialog(false);
    setSelectedRow(null);
  };


  // Extract and process ads data
  const adsData =
    data.map((item) => {
      const ads = item.Ads;
      const imageNames = item.Images.map((image) => image.ImageName).join(", ");
      return {
        ...ads,
        ImageName: imageNames || "No Image",
        // Store `AdsPagePlacements` internally if needed for other operations
        AdsPagePlacements: item.AdsPagePlacements || [],
        image: item.Images || []
      };
    }) || [];

  // Filter data based on search term
  const filteredData = adsData.filter((row) =>
    tableHeaders.some(
      (header) =>
        row[header] &&
        row[header].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort filtered data
  const sortedData = stableSort(filteredData, getComparator(order, orderBy));

  // For handling create ads dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenCreateAdsDialoge = () => {
    setDialogOpen(true);
    setdialogStatus("create")
  };

  const handleCloseCreateAdsDialoge = () => {
    setDialogOpen(false);
  };

  const handleOpenEditAdsDialoge = () => {
    setDialogOpen(true);
    setdialogStatus("edit")
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={tableHeaders.length}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ marginRight: 10 }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    onClick={() => setIsFilter(true)}
                    style={{ marginRight: 10 }}
                  >
                    Filter
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    color="primary"
                    onClick={handleOpenCreateAdsDialoge}
                    sx={{
                      marginLeft: "auto",
                      textTransform: "none",
                    }}
                  >
                    Add New Ads
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
                      (header.includes("Id") ||
                        header.includes("By") ||
                        header.includes("ImageName")) &&
                        !showIdColumns
                        ? "none"
                        : "table-cell",
                  }}
                  sortDirection={orderBy === header ? order : false}
                >
                  {header === "Done" || header === "Actions" ? (
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
                <TableRow key={row.AdsId}>
                  {tableHeaders.map((header) => {
                    const cellContent = row[header];

                    return (
                      <TableCell
                        key={header}
                        style={{
                          display:
                            (header.includes("Id") ||
                              header.includes("By") ||
                              header.includes("ImageName")) &&
                              !showIdColumns
                              ? "none"
                              : "table-cell",
                        }}
                      >
                        {header === "Done" ? (
                          <Switch
                            checked={row.IsDeleted}
                            onChange={() => handleStatusChange(row)}
                            color="primary"
                          />
                  
                        ) : header === "Actions" ? (
                          <IconButton
                            onClick={(event) => handleMoreClick(event, row)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        ) : header === "Status" ? (
                          <Chip
                            label={row.Status == "Active" ? "Active" : "Expired"}
                            style={{
                              backgroundColor: row.Status == "Active"
                                ? "#28B31C33"
                                : "#ff000033",
                              color: row.Status == "Active"
                              ? "#096D00"
                              : "#C30000",
                            }}
                          />
                        ) : cellContent ? (
                          cellContent
                        ) : null}
                      </TableCell>
                    );
                  })}
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
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleViewDetailsClick}>View Details</MenuItem>
          <MenuItem onClick={handleOpenEditAdsDialoge}>
            Edit
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
      </TableContainer>
      <DeleteDialogComponent
        open={openDeleteDialog}
        onClose={() =>
          handleDialogClose(setOpenDeleteDialog, setSelectedRow)
        }
        onDelete={() => handleDelete(selectedRow, setOpenDeleteDialog)}
      />


      <AdsViewDetailDialogComponent
        open={openDetailDialog}
        handleClose={() =>
          handleDialogClose(setOpenDetailDialog, setSelectedRow)
        }
        adsData={selectedRow}
      />
      <AdsDialog
        open={dialogOpen}
        onClose={handleCloseCreateAdsDialoge}
        onRefresh={onRefresh}
        dialogStatus={dialogStatus}
        adsDataForEdit={selectedRow} />
    </>
  );
};

export default AdsTableComponent;

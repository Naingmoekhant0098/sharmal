import React, { useState } from "react";
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
  Switch,
  Chip,
  Skeleton,
  TextField,
  Button,
  TableSortLabel,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import InquiryViewDetailDialogComponent from "../Dialog/Inquiry/InquiryViewDetailDialogComponent";
import DeleteDialogComponent from "../Dialog/DeleteDialogComponent";

// Import your API function
import { DeleteInquiryAPI } from "../../api/inquiry/InquiryController";
import { toast } from "react-toastify";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const TableContainerComponent = ({
  data,
  showIdColumns,
  selectedCategory,
  handleStatusChange,
  tableHeaders,
  isLoading,
  setIsFilter,
  handleDelete
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const headers = tableHeaders[selectedCategory] || [];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleMoreClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row); // Set the selected row when "More" is clicked
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetailsClick = () => {
    setOpenDetailDialog(true);
    handleClose(); // Close the menu when the dialog opens
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleClose();
  };

  const handleDialogClose = (setOpenDialog, setSelectedRow) => {
    setOpenDialog(false);
    setSelectedRow(null); // Clear the selected row data
  };

  const filteredData = data.filter((row) =>
    headers.some(
      (header) =>
        row[header] &&
        row[header].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = stableSort(filteredData, getComparator(order, orderBy));

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={headers.length}>
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
                >
                  Filter
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header}
                  style={{
                    display:
                      header.includes("Id") && !showIdColumns
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
              // Skeleton Loader
              Array.from(new Array(10)).map((_, index) => (
                <TableRow key={index}>
                  {headers.map((header) => (
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
                <TableRow key={row.InquiresId}>
                  {headers.map((header) => (
                    <TableCell
                      key={header}
                      style={{
                        display:
                          header.includes("Id") && !showIdColumns
                            ? "none"
                            : "table-cell",
                      }}
                    >
                      {header === "Done" ? (
                        <Switch
                          checked={row.InquiryStatus === "Done"}
                          onChange={() => handleStatusChange(row)}
                          color="primary"
                          // Remove disabled prop to allow toggling
                        />
                      ) : header === "Actions" ? (
                        <IconButton
                          onClick={(event) => handleMoreClick(event, row)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      ) : header === "Status" ? (
                        <Chip
                          label={row.Status}
                          style={{
                            backgroundColor:
                              row.Status === "ငှားရန်" ? "#FBB96F" : "#FF98DF",
                            color:
                              row.Status === "ငှားရန်" ? "#AB5B00" : "#C40087",
                          }}
                        />
                      ) : (
                        row[header]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleViewDetailsClick}>View Details</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
      </TableContainer>
      <InquiryViewDetailDialogComponent
        open={openDetailDialog}
        onClose={() => handleDialogClose(setOpenDetailDialog, setSelectedRow)}
        rowData={selectedRow}
      />
      <DeleteDialogComponent
        open={openDeleteDialog}
        onClose={() => handleDialogClose(setOpenDeleteDialog, setSelectedRow)}
        onDelete={()=>handleDelete(selectedRow,setOpenDeleteDialog,setSelectedRow)} // Pass the delete handler to the dialog
      />
    
    </>
  );
};

export default TableContainerComponent;

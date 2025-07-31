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
  Box,
  ThemeProvider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import theme from './../../theme';
import PropertyDialog from "../Dialog/Lisings/Property/PropertyDialog";
import CarDialog from "../Dialog/Lisings/Car/CarDialog";
import ListingsPropertyDetailDialogComponents from "../Dialog/Lisings/Property/ListingsPropertyDetailDialogComponents";
import ListingsCarDetailDialogComponents from "../Dialog/Lisings/Car/ListingsCarDetailDialogComponents";
import DeleteDialogComponent from './../Dialog/DeleteDialogComponent';
import BlogDialogComponent from "../Dialog/Blog/BlogDialogComponent";
import BlogDetailDialogComponent from "../Dialog/Blog/BlogDetailDialogComponent";

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

const ListingsTableComponent = ({
  data,
  showIdColumns,
  selectedCategory,
  handleStatusChange,
  tableHeaders,
  isLoading,
  setIsFilter,
  handleDelete,
  onRefresh,
  btnLabel
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogStatus, setdialogStatus] = useState('create')

  // const headers = [...(tableHeaders[selectedCategory] || []), "Done"];
  const headers = [
    ...(tableHeaders[selectedCategory] || []),
    ...(["ListingsProperty", "ListingsCar", "Property", "Car", "Ads", "User", "Other"].includes(selectedCategory) ? ["Done"] : [])
  ];
  


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
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetailsClick = () => {
    setOpenDetailDialog(true);
    handleClose();
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleClose();
  };

  const handleDialogClose = (setOpenDialog, setSelectedRow) => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleAddNewClick = () => {
    if (selectedCategory === 'ListingsProperty') {
      handleOpenCreatePropertyDialog();
    } else if(selectedCategory=='Blog'){
      handleOpenCreateBlogDialog();
    } else {
      handleOpenCreateCarDialog();
    }
    setdialogStatus('create');
  };


  const Data = data.map((item) => {



    // Extract the relevant part of each item
    if (item.Property) {
      return {
        ...item.Property,
        PropertyFeatures: item.PropertyFeatures || [],
        Images: item.Images || []
      };
    } else if (item.Car) {
      return {
        ...item.Car,
        Images: item.Images || []
      };
    } else {
      return item; // If neither Property nor Car, return the item itself
    }
  });




  // Filter based on searchTerm
  const filteredData = Data.filter((row) => {
    return headers.some((header) => {
      const itemValue = row[header]; // Get the value from the current row based on the header
      return (
        itemValue &&
        itemValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  });




  // Sort the filtered data
  const sortedData = stableSort(filteredData, getComparator(order, orderBy));





  const handleOpenCreatePropertyDialog = () => {
    setCategory('Property');
    setDialogOpen(true);
  };

  const handleOpenCreateBlogDialog = () => {
    setCategory('Blog');
    setDialogOpen(true);    
  };

  const handleOpenCreateCarDialog = () => {
    setCategory('Car');
    setDialogOpen(true);
  };


  const handleCloseCreateDialog = () => {
    setDialogOpen(false)
  }

  const handleOpenEditListingDialoge = () => {
    // Call the appropriate dialog open function based on the selectedCategory
    if (selectedCategory === 'ListingsProperty') {
      handleOpenCreatePropertyDialog();
    }
    else if (selectedCategory === 'Blog') {
      handleOpenCreateBlogDialog();
    }
    else {
      handleOpenCreateCarDialog();
    }
    setdialogStatus("edit")
  }


  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={headers.length}>
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
                    {selectedCategory!=='Blog' && (
                    <Button
                      variant="outlined"
                      startIcon={<FilterListIcon />}
                      onClick={() => setIsFilter(true)}
                      sx={{ textTransform: 'none' }}
                    >
                      Filter
                    </Button>)}
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    color="primary"
                    onClick={handleAddNewClick}
                    sx={{ marginLeft: 'auto', textTransform: 'none' }}
                  >
                    Add New {btnLabel || (selectedCategory === 'ListingsProperty' ? 'property' : 'car')}
                  </Button>

                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header}
                  style={{
                    display: header.includes("Id") && !showIdColumns ? "none" : "table-cell",
                    fontSize: '12px',
                    fontWeight: 'bold',
                    padding: '10px 5px 5px 15px',
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
                  {headers.map((header) => (
                    <TableCell
                      key={header}
                      style={{ display: header.includes("Id") && !showIdColumns ? "none" : "table-cell" }}
                    >
                      <Skeleton variant="text" width="100%" height={40} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : sortedData.length > 0 ? (
              sortedData.map((row) => (
                <TableRow key={row.PropertyId || row.CarId}> {/* Adjust the key based on available IDs */}
                  {headers.map((header) => (
                    <TableCell
                      key={header}
                      style={{ display: header.includes("Id") && !showIdColumns ? "none" : "table-cell" }}
                    >
                      {header === "Done" ? (
                        <Switch
                          checked={row.Status === "ရောင်းပြီး" || row.Status === "ငှားပြီး"} // Check for both statuses
                          onChange={() => handleStatusChange(row)}
                          color="secondary"
                        />
                      ) : header === "Actions" ? (
                        <IconButton onClick={(event) => handleMoreClick(event, row)}>
                          <MoreVertIcon />
                        </IconButton>
                      ) :header === "Status" ? (
                        <Chip
                          label={
                            row.Status === null && selectedCategory !== "ListingsProperty"
                              ? "ရောင်းရန်" // Default to "ရောင်းရန်" if Status is null and not ListingsProperty
                              : row.Status
                          }
                          style={{
                            backgroundColor:
                              row.Status === "ငှားရန်"
                                ? "#FBB96F" // Light orange for "ငှားရန်"
                                : row.Status === "ရောင်းရန်" || (row.Status === null && selectedCategory !== "ListingsProperty")
                                ? "#FF98DF" // Light pink for "ရောင်းရန်"
                                : row.Status === "ရောင်းပြီး" || row.Status === "ငှားပြီး"
                                  ? "#FF6F6F" // Red for "ရောင်းပြီး" or "ငှားပြီး"
                                  : "#E0E0E0", // Default grey for unknown status
                            color:
                              row.Status === "ငှားရန်"
                                ? "#AB5B00" // Dark orange for "ငှားရန်"
                                : row.Status === "ရောင်းရန်" || (row.Status === null && selectedCategory !== "ListingsProperty")
                                ? "#C40087" // Dark pink for "ရောင်းရန်"
                                : row.Status === "ရောင်းပြီး" || row.Status === "ငှားပြီး"
                                  ? "#FFFFFF" // White for "ရောင်းပြီး" or "ငှားပြီး"
                                  : "#000000", // Default black for unknown status
                          }}
                        />
                      ) : header === "Code" ? ( // Check if header is "Code"
                        row.Code === null || row.Code === "" ? "000" : row.Code
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
          <MenuItem onClick={handleOpenEditListingDialoge}>
            Edit
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
      </TableContainer>

      {selectedCategory === 'ListingsProperty' ?
        <ListingsPropertyDetailDialogComponents
          open={openDetailDialog}
          handleClose={() =>
            handleDialogClose(setOpenDetailDialog, setSelectedRow)
          }
          Data={selectedRow}  // Pass the selected row's data

        /> :
        selectedCategory === 'Blog' ?
        <BlogDetailDialogComponent
          open={openDetailDialog}
          handleClose={() =>
            handleDialogClose(setOpenDetailDialog, setSelectedRow)
          }
          Data={selectedRow}  // Pass the selected row's data

        /> :
        <ListingsCarDetailDialogComponents
          open={openDetailDialog}
          handleClose={() =>
            handleDialogClose(setOpenDetailDialog, setSelectedRow)
          }
          Data={selectedRow}  // Pass the selected row's data
        />
      }

      <DeleteDialogComponent
        open={openDeleteDialog}
        onClose={() =>
          handleDialogClose(setOpenDeleteDialog, setSelectedRow)
        }
        onDelete={() => handleDelete(selectedRow, selectedCategory, setOpenDeleteDialog)}
      />



      <ThemeProvider theme={theme}>
        {category === 'Property' ?
          <PropertyDialog
            open={dialogOpen}
            onClose={handleCloseCreateDialog}
            onRefresh={onRefresh}
            dialogStatus={dialogStatus}
            DataForEdit={selectedRow} /> :
          category === 'Car' ?
          <CarDialog
            open={dialogOpen}
            onClose={handleCloseCreateDialog}
            onRefresh={onRefresh}
            dialogStatus={dialogStatus}
            DataForEdit={selectedRow} /> :
          <BlogDialogComponent
            open={dialogOpen}
            onClose={handleCloseCreateDialog}
            onRefresh={onRefresh}
            dialogStatus={dialogStatus}
            DataForEdit={selectedRow} />
        }
      </ThemeProvider>
    </>
  );
};

export default ListingsTableComponent;
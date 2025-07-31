import React, { useEffect, useState } from 'react';
import { Button, ThemeProvider, TablePagination } from '@mui/material';
import { toast } from 'react-toastify';
import theme from '../../../theme';
import '../../../App.css';
import tableHeaders from '../../../data/tableHeader';
import ListingsTableComponent from '../../../components/Table/ListingsTableComponent';
import ListingsPropertyFilterDrawerComponent from '../../../components/Drawer/ListingsPropertyFilterDrawerComponent';
import ListingCarFilterDrawerComponent from '../../../components/Drawer/ListingCarFilterDrawerComponent';
import { DeletePropertyAPI, GetPropertyAPI, UpdatePropertyAPI } from '../../../api/Listings/property/propertyController';
import { DeleteCarApi, GetCarApi, UpdateCarAPI } from '../../../api/Listings/car/carController';
import { _DecryptService } from '../../../service/EncryptDecryptService';
import _JWTDecodeService from './../../../service/JWTDecodeService';

function ListingsPage({ selectedCategory: initialCategory }) {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showIdColumns, setShowIdColumns] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'ListingsProperty');
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [UserId, setUserId] = useState('');
  const [PropertyFilterPayload, setPropertyFilterPayload] = useState({})
  const [CarFilterPayload, setCarFilterPayload] = useState({})

  useEffect(() => {
    const decryptedToken = _DecryptService(sessionStorage.getItem("token"));
    const decodedToken = _JWTDecodeService(decryptedToken);
    const userId = _DecryptService(decodedToken?.UserId);
    setUserId(userId);
    fetchData(page + 1, rowsPerPage, selectedCategory, UserId);
  }, [page, rowsPerPage, selectedCategory, UserId]);

  const fetchData = async (pageNo, pageSize, selectedCategory) => {
    setIsLoading(true);
    try {
      if (selectedCategory === 'ListingsProperty') {
        // await GetPropertyAPI({ pageNo, pageSize }, setData, setTotalCount, toast, setIsLoading);
        // Ensure FilterPayload is an object and not null or other invalid types
        const isFilterPayloadValid = typeof PropertyFilterPayload === 'object' && PropertyFilterPayload !== null;
        const payload = isFilterPayloadValid && Object.keys(PropertyFilterPayload).length > 0
          ? { pageNo, pageSize, ...PropertyFilterPayload }
          : { pageNo, pageSize };

        await GetPropertyAPI(
          payload,
          setData,
          setTotalCount,
          toast,
          setIsLoading
        );
      } else {

        const isFilterPayloadValid = typeof CarFilterPayload === 'object' && CarFilterPayload !== null;

        const payload = isFilterPayloadValid && Object.keys(CarFilterPayload).length > 0
          ? { pageNo, pageSize, ...CarFilterPayload }
          : { pageNo, pageSize };

        await GetCarApi(
          payload,
          setData,
          setTotalCount,
          toast,
          setIsLoading
        );
      }
    } catch (error) {


    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleStatusChange = async (row) => {
    try {
      // Validate if the row exists and category is selected
      if (!row || !selectedCategory) {
        toast.error("Invalid data or category!");
        return;
      }
  
      let updatedStatus;
  
      // Handle status changes for Cars
      if (selectedCategory === 'ListingsCar') {
        switch (row.Status) {
          case null: // Initial state for Cars
            updatedStatus = "ရောင်းပြီး"; // "Sold"
            break;
          case "ရောင်းပြီး": // "Sold"
            updatedStatus = "ရောင်းရန်"; // Reset to initial state
            break;
            case "ရောင်းရန်": // Initial state for Cars
            updatedStatus = "ရောင်းပြီး"; // "Sold"
            break;
          default:
            toast.error("Unknown car status!");
            return;
        }
  
        // Prepare the updated data for the car
        const updatedCarData = {
          ...row,
          Status: updatedStatus, // Update status
          Files: [], // Add file data if applicable (empty for now)
        };
  
        // Call the API to update the car status
        await UpdateCarAPI(updatedCarData);
  
        // Notify success and refresh data
        toast.success("Car status updated successfully.");
        fetchData(page + 1, rowsPerPage, selectedCategory);
  
      // Handle status changes for Properties
      } else if (selectedCategory === 'ListingsProperty') {
        switch (row.Status) {
          case "ရောင်းရန်": // "For Sale"
            updatedStatus = "ရောင်းပြီး"; // "Sold"
            break;
          case "ငှားရန်": // "For Rent"
            updatedStatus = "ငှားပြီး"; // "Rented"
            break;
          case "ရောင်းပြီး": // "Sold"
            updatedStatus = "ရောင်းရန်"; // "For Sale"
            break;
          case "ငှားပြီး": // "Rented"
            updatedStatus = "ငှားရန်"; // "For Rent"
            break;
          default:
            toast.error("Unknown property status!");
            return;
        }
  
        // Prepare the updated data for the property
        const updatedPropertyData = {
          ...row,
          Status: updatedStatus, // Update status
          PropertyFeaturesIndex: row.PropertyFeatures.map((_, index) => index), // Map indexes for features
          Files: [], // Add file data if applicable (empty for now)
        };
  
        // Call the API to update the property status
        await UpdatePropertyAPI(updatedPropertyData);
  
        // Notify success and refresh data
        toast.success("Property status updated successfully.");
        fetchData(page + 1, rowsPerPage, selectedCategory);
  
      } else {
        // Handle invalid categories
        toast.error("Invalid category selected!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update the status. Please try again.");
    }
  };
  
  
  
  
  


  const handleMoreClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleFilterDrawerClose = () => {
    setIsFilterDrawerOpen(false);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);

    fetchData(
      newPage + 1,  // newPage + 1 because it's 0-indexed
      rowsPerPage,
      selectedCategory === 'ListingsProperty' ? PropertyFilterPayload : CarFilterPayload,  // Correctly pass the payload based on the selected category
      selectedCategory
    );

  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (selectedRow, selectedCategory) => {


    if (selectedRow) {
      try {
        if (selectedCategory === "ListingsProperty") {
          // Call the DeletePropertyAPI to delete the selected property
          await DeletePropertyAPI(selectedRow.PropertyId, toast, setData, setIsLoading);

          // Fetch property data after deletion
          fetchData(
            page === 0 ? page + 1 : page, // Ensure correct page index
            rowsPerPage,
            selectedCategory // Fetch property data after deletion
          );
        } else {
          // Call the DeleteCarApi to delete the selected car
          await DeleteCarApi(selectedRow.CarId, toast, setData, setIsLoading);

          // Fetch car data after deletion
          fetchData(
            page === 0 ? page + 1 : page, // Ensure correct page index
            rowsPerPage,
            selectedCategory // Fetch car data after deletion
          );
        }
      } catch (error) {


      }
      handleClose(); // Close the menu after deletion
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div style={{ marginBottom: '20px' }}>
          <Button
            variant={selectedCategory === 'ListingsProperty' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange('ListingsProperty')}
            sx={{ borderRadius: theme.shape.borderRadius, textTransform: theme.shape.textTransform }}
          >
            Property
          </Button>
          <Button
            variant={selectedCategory === 'ListingsCar' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange('ListingsCar')}
            style={{ marginLeft: '10px' }}
            sx={{ borderRadius: theme.shape.borderRadius, textTransform: theme.shape.textTransform }}
          >
            Car
          </Button>
        </div>

        <ListingsTableComponent
          data={data}
          showIdColumns={showIdColumns}
          selectedCategory={selectedCategory}
          handleMoreClick={handleMoreClick}
          anchorEl={anchorEl}
          handleClose={handleClose}

          handleStatusChange={handleStatusChange}
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          setIsFilter={setIsFilterDrawerOpen}
          handleDelete={handleDelete}
          onRefresh={() => fetchData(page === 0 ? page + 1 : page, rowsPerPage, selectedCategory)}
        />
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        <Button onClick={() => setShowIdColumns(!showIdColumns)} style={{ marginTop: '20px' }}>
          {showIdColumns ? 'Hide ID Columns' : 'Show ID Columns'}
        </Button>
        {selectedCategory === 'ListingsProperty' ? (
          <ListingsPropertyFilterDrawerComponent
            isFilterDrawerOpen={isFilterDrawerOpen}
            handleFilterClose={handleFilterDrawerClose}
            setData={setData}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            setTotalCount={setTotalCount}
            setPropertyFilterPayload={setPropertyFilterPayload}
            setPage={setPage}
          />
        ) : (
          <ListingCarFilterDrawerComponent
            isFilterDrawerOpen={isFilterDrawerOpen}
            handleFilterClose={handleFilterDrawerClose}
            setData={setData}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            setTotalCount={setTotalCount}
            setCarFilterPayload={setCarFilterPayload}
            setPage={setPage}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default ListingsPage;

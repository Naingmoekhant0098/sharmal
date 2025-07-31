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
import { DeleteBlogAPI, GetBlogAPI } from '../../../api/blog/BlogController';

function BlogPageAdmin({ selectedCategory: initialCategory }) {
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
    fetchData();
  }, [page, rowsPerPage, selectedCategory, UserId]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response=await GetBlogAPI(toast);
      setData(response);
      setIsLoading(false);
      }
     catch (error) {
      toast.error("Failed to fetch data. Please try again later.");
      console.error("Error fetching blog data:", error);
    }
  };


  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
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
        await DeleteBlogAPI(selectedRow.Id,toast);
        fetchData(
          page === 0 ? page + 1 : page, // Ensure correct page index
          rowsPerPage,
          selectedCategory // Fetch car data after deletion
        );
      } catch (error) {


      }
      handleClose(); // Close the menu after deletion
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ListingsTableComponent
          btnLabel={"Blog"}
          data={data}
          showIdColumns={showIdColumns}
          selectedCategory={'Blog'}
          handleMoreClick={handleMoreClick}
          anchorEl={anchorEl}
          handleClose={handleClose}          
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
      </div>
    </ThemeProvider>
  );
}

export default BlogPageAdmin;

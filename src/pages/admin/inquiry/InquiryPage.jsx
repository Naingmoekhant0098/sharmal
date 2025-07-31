import React, { useEffect, useState } from 'react';
import { GetInquiryAPI, UpdateInquiryAPI, DeleteInquiryAPI } from '../../../api/inquiry/InquiryController';
import { Button, ThemeProvider, TablePagination, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import theme from '../../../theme';
import '../../../App.css';
import tableHeaders from '../../../data/tableHeader';
import TableContainerComponent from '../../../components/Table/InquiryTableComponent';
import InquiryFilterDrawerComponent from './../../../components/Drawer/InquiryFilterDrawerComponent';


const InquiryPage = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // State for total count
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showIdColumns, setShowIdColumns] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Property');
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [page, setPage] = useState(0);  // Use 0-based index for pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData(page + 1, rowsPerPage, selectedCategory);
  }, [selectedCategory, page, rowsPerPage]);

  const fetchData = async (pageNo, pageSize, category) => {
    setIsLoading(true);
    await GetInquiryAPI(
      { PageNo: pageNo, PageSize: pageSize, Status: '', InquiryStatus: '', FilterType: category },
      setData,
      toast,
      setTotalCount  // Pass the setTotalCount function correctly here
    );
    setIsLoading(false);
  };

  // Define missing functions here
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(0); // Reset to the first page when the category changes
  };

  const handleStatusChange = async (row, status) => {
    // Implement your logic to update the status of a row

    
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    
    // You can call UpdateInquiryAPI here if needed
    setIsLoading(true);
    await UpdateInquiryAPI(row.InquiresId, formattedDate, toast)
    fetchData(page === 0 ? page + 1 : page, rowsPerPage, selectedCategory)
    setIsLoading(false);
  };

  const handleMoreClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleViewDetails = () => {

    
    // Implement the logic to view details for the selected row
    handleClose(); // Close the menu after viewing details
  };

  const handleDelete = async () => {
    if (selectedRow) {
      await DeleteInquiryAPI(selectedRow.id, toast, setData, setIsLoading, { PageNo: page + 1, PageSize: rowsPerPage, Status: '', InquiryStatus: '', FilterType: selectedCategory });
      handleClose();
    }
  };

  const handleFilterDrawerClose = () => {
    setIsFilterDrawerOpen(false);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when page size changes
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div style={{ marginBottom: '20px' }}>
          <Button
            variant={selectedCategory === 'Property' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange('Property')}
            sx={{ borderRadius: theme.shape.borderRadius, textTransform: theme.shape.textTransform }}
          >
            Property
          </Button>
          <Button
            variant={selectedCategory === 'Car' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange('Car')}
            style={{ marginLeft: '10px' }}
            sx={{ borderRadius: theme.shape.borderRadius, textTransform: theme.shape.textTransform }}
          >
            Car
          </Button>
          <Button
            variant={selectedCategory === 'Other' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange('Other')}
            style={{ marginLeft: '10px' }}
            sx={{ borderRadius: theme.shape.borderRadius, textTransform: theme.shape.textTransform }}
          >
            Other
          </Button>
        </div>
        <TableContainerComponent
          data={data}
          showIdColumns={showIdColumns}
          selectedCategory={selectedCategory}
          handleStatusChange={handleStatusChange}
          handleMoreClick={handleMoreClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleViewDetails={handleViewDetails}
          tableHeaders={tableHeaders}
          isLoading={isLoading}
          setIsFilter={setIsFilterDrawerOpen}    
          handleDelete={handleDelete}      
        />
        <TablePagination
          component="div"
          count={totalCount}  // Ensure totalCount is being passed correctly here
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        <Button onClick={() => setShowIdColumns(!showIdColumns)} style={{ marginTop: '20px' }}>
          {showIdColumns ? 'Hide ID Columns' : 'Show ID Columns'}
        </Button>
        <InquiryFilterDrawerComponent
          selectedCategory={selectedCategory}
          isFilterDrawerOpen={isFilterDrawerOpen}
          handleFilterClose={handleFilterDrawerClose}
          setData={setData}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </div>
    </ThemeProvider>
  );
};

export default InquiryPage;

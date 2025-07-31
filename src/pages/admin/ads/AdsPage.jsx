import React, { useEffect, useState } from 'react';
import { DeleteAdsAPI, GetAdsAPI } from '../../../api/ads/AdsController';
import { Button, ThemeProvider, TablePagination } from '@mui/material';
import { toast } from 'react-toastify';
import theme from '../../../theme';
import '../../../App.css';
import tableHeaders from '../../../data/tableHeader';
import TableContainerComponent from '../../../components/Table/AdsTableComponent';
import AdsFilterDrawerComponent from './../../../components/Drawer/AdsFilterDrawerComponent';
import { _DecryptService } from '../../../service/EncryptDecryptService';
import _JWTDecodeService from './../../../service/JWTDecodeService';


const AdsPage = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showIdColumns, setShowIdColumns] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Ads');
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [page, setPage] = useState(0);  // 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [UserId, setUserId] = useState('')
  const [FilterPayload, setFilterPayload] = useState({})

  useEffect(() => {
      // Step 1: Decrypt the token from session storage
      const decryptedToken = _DecryptService(sessionStorage.getItem("token"));

      // Step 2: Decode the token to get the UserId (assuming it's in the payload of the token)
      const decodedToken = _JWTDecodeService(decryptedToken);
      const userId = _DecryptService(decodedToken?.UserId);

      
      setUserId(userId)
    fetchData(page + 1, rowsPerPage, selectedCategory, UserId);
  }, [ UserId]);



  const fetchData = async (pageNo, pageSize, FilterPayload = {}, category) => {
    setIsLoading(true);
  
    // Ensure FilterPayload is an object and not null or other invalid types
    const isFilterPayloadValid = typeof FilterPayload === 'object' && FilterPayload !== null;
  
    // Merge pageNo, pageSize, and FilterPayload if it's valid
    const payload = isFilterPayloadValid && Object.keys(FilterPayload).length > 0
      ? { pageNo, pageSize, ...FilterPayload } // Merge FilterPayload with pagination
      : { pageNo, pageSize }; // Only use pagination if FilterPayload is empty or invalid
  
    // Fetch the ads with the correct payload
    await GetAdsAPI(
      payload,       
      setData,       
      toast,         
      setTotalCount, 
      setIsLoading   
    );
  };
  
  

  


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(0);
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

    
    handleClose();
  };

  const handleDelete = async (selectedRow) => {        
    if (selectedRow) {      
      await DeleteAdsAPI(UserId,selectedRow.AdsId, toast, setData,setTotalCount,setIsLoading)      
      fetchData(page===0?page+1:page,rowsPerPage,FilterPayload,selectedCategory)
      handleClose();
    }
  };

  const handleFilterDrawerClose = () => {
    setIsFilterDrawerOpen(false);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  
    fetchData(newPage + 1, rowsPerPage, FilterPayload, selectedCategory); // newPage + 1 because it's 0-indexed
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div style={{ marginBottom: '20px' }}>
          
          {/* Other category buttons can be added here if needed */}
        </div>
        <TableContainerComponent
          data={data}
          showIdColumns={showIdColumns}          
          handleMoreClick={handleMoreClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleViewDetails={handleViewDetails}
          tableHeaders={tableHeaders['Ads']} // Use Ads headers here
          isLoading={isLoading}
          setIsFilter={setIsFilterDrawerOpen}
          handleDelete={handleDelete}
          onRefresh={()=>fetchData(page===0?page+1:page,rowsPerPage,totalCount,selectedCategory)}
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
        <AdsFilterDrawerComponent
          isFilterDrawerOpen={isFilterDrawerOpen}
          handleFilterClose={handleFilterDrawerClose}
          setData={setData}
          setIsLoading={setIsLoading}
          setTotalCount={setTotalCount}
          isLoading={isLoading}
          setFilterPayload={setFilterPayload}
          onRefresh={()=>fetchData(page===0?page+1:page,rowsPerPage, FilterPayload,selectedCategory)}
          setPage={setPage}
        />
      </div>
    </ThemeProvider>
  );
};

export default AdsPage;

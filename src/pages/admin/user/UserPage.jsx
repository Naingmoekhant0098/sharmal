import React, { useEffect, useState } from 'react';
import { Button, ThemeProvider, TablePagination } from '@mui/material';
import { toast } from 'react-toastify';
import theme from '../../../theme';
import '../../../App.css';
import tableHeaders from '../../../data/tableHeader';
import UserTableComponent from '../../../components/Table/UserTableComponent';
import { DeleteUserAPI, GetUserAPI } from '../../../api/user/GetUserController';
import DeleteDialogComponent from '../../../components/Dialog/DeleteDialogComponent';


const UserPage = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showIdColumns, setShowIdColumns] = useState(false);
  const selectedCategory='User';
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);  // 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData(page + 1, rowsPerPage, selectedCategory);
  }, [selectedCategory, page, rowsPerPage]);

  const fetchData = async (pageNo, pageSize, category) => {
    setIsLoading(true);
    await GetUserAPI(
      pageNo,
      pageSize,
      setData,
      toast,
      setTotalCount,
      setIsLoading
    );    
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
      await DeleteUserAPI(selectedRow.UserId, toast, setData, page==0?page+1:page,rowsPerPage,setTotalCount,setIsLoading)      
      handleClose();
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
        <UserTableComponent
          data={data}          
          showIdColumns={showIdColumns}                                        
          tableHeaders={tableHeaders['User']} // Use Ads headers here
          isLoading={isLoading}          
          handleDelete={handleDelete}                    
          onRefresh={()=>fetchData(page===0?page+1:page,totalCount,selectedCategory)}
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
};

export default UserPage;

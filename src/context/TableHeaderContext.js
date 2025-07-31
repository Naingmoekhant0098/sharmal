import React, { createContext } from 'react';
import tableHeaders from '../data/tableHeader';

export const TableHeadersContext = createContext();

export const TableHeadersProvider = ({ children }) => {
  return (
    <TableHeadersContext.Provider value={tableHeaders}>
      {children}
    </TableHeadersContext.Provider>
  );
};

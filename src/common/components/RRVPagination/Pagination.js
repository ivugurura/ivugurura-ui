import * as React from 'react';

import { TablePagination } from '@mui/material';

export const RRVPagination = ({
  handleChangePage, handleChangeRowsPerPage, page = 1, pageSize = 10, dataCount = 0,
}) => {
  if (dataCount === 0) return null;
  return (
    <TablePagination
      component="div"
      count={dataCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={pageSize}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

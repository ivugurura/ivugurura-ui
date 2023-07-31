import * as React from 'react';

import { TablePagination } from '@mui/material';

import { usePagination } from '../../hooks/usePagination';

export const RRVPagination = ({ page = 1, pageSize = 10, dataCount = 0 }) => {
  const { pagination, handleChangePage, handleChangeRowsPerPage } = usePagination(page, pageSize);

  if (dataCount === 0) return null;
  return (
    <TablePagination
      component="div"
      count={dataCount}
      page={pagination.page}
      onPageChange={handleChangePage}
      rowsPerPage={pagination.pageSize}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

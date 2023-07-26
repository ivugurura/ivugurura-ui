import * as React from 'react';

import { TablePagination } from '@mui/material';

export const RRVPagination = ({ page = 1, pageSize = 10, dataCount = 0 }) => {
  const [pagination, setPagination] = React.useState({ pageSize, page });

  const handleChangePage = (_, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = ({ target }) => {
    setPagination((prev) => ({ ...prev, pageSize: parseInt(target.value, 10), page: 1 }));
  };
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

import React from 'react';

import { TablePagination, type TablePaginationProps } from '@mui/material';

interface RRVPaginationProps extends TablePaginationProps {
  dataCount: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => void;
  pageSize: number;
  handleChangeRowsPerPage?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

export const RRVPagination: React.FC<RRVPaginationProps> = ({
  handleChangePage,
  handleChangeRowsPerPage,
  page = 1,
  pageSize = 10,
  dataCount = 0,
  rowsPerPageOptions = [5, 10, 15],
  ...otherPros
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
      rowsPerPageOptions={rowsPerPageOptions}
      {...otherPros}
    />
  );
};

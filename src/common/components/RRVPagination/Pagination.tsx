import React from 'react';

import { TablePagination, type TablePaginationProps } from '@mui/material';

type RRVPaginationProps = Omit<
  TablePaginationProps,
  'count' | 'onPageChange' | 'rowsPerPage' | 'page'
> & {
  page?: number;
  dataCount: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => void;
  pageSize: number;
  handleChangeRowsPerPage?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

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

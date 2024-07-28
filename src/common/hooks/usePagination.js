import React from 'react';

export const usePagination = (pageNumber = 0, itemsPerPage = 10) => {
  const [pagination, setPagination] = React.useState({
    pageSize: itemsPerPage,
    page: pageNumber,
  });

  const handleChangePage = (_, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = ({ target }) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: parseInt(target.value, 10),
      page: 0,
    }));
  };

  const resetRowsPerPage = () => {
    setPagination((prev) => ({ ...prev, page: 0 }));
  };
  const { page, pageSize } = pagination;

  return {
    pagination: { page: page + 1, pageSize, tablePage: page },
    handleChangePage,
    handleChangeRowsPerPage,
    resetRowsPerPage,
  };
};

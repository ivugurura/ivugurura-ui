import React from 'react';

export const usePagination = (page = 1, pageSize = 10) => {
  const [pagination, setPagination] = React.useState({ pageSize, page });

  const handleChangePage = (_, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = ({ target }) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: parseInt(target.value, 10),
      page: 1,
    }));
  };

  const resetRowsPerPage = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return {
    pagination,
    handleChangePage,
    handleChangeRowsPerPage,
    resetRowsPerPage,
  };
};

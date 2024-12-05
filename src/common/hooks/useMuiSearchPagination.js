import React from 'react';

export const useMuiSearchPagination = (pageNumber = 0, itemsPerPage = 10) => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [pagination, setPagination] = React.useState({
    pageIndex: pageNumber,
    pageSize: itemsPerPage,
  });

  return {
    globalFilter,
    pagination,
    paginator: {
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      search: globalFilter,
    },
    setGlobalFilter,
    setPagination,
  };
};

import React from 'react';

import { MaterialReactTable } from 'material-react-table';

export const RRVTable = ({
  isLoading,
  globalFilter,
  setGlobalFilter,
  ...rest
}) => (
  <MaterialReactTable
    state={{ isLoading, globalFilter }}
    onGlobalFilterChange={setGlobalFilter}
    manualFiltering
    positionActionsColumn="last"
    {...rest}
  />
);

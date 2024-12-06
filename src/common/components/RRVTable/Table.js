import React from 'react';

import { Button } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';

export const RRVTable = ({
  isLoading,
  globalFilter,
  setGlobalFilter,
  rowSelection = {},
  pagination = { pageIndex: 0, pageSize: 10 },
  setPagination,
  setRowSelection,
  onHandleSelected = () => {},
  btnSelectionLabel,
  ...rest
}) => (
  <MaterialReactTable
    state={{ isLoading, globalFilter, rowSelection, pagination }}
    onGlobalFilterChange={setGlobalFilter}
    onRowSelectionChange={setRowSelection}
    onPaginationChange={setPagination}
    manualFiltering
    manualPagination
    positionActionsColumn="last"
    renderTopToolbarCustomActions={
      btnSelectionLabel
        ? ({ table: { getSelectedRowModel } }) => {
            const { rows } = getSelectedRowModel();
            if (rows.length === 0) return null;
            return (
              <Button
                onClick={() => {
                  onHandleSelected(rows);
                }}
              >
                {`${btnSelectionLabel} (${rows.length})`}
              </Button>
            );
          }
        : undefined
    }
    {...rest}
  />
);

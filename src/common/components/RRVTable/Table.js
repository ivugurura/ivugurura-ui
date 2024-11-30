import React from 'react';

import { Button } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';

export const RRVTable = ({
  isLoading,
  globalFilter,
  setGlobalFilter,
  rowSelection,
  setRowSelection,
  onHandleSelected = () => {},
  btnSelectionLabel,
  ...rest
}) => (
  <MaterialReactTable
    state={{ isLoading, globalFilter, rowSelection }}
    onGlobalFilterChange={setGlobalFilter}
    onRowSelectionChange={setRowSelection}
    manualFiltering
    positionActionsColumn="last"
    renderTopToolbarCustomActions={
      btnSelectionLabel
        ? ({ table: { getSelectedRowModel } }) => {
            const { rows } = getSelectedRowModel();
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

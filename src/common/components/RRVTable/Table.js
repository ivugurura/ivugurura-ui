import React from 'react';

import { MaterialReactTable } from 'material-react-table';

export const RRVTable = ({ isLoading, ...rest }) => (
  <MaterialReactTable
    state={{ isLoading }}
    positionActionsColumn="last"
    {...rest}
  />
);

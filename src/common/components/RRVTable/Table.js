import React from 'react';

import MaterialReactTable from 'material-react-table';

export const RRVTable = ({ ...rest }) => (
  <MaterialReactTable positionActionsColumn="last" {...rest} />
);

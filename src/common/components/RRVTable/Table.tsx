import { Button } from '@mui/material';
import {
  MaterialReactTable,
  type MRT_PaginationState,
  type MRT_Row,
  type MRT_RowData,
  type MRT_RowSelectionState,
  type MRT_TableOptions,
} from 'material-react-table';

type Setter<T> = (updater: T | ((prev: T) => T)) => void;

export type RRVTableProps<TData extends MRT_RowData> = Omit<
  MRT_TableOptions<TData>,
  'state'
> & {
  isLoading?: boolean;
  globalFilter?: string;
  setGlobalFilter?: Setter<string>;
  rowSelection?: MRT_RowSelectionState;
  setRowSelection?: Setter<MRT_RowSelectionState>;
  pagination?: MRT_PaginationState;
  setPagination?: Setter<MRT_PaginationState>;
  onHandleSelected?: (rows: MRT_Row<TData>[]) => void;
  btnSelectionLabel?: string;
};

export const RRVTable = <TData extends MRT_RowData>({
  isLoading,
  globalFilter,
  setGlobalFilter,
  rowSelection = {},
  pagination = { pageIndex: 0, pageSize: 10 },
  setPagination,
  setRowSelection,
  onHandleSelected,
  btnSelectionLabel,
  ...rest
}: RRVTableProps<TData>) => (
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
                  onHandleSelected?.(rows);
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

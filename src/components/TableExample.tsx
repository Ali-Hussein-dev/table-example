import { Table } from "@mantine/core";
import { useReactTable, flexRender } from "@tanstack/react-table";
import {
  createColumnHelper,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/table-core";
import {
  BiChevronUp,
  BiChevronDown,
  BiChevronRight,
  BiChevronLeft,
} from "react-icons/bi";
import { TbSelector } from "react-icons/tb";
import * as React from "react";
// Define your row shape
type RowT = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  id: number;
};

const columnHelper = createColumnHelper<RowT>();
const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("firstname", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("lastname", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("gender", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];
//======================================
const TableExample = ({ data }: { data: any[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });
  const { getHeaderGroups, getRowModel } = table;
  //======================================return
  return (
    <div className="p-2 pt-4 overflow-hidden bg-white rounded">
      <Table>
        <thead>
          {getHeaderGroups().map((hGroup) => (
            <tr key={hGroup.id}>
              {hGroup.headers.map((header) => (
                <th key={header.id} className="uppercase">
                  {header.isPlaceholder ? null : (
                    <div
                      className={`${
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      } row-between gap-x-1`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <BiChevronUp />,
                        desc: <BiChevronDown />,
                      }[header.column.getIsSorted() as string] ?? (
                        <TbSelector />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t">
          <div className="w-full h-10 row-between">
            <div className="row-start gap-x-1 ">
              <BiChevronLeft size="30" />
              <BiChevronRight size="30" />
            </div>
            {/* <div className="w-full">page 1 of page 20</div> */}
          </div>
        </tfoot>
      </Table>
    </div>
  );
};
export default TableExample;

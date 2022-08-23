import { Table } from "@mantine/core";
import { useReactTable, flexRender } from "@tanstack/react-table";
import { createColumnHelper, getCoreRowModel } from "@tanstack/table-core";
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
  const table = useReactTable({
    data,
    columns,
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
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
        <tfoot></tfoot>
      </Table>
    </div>
  );
};
export default TableExample;

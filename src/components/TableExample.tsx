import { Input, Table } from "@mantine/core";
import {
  BiChevronUp,
  BiChevronDown,
  BiChevronRight,
  BiChevronLeft,
  BiFemale,
  BiMale,
  BiSearch,
  BiX,
} from "react-icons/bi";
import { TbSelector } from "react-icons/tb";
import { useReactTable, flexRender, FilterFn } from "@tanstack/react-table";
import {
  createColumnHelper,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/table-core";
import * as React from "react";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

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
    header: "Vorname",
  }),
  columnHelper.accessor("lastname", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: "Nachname",
  }),
  columnHelper.accessor("gender", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: "Geschlecht",
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: "Email",
  }),
];

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input
      value={value}
      onChange={(e: React.FormEvent<HTMLInputElement>) =>
        setValue(e.currentTarget.value)
      }
      type="text"
      icon={<BiSearch size={16} />}
      placeholder="Alle Spalten suchen"
      rightSection={
        <button
          onClick={() => setValue("")}
          className="w-full h-full col-center"
        >
          <BiX size={18} style={{ display: "block", opacity: 0.5 }} />
          <span className="sr-only">delete</span>
        </button>
      }
    />
  );
}
//======================================
const TableExample = ({ data }: { data: any[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    // pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const { getHeaderGroups, getRowModel } = table;
  //======================================return
  return (
    <div className="p-2 pt-5 overflow-hidden bg-white rounded">
      <DebouncedInput
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(String(value))}
      />
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
                  {cell.column.columnDef.header === "Geschlecht" ? (
                    cell.getValue() === "male" ? (
                      <BiMale size="25" className="text-sky-600" />
                    ) : (
                      <BiFemale size="25" className="text-pink-600" />
                    )
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="w-full border-t">
        <div className="w-full h-12 row-between pag-x-2 ">
          <div className="row-start gap-x-1 ">
            <button
              className="btn btn-square btn-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <BiChevronLeft size="30" />
              <span className="sr-only">previous page</span>
            </button>
            <button
              disabled={!table.getCanNextPage()}
              className="btn btn-square btn-sm"
              onClick={() => table.nextPage()}
            >
              <BiChevronRight size="30" />
              <span className="sr-only">next page</span>
            </button>
          </div>
          <div className="px-2 font-semibold">
            Seite {table.getState().pagination.pageIndex + 1} von{" "}
            {table.getPageCount()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableExample;

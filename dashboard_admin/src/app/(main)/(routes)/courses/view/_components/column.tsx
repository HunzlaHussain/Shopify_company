"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import ClassAction from "./course_action";

export const columns = (): ColumnDef<any>[] => {
  const columnDefs: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("id") !== null ? row.getValue("id") : "Null"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Course Title" />
      ),
      cell: ({ row }) => (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("title") !== null ? row.getValue("title") : "Null"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("description") !== null
              ? row.getValue("description")
              : "Null"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "duration",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Duration (Months)" />
      ),
      cell: ({ row }) => (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("duration") !== null
              ? row.getValue("duration")
              : "Null"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price ($)" />
      ),
      cell: ({ row }) => (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("price") !== null ? row.getValue("price") : "Null"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),

      cell: ({ row }) => {
        return (
          <div className="flex pl-2">
            <span className="max-w-[500px] capitalize truncate font-medium">
              <ClassAction data={row.original} />
            </span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "updatedAt",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Updated At" />
    //   ),
    //   cell: ({ row }) => (
    //     <div className="flex pl-2">
    //       <span className="max-w-[500px] capitalize truncate font-medium">
    //         {new Date(row.getValue("updatedAt")).toLocaleString() || "Null"}
    //       </span>
    //     </div>
    //   ),
    // },
  ];

  return columnDefs;
};

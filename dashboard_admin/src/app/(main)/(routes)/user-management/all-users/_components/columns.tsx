"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { EyeIcon } from "lucide-react";
import DeletePopover from "@/components/table/delete-popover";
import { UserT } from "../_types";
import { deleteUser } from "../_actions";
import EditUser from "./edit-user";
import dynamic from "next/dynamic";

export const columns: ColumnDef<UserT>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "mobile_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex  pl-2 items-center">
          {row.getValue("mobile_no")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "user_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center pl-2 capitalize">
          {row.getValue("user_type")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    // accessorKey: "id",
    id: "actions",
    cell: ({ row }) => {
      const onDeleteItem = async (id: number, token: string) => {
        try {
          await deleteUser(Number(id), token);
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <div className="flex items-center justify-center gap-3">
          <EditUser user={row.original} />
          <Tooltip
            size="sm"
            content={() => "View User"}
            placement="top"
            color="invert"
          >
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
          <DeletePopover
            title={`Delete the User`}
            description={`Are you sure you want to delete this User?`}
            onDelete={(token: string) => onDeleteItem(row.original.id, token)}
          />
        </div>
      );
    },
  },
];

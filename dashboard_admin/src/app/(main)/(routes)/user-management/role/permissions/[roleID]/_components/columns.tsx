"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { EyeIcon } from "lucide-react";
import DeletePopover from "@/components/table/delete-popover";
import { permissionT  } from "../_types";
import EditPermission from "./edit-user";
import dynamic from "next/dynamic";

interface RolePermission {
  business_id: number;
  can_view: string;
  can_update: string;
  can_create: string;
  can_delete: string;
  role_id: number;
  permission_id: number;
}

export const columns: ColumnDef<permissionT>[] = [

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

  // {
  //   accessorKey: "role_permission",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Permissions" />
  //   ),
  //   cell: ({ row }) => {
  //     if (!row || !row.original) {
  //       return null; // Return null if row or row.original is null
  //     }
  //     const permissionItems: RolePermission[] | undefined =
  //       row?.getValue("role_permission");
  //     const permissionNames = {
  //       can_view: "View",
  //       can_create: "Create",
  //       can_delete: "Delete",
  //       can_update: "Update",
  //     };

  //     return (
  //       <div className="flex items-center gap-4">
  //         {row.original && permissionItems
  //           ? permissionItems.map((permissionItem: RolePermission) => (
  //               <div
  //                 className="grid grid-cols-4 gap-2"
  //                 key={permissionItem.business_id}
  //               >
  //                 {Object.entries(permissionItem).map(([key, value]) => {
  //                   // @ts-ignore
  //                   if (value === "1" && permissionNames[key]) {
  //                     return (
  //                       <div
  //                         className="bg-[#F5F5F5] px-2 py-1 rounded-lg"
  //                         key={key}
  //                       >
  //                         {/* @ts-ignore */}
  //                         {permissionNames[key]}
  //                       </div>
  //                     );
  //                   }
  //                   return null;
  //                 })}
  //               </div>
  //             ))
  //           : null}
  //       </div>
  //     );
  //   },
  //   enableSorting: true,
  //   enableHiding: false,
  // },

  {
    accessorKey: "role_permission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Permissions" />
    ),
    cell: ({ row }) => {
      // Return null if row or row.original is null
      if (!row || !row.original) {
        return null;
      }
  
      // Retrieve permission items from the row
      const permissionItems: RolePermission[] | undefined = row?.getValue("role_permission");
  
      // Define permission names
      const permissionNames: { [key: string]: string } = {
        can_view: "View",
        can_create: "Create",
        can_delete: "Delete",
        can_update: "Update",
      };
  
      return (
        <div className="flex items-center gap-4">
          {row.original && permissionItems
            ? permissionItems.map((permissionItem: RolePermission, index) => (
                <div
                  className="grid grid-cols-4 gap-2"
                  key={`${permissionItem.business_id}-${index}`}
                >
                  {permissionItem &&
                    Object.entries(permissionItem).map(([key, value]) => {
                      // Check if the value is "1" and exists in the permissionNames
                      if (value === "1" && permissionNames[key]) {
                        return (
                          <div
                            className="bg-[#F5F5F5] px-2 py-1 rounded-lg"
                            key={key}
                          >
                            {permissionNames[key]}
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>
              ))
            : null}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  }
,  
  
  
 
  {
    // accessorKey: "id",
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-3">
          <EditPermission permission={row.original} />
          <Tooltip
            size="sm"
            content={() => "View permission"}
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
        </div>
      );
    },
  },
];

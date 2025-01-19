import { DataTable } from "@/components/table/data-table";
import {RoleT } from "../_types";
import AddRole from "./add-role";
import { columns } from "./columns";

interface RoleTableProps {
  roles: RoleT[];
}

const RoleTable = ({ roles }: RoleTableProps) => {
  return (
    <div>
      <DataTable
        heading="Roles"
        filterKey={"name"}
        data={roles}
        columns={columns}
      >
        <AddRole />
      </DataTable>
    </div>
  );
};

export default RoleTable;

import { DataTable } from "@/components/table/data-table";
import { permissionT } from "../_types";
import AddUser from "./add-user";
import { columns } from "./columns";

interface UserTableProps {
  permissions: permissionT[];
}

const UserTable = ({ permissions }: UserTableProps) => {
  return (
    <div>
      <DataTable
        heading="Permissions"
        filterKey={"name"}
        data={permissions}
        columns={columns}
      >
        <AddUser />
      </DataTable>
    </div>
  );
};

export default UserTable;

import { DataTable } from "@/components/table/data-table";
import { UserT } from "../_types";
import AddUser from "./add-user";
import { columns } from "./columns";

interface UserTableProps {
  users: UserT[];
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <div>
      <DataTable
        heading="Users"
        filterKey={"name"}
        data={users}
        columns={columns}
      >
        <AddUser />
      </DataTable>
    </div>
  );
};

export default UserTable;

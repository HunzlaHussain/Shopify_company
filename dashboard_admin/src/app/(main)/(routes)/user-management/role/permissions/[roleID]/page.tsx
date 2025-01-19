import { getAllUsers } from "./_actions";
import { permissionT } from "./_types";
import UserTable from "./_components/user-table";

const page = async () => {
  const permissions: permissionT[] = await getAllUsers();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <UserTable permissions={permissions} />
    </div>
  );
};

export default page;

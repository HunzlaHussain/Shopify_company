import { getAllRoles } from "./_actions";
import { RoleT } from "./_types";
import RoleTable from "./_components/role-table";

const page = async () => {
  const roles: RoleT[] = await getAllRoles();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <RoleTable roles={roles} />
    </div>
  );
};

export default page;

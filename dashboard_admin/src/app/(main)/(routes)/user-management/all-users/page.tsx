import { getAllUsers } from "./_actions";
import { UserT } from "./_types";
import UserTable from "./_components/user-table";

const page = async () => {
  const users: UserT[] = await getAllUsers();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <UserTable users={users} />
    </div>
  );
};

export default page;

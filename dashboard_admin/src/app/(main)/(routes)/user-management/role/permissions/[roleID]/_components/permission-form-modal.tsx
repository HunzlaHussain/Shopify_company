import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddPermissionInput, permissionFormSchema } from "@/validators/add-permission";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { editPermission , createPermission } from "../_actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import toast from "react-hot-toast";
import { permissionT } from "../_types";
import { Checkbox } from "rizzui"; // Make sure to adjust the import path based on the actual location

interface PermissionFormProps {
  data?: permissionT | null;
  roleId?: number;
}

const PermissionFormModal: FC<PermissionFormProps> = ({ data, roleId }) => {
  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const { token, business_id } = session?.user!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPermissionInput>({
    resolver: zodResolver(permissionFormSchema),
    defaultValues: {
      can_create: data?.role_permission[0]?.can_create ?? "0",
      can_view: data?.role_permission[0]?.can_view ?? "0",
      can_delete: data?.role_permission[0]?.can_delete ?? "0",
      can_update: data?.role_permission[0]?.can_update ?? "0",
      business_id,
      permission_id: data?.id || 0,
      role_id: String(roleId) || "",
    },
  });

  

  const onSubmit = async (permissionData: AddPermissionInput) => {
    try {
      setLoading(true);
      if (data) {
        await toast.promise(editPermission(permissionData, data?.id, token), {
          loading: "Updating...",
          success: "Success",
          error: "Something Went Wrong",
        });
      } 
      else {
        await toast.promise(createPermission(permissionData, token), {
          loading: "Adding...",
          success: "Success",
          error: "Something Went Wrong",
        });
      }

      refresh();
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const title = data ? "Edit Permission" : "Add New Permission";
  const action = data ? "Edit" : "Add";

  return (
    <div className="m-auto px-5 py-7 sm:p-10 space-y-2">
      <h4 className="text-center">{title}</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "gap-2 sm:gap-4 flex flex-grow flex-col @container [&_label.block>span]:font-medium"
        )}
      >
       <div className="flex items-center space-x-4">
          <Checkbox
            label="Create"
            {...register("can_create")}
            className="text-black"
          />

          <Checkbox
            label="View"
            {...register("can_view")}
            className="text-black"
          />

          <Checkbox
            label="Update"
            {...register("can_update")}
            className="text-black"
          />

          <Checkbox
            label="Delete"
            {...register("can_delete")}
            className="text-black"
          />
        </div>

        <Button
          className="bg-[#01C4FF] shadow-button active:bg-slate-100 focus:bg-slate-100 hover:bg-[#01C4FF]/90 active:bg-[#01C4FF]/90"
          type="submit"
          isLoading={loading}
        >
          {action}
        </Button>
      </form>
    </div>
  );
};

export default PermissionFormModal;

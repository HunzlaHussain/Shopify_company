import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddRoleInput, roleFormSchema } from "@/validators/add-role";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { createRole, editRole } from "../_actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import toast from "react-hot-toast";
import { RoleT } from "../_types";

interface RoleFormModalProps {
  role?: RoleT;
}

const RoleFormModal: FC<RoleFormModalProps> = ({ role }) => {
  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const { token, business_id } = session?.user!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddRoleInput>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: role?.name || "",
      bussines_id: role?.bussines_id || business_id,
    },
  });

  const onSubmit = async (data: AddRoleInput) => {
    try {
      setLoading((loading) => !loading);
      role
        ? await toast.promise(editRole(data, role?.id, token), {
            loading: "Updating...",
            success: "Success",
            error: "Something Went Wrong",
          })
        : await toast.promise(createRole(data, token), {
            loading: "Adding...",
            success: "Success",
            error: "Something Went Wrong",
          });

      refresh();
      closeModal();
    } catch (error) {
        console.error("API Error:", error);
    } finally {
      setLoading((loading) => !loading);
    }
  };

  const title = role ? "Edit Role" : "Add New Role";
  const action = role ? "Edit" : "Add";
  return (
    <div className="m-auto px-5 py-7 sm:p-10 space-y-2">
      <h4 className="text-center">{title}</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "gap-2 sm:gap-4 flex flex-grow flex-col @container [&_label.block>span]:font-medium"
        )}
      >
        <Input
          label="Name"
          placeholder="Name"
          {...register(`name`)}
          error={errors?.name?.message}
        />
        <Button
          color="primary"
          className=" shadow-button "
          type="submit"
          isLoading={loading}
        >
          {action}
        </Button>
      </form>
    </div>
  );
};

export default RoleFormModal;

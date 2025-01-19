"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const RoleFormModal = dynamic(() => import("./role-form-modal"), {
  ssr: false,
});

const AddRole = () => {
  const { openModal } = useModal();
  return (
    <Button
      color="primary"
      onClick={() =>
        openModal({
          view: <RoleFormModal />,
          customSize: "480px",
        })
      }
      className={cn("h-auto  w-fit  shadow-button ")}
    >
      Add Role
    </Button>
  );
};

export default AddRole;

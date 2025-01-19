"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const PermissionFormModal = dynamic(() => import("./permission-form-modal"), {
  ssr: false,
});

const AddUser = () => {
  const { openModal } = useModal();
  return (
    <Button
      color="primary"
      onClick={() =>
        openModal({
          view: <PermissionFormModal />,
          customSize: "480px",
        })
      }
      className={cn("h-auto  w-fit  shadow-button ")}
    >
      Add Permission
    </Button>
  );
};

export default AddUser;

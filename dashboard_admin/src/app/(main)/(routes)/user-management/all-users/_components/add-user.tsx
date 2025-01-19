"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const UserFormModal = dynamic(() => import("./user-form-modal"), {
  ssr: false,
});

const AddUser = () => {
  const { openModal } = useModal();
  return (
    <Button
      color="primary"
      onClick={() =>
        openModal({
          view: <UserFormModal />,
          customSize: "480px",
        })
      }
      className={cn("h-auto  w-fit  shadow-button ")}
    >
      Add Users
    </Button>
  );
};

export default AddUser;

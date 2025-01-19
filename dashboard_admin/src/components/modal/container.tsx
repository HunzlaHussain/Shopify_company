"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useModal } from "./use-modal";
import { ActionIcon } from "@/components/ui/action-icon";
import { X } from "lucide-react";

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize } = useModal();
  const pathname = usePathname();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      customSize={customSize}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      containerClassName="dark:bg-gray-100 relative"
    >
      <ActionIcon
        size="sm"
        variant="text"
        onClick={() => closeModal()}
        className="p-0 text-gray-500 absolute top-2.5 right-2.5 sm:top-5 sm:right-5  hover:!text-gray-900"
      >
        <X className="h-6 sm:h-10 w-6 sm:w-10" />
      </ActionIcon>
      {view}
    </Modal>
  );
}

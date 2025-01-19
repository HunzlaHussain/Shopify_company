"use client";

import { Title, Text } from "@/components/ui/text";
import { ActionIcon } from "@/components/ui/action-icon";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { PiTrashFill } from "react-icons/pi";
import { TrashIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

type DeletePopoverProps = {
  title: string;
  description: string;
  onDelete: (token: string) => Promise<any>;
};

export default function DeletePopover({
  title,
  description,
  onDelete,
}: DeletePopoverProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { refresh } = useRouter();
  const { data: session } = useSession();
  const { token } = session?.user!;

  const clickHandle = async () => {
    try {
      setLoading(true);
      await toast.promise(onDelete(token), {
        loading: "Deleting...",
        success: "Success",
        error: "Failed",
      });

      refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Popover
      placement="left"
      className="z-50"
      content={({ setOpen }) => (
        <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
          <Title
            as="h6"
            className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
          >
            <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {title}
          </Title>
          <Text className="mb-2 leading-relaxed text-gray-500">
            {description}
          </Text>
          <div className="flex items-center justify-end">
            <Button
              color="primary"
              disabled={loading}
              isLoading={loading}
              size="sm"
              className="me-1.5 h-7"
              onClick={async () => {
                await clickHandle();
                setOpen(false);
              }}
            >
              Yes
            </Button>
            <Button
              disabled={loading}
              size="sm"
              variant="outline"
              color="primary"
              className="h-7"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      )}
    >
      <ActionIcon
        size="sm"
        variant="outline"
        aria-label={"Delete Item"}
        className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
      >
        <TrashIcon className="h-4 w-4" />
      </ActionIcon>
    </Popover>
  );
}

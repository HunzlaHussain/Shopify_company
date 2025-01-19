"use client";
import { RefObject, useState } from "react";
import { useMedia } from "@/hooks/use-media";
import { Popover } from "../ui/popover";

function NotificationsList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="w-72 max-w-[320px]  text-left rtl:text-right sm:max-w-[360px]  2xl:max-w-[420px]">
      Notifications Will Go Here
    </div>
  );
}

const NotificationDropdown = ({
  children,
}: {
  children: JSX.Element & { ref?: RefObject<any> };
}) => {
  const isMobile = useMedia("(max-width: 480px)", false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <NotificationsList setIsOpen={setIsOpen} />}
      shadow="sm"
      placement={isMobile ? "bottom" : "bottom-end"}
      className="z-50 px-0s pb-4 px-6 pt-5 bg-white [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex"
    >
      {children}
    </Popover>
  );
};

export default NotificationDropdown;

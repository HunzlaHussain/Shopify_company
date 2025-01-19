"use client";
import { RefObject, useState } from "react";
import { useMedia } from "@/hooks/use-media";
import { Popover } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

function UserDropdown({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleLogout = () => {
    signOut({ callbackUrl: "/sign-in" });
  };
  return (
    <div className="w-72 max-w-[320px]  text-left rtl:text-right sm:max-w-[360px]  2xl:max-w-[420px]">
      <Button
        color="danger"
        onClick={handleLogout}
        className=" w-full shadow-button "
        type="submit"
        // isLoading={loading}
      >
        <LogOutIcon className="ml-2 " />
        Logout
      </Button>
    </div>
  );
}

const UsersDropdown = ({
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
      content={() => <UserDropdown setIsOpen={setIsOpen} />}
      shadow="sm"
      placement={isMobile ? "bottom" : "bottom-end"}
      className="z-50 px-0s pb-4 px-6 pt-5 bg-white [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex"
    >
      {children}
    </Popover>
  );
};

export default UsersDropdown;

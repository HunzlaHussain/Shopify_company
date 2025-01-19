import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { useModal } from "@/components/modal/use-modal";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteCourse } from "../_actions";

const ClassAction = ({ data, classroomShow }: any) => {
  const { openModal } = useModal();
  const { refresh } = useRouter();
  const { data: session } = useSession();
  const { token, business_id } = session?.user!;
  const [loading, setLoading] = useState<boolean>(false);

  //   const handleEditClick = async () => {
  //     try {
  //       setLoading(true);
  //       toast.promise(new Promise((resolve) => {}), {
  //         loading: "Loading...",
  //         success: "Loaded successfully",
  //         error: "Error while loading",
  //       });

  //       const userData = await getAllSections(token, business_id);

  //       toast.dismiss();
  //       openModal({
  //         view: <ClassFormModal classes={data} sections={userData} />,
  //         customSize: "600px",
  //       });
  //     } catch (error) {
  //       toast.error("Error fetching data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const handleDeleteClick = async () => {
    try {
      setLoading(true);
      await toast.promise(deleteCourse(data.id, token), {
        loading: "Deleting...",
        success: "Deleted successfully",
        error: "Something Went Wrong",
      });
      refresh();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex pl-2">
      <div className="flex gap-2">
        {/* {classroomShow?.can_update === "1" && (
          <Tooltip
            size="sm"
            content={() => "Edit Class"}
            placement="top"
            color="invert"
          >
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
              onClick={handleEditClick}
              disabled={loading}
            >
              <MdEdit className="w-5 h-5 text-lms-blueprimary" />
            </ActionIcon>
          </Tooltip>
        )} */}
        <Tooltip
          size="sm"
          content={() => "Delete Class"}
          placement="top"
          color="invert"
        >
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:!border-gray-900 hover:text-gray-700"
            onClick={handleDeleteClick}
            disabled={loading}
          >
            <MdDelete className="w-5 h-5 text-lms-blueprimary" />
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  );
};

export default ClassAction;

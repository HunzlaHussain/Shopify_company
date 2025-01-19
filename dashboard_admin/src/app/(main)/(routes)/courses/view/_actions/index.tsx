import axios from "axios";
import { getServerAuthSession } from "@/lib/auth";

export const getAllCourses = async () => {
  const session = await getServerAuthSession(); // Await session retrieval
  console.log(session);
  try {
    const courses = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}courses/api/allcourse`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
      }
    );
    console.log(courses.data);
    return courses.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const deleteCourse = async (id: any, token: any) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}courses/api/delete/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error deleting course:", error);
  }
};

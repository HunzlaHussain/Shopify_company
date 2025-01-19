import React from "react";
import CourseTable from "./_components/courses_table";
import { getAllCourses } from "./_actions";
const page = async () => {
  const course = await getAllCourses();
  console.log(course);
  return (
    <div>
      <CourseTable course={course} />
    </div>
  );
};

export default page;

"use client";
import { DataTable } from "@/components/table/data-table";
import React, { useState } from "react";
import { columns } from "./column";

const CourseTable = ({ course }: any) => {
  console.log(course);
  const transformedCourses = course?.courses?.map((course: any) => ({
    id: course.id,
    title: course.course_title,
    description: course.course_description,
    duration: course.course_duration,
    price: course.course_price,
    image: course.course_image,
    userId: course.userId,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
  }));

  console.log(transformedCourses);
  const mockData = [
    {
      id: 1,
      name: "Class A",
      sections: [{ name: "Section 1" }, { name: "Section 2" }],
    },
    { id: 2, name: "Class B", sections: [{ name: "Section 3" }] },
  ];

  return (
    <div>
      <DataTable
        heading=""
        filterKey="name"
        data={transformedCourses}
        columns={columns()}
      >
        {/* Include any additional elements or content to render within the DataTable */}
        <div></div>
      </DataTable>
    </div>
  );
};

export default CourseTable;

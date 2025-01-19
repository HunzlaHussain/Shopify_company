"use client";
import { Courses, CoursesSchema } from "@/validators/add_courses";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Input, Textarea, Button, FileInput } from "rizzui";
import { ToastContainer, toast } from "react-toastify";

export default function CourseForm() {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<Courses>({
    resolver: zodResolver(CoursesSchema),
    defaultValues: {
      courses: [
        {
          course_title: "",
          course_description: "",
          course_duration: "",
          course_image: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses", // Use the correct field name for the array of courses
  });
  // Function to handle file input and convert to URL
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    console.log(file, "file");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the file URL or base64 string to the form state
        setValue(`courses.${index}.course_image`, file as any); // Save as string (base64 URL)
      };
      reader.readAsDataURL(file); // Convert image file to base64 URL
    }
  };
  const session = useSession();
  const token = session?.data?.user?.token;
  const onSubmit: SubmitHandler<Courses> = async (data) => {
    try {
      await toast.promise(
        axios.post("http://localhost:4000/courses/api/add", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          pending: "Submitting your courses...",
          success: "Courses added successfully!",
          error: "Failed to add courses. Please try again.",
        }
      );
    } catch (error) {
      console.error("Error adding courses:", error);
      toast.error(
        "Something went wrong! Please check your input or try again."
      );
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            {/* Course Title */}
            <div>
              <label
                htmlFor={`courseTitle-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Course Title {index + 1}
              </label>
              <Input
                id={`courseTitle-${index}`}
                {...register(`courses.${index}.course_title`)}
                type="text"
                placeholder="Enter course title"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors?.courses?.[index]?.course_title && (
                <span className="text-sm text-red-600">
                  {errors?.courses?.[index]?.course_title?.message}
                </span>
              )}
            </div>

            {/* Course Description */}
            <div>
              <label
                htmlFor={`description-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Course Description {index + 1}
              </label>
              <Textarea
                id={`description-${index}`}
                {...register(`courses.${index}.course_description`)}
                placeholder="Enter course description"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors?.courses?.[index]?.course_description && (
                <span className="text-sm text-red-600">
                  {errors?.courses?.[index]?.course_description?.message}
                </span>
              )}
            </div>

            {/* Course Duration */}
            <div>
              <label
                htmlFor={`duration-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Course Duration {index + 1}
              </label>
              <Input
                id={`duration-${index}`}
                {...register(`courses.${index}.course_duration`)}
                type="text"
                placeholder="Enter course duration (e.g., 4 weeks)"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors?.courses?.[index]?.course_duration && (
                <span className="text-sm text-red-600">
                  {errors?.courses?.[index]?.course_duration?.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor={`price-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Course Price {index + 1}
              </label>
              <Input
                id={`price-${index}`}
                {...register(`courses.${index}.course_price`)}
                type="text"
                placeholder="Enter course duration (e.g., 4 weeks)"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors?.courses?.[index]?.course_price && (
                <span className="text-sm text-red-600">
                  {errors?.courses?.[index]?.course_price?.message}
                </span>
              )}
            </div>

            {/* Course Image */}
            <div>
              <label
                htmlFor={`image-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Course Image {index + 1}
              </label>
              <input
                id={`image-${index}`}
                type="file"
                onChange={(e) => handleImageChange(e, index)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Remove Button for Each Course */}
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white hover:bg-red-700 py-2 px-4 rounded-md"
              >
                Remove Course {index + 1}
              </Button>
            </div>
          </div>
        ))}

        {/* Add New Course Button */}
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() =>
              append({
                course_title: "",
                course_description: "",
                course_duration: "",
                course_image: "",
                course_price: "",
              })
            } // Add a new empty course object
            className="w-full py-3 bg-[#01C4FF] text-white rounded-md hover:bg-blue-700"
          >
            Add New Course
          </Button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full py-3 bg-[#01C4FF] text-white rounded-md hover:bg-blue-700"
          >
            Create Courses
          </Button>
        </div>
      </form>
    </div>
  );
}

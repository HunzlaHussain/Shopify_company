import z from "zod";

export const CoursesSchema = z.object({
  courses: z.array(
    z.object({
      course_title: z.string().min(1, "Course title is required"),
      course_description: z.string().min(1, "Course description is required"),
      course_duration: z.string().min(1, "Course duration is required"),
      course_price: z.string().min(1, "Course price is required"),
      course_image: z.any().optional(),
    })
  ),
});

export type Courses = z.infer<typeof CoursesSchema>;

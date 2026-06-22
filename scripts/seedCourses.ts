import { supabaseAdmin } from "../lib/supabaseAdmin";
import courses from "../data/courses"; // your big array

async function seedCourses() {
  for (const course of courses) {
    const { error } = await supabaseAdmin.from("Course").upsert({
      code: course.code,
      title: course.name,
      description: course.description,
      duration: course.duration,
      price: course.price,
      level: course.level,
      category: course.category,
      image: course.image,
    });

    if (error) {
      console.log("Error inserting:", course.code, error.message);
    } else {
      console.log("Inserted:", course.code);
    }
  }
}

seedCourses();
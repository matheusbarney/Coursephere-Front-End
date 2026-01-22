import React from "react";
import { CourseCard } from '../components/CourseCard';

export function CourseTemplate({
  course
}) {
  return <>
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
      <CourseCard course={course} />
    </div>
    </>;
}
  
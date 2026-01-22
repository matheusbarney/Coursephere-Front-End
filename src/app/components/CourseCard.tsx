import React from "react";
import { CourseList } from '../atoms/CourseList';
import { StandardHeader } from '../atoms/StandardHeader';
import { LoadingText } from '../atoms/LoadingText';

export function CourseCard({
  course
}) {
  return <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
        <StandardHeader text={`Course Details`} />
        <br></br>
        {course ? <CourseList course={course} /> : <LoadingText     />}
      </div>;
}
  
import { Form } from '../organisms/Form';
import { FormField } from '../molecules/FormField';
import Button from '../atoms/Button';

import useAuth from '../../hooks/useAuth';
import{ useParams, useNavigate } from 'react-router-dom';
import {SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseService } from '../../services/courseService'
import { compareAsc } from 'date-fns'

import useToast from '../../hooks/useToast';

const schema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  start_date: z.iso.date().min(1, "A start date is required."),
  end_date: z.iso.date().min(1, "An end date is required.")
}).refine(schema => {
    return compareAsc(new Date(schema.start_date), new Date(schema.end_date)) <= 0;
  }, {
    message: "Course must end on a date equal to or after start date.",
    path: ["end_date"] // This shows the error on the end_date field
  });

type FormFields = z.infer<typeof schema>;

export function EditCourseMain()
{
    const { courseId } = useParams();
    const isEditMode = Boolean(courseId);
    const navigate = useNavigate();
    const { user, RefreshPermissions } = useAuth();
    const { toastError, toastInfo } = useToast();

    const { 
        register, handleSubmit, setError, reset, formState: { errors, isSubmitting } 
    } = useForm<FormFields>({ 
        resolver: zodResolver(schema),
    });
    
    useEffect(() => {
      if (isEditMode) {
        const loadCourse = async() => {
        try {
            const course = await courseService.getById(courseId);
            reset({
              name: course.name,
              description: course.description,
              start_date: course.start_date,
              end_date: course.end_date
            });
        } catch (error) {
            toastError("Failed to load course");
        };
        };
        loadCourse();
      }

    }, [courseId, reset]);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
          if (isEditMode) { 
            const response = await courseService.editCourse(courseId, data)
            console.log("Updated!");
            navigate(`/course/${courseId}`);
          } 
          else 
          { // Adding Mode
            const courseData = {
              ...data,
              creator_id: user.id,
              instructors: []
            };
            const response = await courseService.addCourse(courseData)
            console.log("Course added to database!", response);
            RefreshPermissions();
            navigate(`/course/${response.id}`);
          }

        } catch (error) {
        setError("root", { message: 'Invalid field pending.',});
        }
    };

    const handleDelete = async (courseId) => {
      try {
        await courseService.deleteById(courseId)
        toastInfo("Course was removed from CourseSphere.");
        navigate(`/`);
      } catch (err) {
        console.error('Error in Delete:', err);
      }
    }



  return <div className="flex-col w-full lg:w-200 h-screen place-items-center bg-white px-10 shadow-xl dark:bg-white/10">
          <h1 className="text-gray-600-bold flex justify-center py-4 text-5xl">{isEditMode ? 'Edit Course' : 'Add Course'}</h1>

          <Form handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors}>
            
            <FormField register={register} errors={errors} name="name" label="Name:" placeholder="Enter name" />
            <FormField register={register} errors={errors} name="description" label="Description:" placeholder="Enter description" />
            <FormField register={register} errors={errors} name="start_date" label="Start Date:" placeholder="Enter start date" type="date" />
            <FormField register={register} errors={errors} name="end_date" label="End Date:" placeholder="Enter end date" type="date" />
            <div className="flex justify-center gap-4">
              <div className="flex justify-center pt-8">
                <Button type="submit" mainText={isEditMode ? 'Edit' : 'Add'} showText={true} isSubmitting={isSubmitting} />
              </div>
              {isEditMode === true && (
                <div className="flex justify-center pt-8">
                  <Button type="button" mainText={'Delete'} showText={true} onClick={() => handleDelete(courseId)} />
                </div>
              )};
            </div>

          </Form>

        </div>;
}
  
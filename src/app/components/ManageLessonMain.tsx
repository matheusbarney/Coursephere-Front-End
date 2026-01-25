import { Form } from '../organisms/Form';
import { FormField } from '../molecules/FormField';
import { SelectField } from '../molecules/SelectField';
import Button from '../atoms/Button';

import useAuth from '../../hooks/useAuth';
import{ useParams, useNavigate } from 'react-router-dom';
import {SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { lessonService } from '../../services/lessonService'
import { compareAsc } from 'date-fns';

import useToast from '../../hooks/useToast';

const schema = z.object({
  title: z.string().min(3, "Title is required."),
  status: z.string().min(1, "Include a status."),
  publish_date: z.iso.date().min(1, "A publish date is required."),
  video_url: z.url("A valid URL is required."),
}).refine(schema => {
    return compareAsc(new Date(), new Date(schema.publish_date)) <= 0;
  }, {
    message: "Lesson must be published at a future date.",
    path: ["publish_date"] // This shows the error on the publish_date field
  });

type FormFields = z.infer<typeof schema>;

export function EditLessonMain()
{
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { lessonId } = useParams();
    const isEditMode = Boolean(lessonId);
    const [creator_id, setCreator] = useState(null);
    const { user, RefreshPermissions } = useAuth();
    const { toastError } = useToast();

    const { 
        register, handleSubmit, setError, reset, formState: { errors, isSubmitting } 
    } = useForm<FormFields>({ 
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (isEditMode) {
            const loadLesson = async() => {
            try {
                const lesson = await lessonService.getById(lessonId);
                setCreator(lesson.creator_id)
                reset({
                    title: lesson.title,
                    status: lesson.status,
                    publish_date: lesson.publish_date,
                    video_url: lesson.video_url,
                });
            } catch (error) {
                toastError("Failed to load lesson");
            };
            };
    
            loadLesson();
        }
    }, [lessonId, reset]);
    
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
        if (isEditMode) {
            const response = await lessonService.editLesson(lessonId, {
                ...data,
                course_id: courseId,
                creator_id: creator_id,
            });
            console.log("Updated!");
            navigate(`/course/${courseId}/lesson/${lessonId}`);
        } 
        else // Adding Mode 
        {
            const lessonData = {
                ...data,
                course_id: courseId,
                creator_id: user.id,
            };
            const response = await lessonService.addLesson(lessonData)
            RefreshPermissions();
            console.log("Lesson added to database!", response);

            navigate(`/course/${courseId}/lesson/${response.id}`);   
        }


        } catch (error) {
        setError("root", { message: 'Invalid field pending.',});
        }
    };
    
  return <div className="flex-col w-200 h-screen place-items-center bg-white px-10 shadow-xl dark:bg-white/10">
          <h1 className="text-gray-600-bold flex justify-center py-4 text-5xl">{isEditMode ? 'Edit Lesson' : 'Add Lesson'}</h1>

          <Form handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors}>
            
            <FormField register={register} errors={errors} name="title" label="Title:" placeholder="Enter lesson title" />
            <SelectField
                register={register}
                errors={errors}
                name="status"
                label="Status"
                placeholder="Please enter a lesson status"
                options={[
                    { value: "draft", label: "Draft" },
                    { value: "published", label: "Published" },
                    { value: "archived", label: "Archived" }
                ]}
            />
            <FormField register={register} errors={errors} name="publish_date" label="Publish Date:" placeholder="Enter publish date" type="date" />
            <FormField register={register} errors={errors} name="video_url" label="URL:" placeholder="Enter Video URL" />
            <div className="flex justify-center pt-8">
              <Button type="submit" mainText={isEditMode ? 'Edit' : 'Add'} showText={true} isSubmitting={isSubmitting} />
            </div>

          </Form>

        </div>;
}
  
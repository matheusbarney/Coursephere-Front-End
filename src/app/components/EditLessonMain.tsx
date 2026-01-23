import { Form } from '../organisms/Form';
import { FormField } from '../molecules/FormField';
import Button from '../atoms/Button';

import React from "react";

import{ useParams, useNavigate } from 'react-router-dom';
import {SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { lessonService } from '../../services/lessonService'


const schema = z.object({
  title: z.string().min(1, "Title is required."),
  status: z.string().min(1, "Include a status."),
  publish_date: z.iso.date().min(1, "A publish date is required."),
  video_url: z.string().min(1, "A URL to the video is required."),
})

type FormFields = z.infer<typeof schema>;

export function EditLessonMain()
{
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { lessonId } = useParams();
    const [creator_id, setCreator] = useState(null);

    const { 
        register, handleSubmit, setError, reset, formState: { errors, isSubmitting } 
    } = useForm<FormFields>({ 
        resolver: zodResolver(schema),
    });

    useEffect(() => {
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
                setError("root", { message: 'Failed to load lesson.',});
            };
            };
    
            loadLesson();
        }, [lessonId, reset]);
    
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
        const response = await lessonService.editLesson(lessonId, {
            ...data,
            course_id: courseId,
            creator_id: creator_id,
        });
        console.log("Updated!");
        navigate(`/course/${courseId}/lesson/${lessonId}`);
        } catch (error) {
        setError("root", { message: 'Invalid field pending.',});
        }
    };
    
  return <div className="flex-col w-200 h-screen place-items-center bg-white px-10 shadow-xl dark:bg-white/10">
          <h1 className="text-gray-600-bold flex justify-center py-4 text-5xl">Edit Lesson</h1>

          <Form handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors}>
            
            <FormField register={register} errors={errors} name="title" label="Title:" placeholder="Enter lesson title" />
            <FormField register={register} errors={errors} name="status" label="Status:" placeholder="Enter lesson status" />
            <FormField register={register} errors={errors} name="publish_date" label="Publish Date:" placeholder="Enter publish date" type="date" />
            <FormField register={register} errors={errors} name="video_url" label="URL:" placeholder="Enter Video URL" />
            <div className="flex justify-center pt-8">
              <Button type="submit" mainText="Edit" showText={true} isSubmitting={isSubmitting} />
            </div>

          </Form>

        </div>;
}
  
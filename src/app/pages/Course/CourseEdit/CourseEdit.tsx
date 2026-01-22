import { Form } from '../../../organisms/Form';
import { FormField } from '../../../molecules/FormField';
import Button from '../../../atoms/Button';
import{ useParams, useNavigate } from 'react-router-dom';
import {SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseService } from '../../../../services/courseService'

const schema = z.object({
  name: z.string(),
  description: z.string(),
  start_date: z.iso.date(),
  end_date: z.iso.date()
});

type FormFields = z.infer<typeof schema>;

function CourseEdit() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { 
    register, handleSubmit, setError, formState: { errors, isSubmitting } 
  } = useForm<FormFields>({ 
    resolver: zodResolver(schema),
  });
  
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await courseService.editCourse(courseId, data)
      console.log("Updated!");
      navigate(`/course/${courseId}`);
    } catch (error) {
      setError("root", { message: 'Invalid field pending.',});
    }
  };

  return (
    <>

      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
        <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
          <h1 className="text-gray-600-bold flex justify-center pb-4 text-5xl">Edit Course</h1>

          <Form handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors}>
            
            <FormField register={register} errors={errors} name="name" label="Name:" placeholder="Enter new name" />
            <FormField register={register} errors={errors} name="description" label="Description:" placeholder="Enter new desc." />
            <FormField register={register} errors={errors} name="start_date" label="Start Date:" placeholder="Enter new start d" type="date" />
            <FormField register={register} errors={errors} name="end_date" label="End Date:" placeholder="Enter new end d" type="date" />
            <div className="flex justify-center pt-8 pb-4">
              <Button type="submit" mainText="Edit" showText={true} isSubmitting={isSubmitting} />
            </div>

          </Form>

        </div>
      </div>

    </>
  );
};

export default CourseEdit

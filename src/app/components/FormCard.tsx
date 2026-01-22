import React from "react";

import { StandardHeader } from '../atoms/StandardHeader';
import { Form } from '../organisms/Form';
import { FormField } from '../mols/FormField';
import Button from '../atoms/Button';

export function FormCard({
  handleSubmit,
  onSubmit,
  errors,
  register,
  isSubmitting
}) {
  return <div className="w-128 h-156 flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">

        <StandardHeader text="Login" />

        <Form handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors}>
          
          <FormField register={register} errors={errors} name="email" label="Email:" placeholder="Enter email" />
          <FormField register={register} errors={errors} name="password" label="Password:" placeholder="Enter password" />
          <div className="flex justify-center pt-8 pb-12">
            <Button type="submit" mainText="Login to CourseSphere" showText={true} isSubmitting={isSubmitting} />
          </div>

        </Form>

      </div>;
}
  
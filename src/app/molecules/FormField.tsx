import React from "react";
import Input from '../atoms/Input';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface FormFieldProps {
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "checkbox";
}

export function FormField({
  register,
  errors,
  name,
  label,
  placeholder,
  type = "text"
}: FormFieldProps) {
  return (
    <div className="w-full py-5">
      <p className="pb-2 text-xl text-gray-800">{label}</p>
      <Input 
        register={register} 
        name={name} 
        type={type}
        placeholder={placeholder} 
      />
      {errors?.[name] && (
        <div className="text-red-500">
          {errors[name]?.message as string}
        </div>
      )}
    </div>
  );
}

export default FormField;
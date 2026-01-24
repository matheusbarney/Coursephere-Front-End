import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  name: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
}

export function SelectField({
  register,
  errors,
  name,
  label,
  placeholder = "Select an option",
  options
}: SelectFieldProps) {
  return (
    <div className="w-full py-4">
      <p className="pb-1 text-xl text-gray-800">{label}</p>
      <select
        {...register(name)}
        className="w-full px-5 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-800 focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors?.[name] && (
        <div className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </div>
      )}
    </div>
  );
}

export default SelectField;
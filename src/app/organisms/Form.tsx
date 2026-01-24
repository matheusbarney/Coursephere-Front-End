
import Button from '../atoms/Button';
import { UseFormHandleSubmit, FieldErrors } from 'react-hook-form';

interface FormProps {
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit
  errors?: FieldErrors;
  children: React.ReactNode;
}


export function Form({
  handleSubmit,
  onSubmit,
  errors,
  children,
}: FormProps) {
    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>   
            {children}
            {/*ex: <FormField   
                        register={register}
                        errors={errors}
                        name="email"
                        label="Email:"
                        placeholder="Enter email"
                      /> */} 

            {/* Root error at end of form */}
            {errors?.root && (
            <div className='text-red-500 text-xl italic text-center'>
            {errors.root.message as string}
        </div>
      )}
        </form>
    );
};
  
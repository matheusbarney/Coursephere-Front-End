import { LoginTemplate } from '../../templates/LoginTemplate';

//
import {SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

function Login() {

  const { 
    register, handleSubmit, setError, formState: { errors, isSubmitting } 
  } = useForm<FormFields>({ 
    resolver: zodResolver(schema),
  });
  
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", { message: "Error connecting to server",});
    }
  };

  return (
    <LoginTemplate   handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} isSubmitting={isSubmitting}  />
  );
}

export default Login

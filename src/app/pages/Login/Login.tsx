import { LoginTemplate } from '../../templates/LoginTemplate';
//
import { useContext } from 'react';
import AuthContext from '../../../contexts/auth';
import {SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import useToast from '../../../hooks/useToast';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

function Login() {
  const { Login } = useContext(AuthContext);
  const { toastError, toastSuccess } = useToast();

  const { 
    register, handleSubmit, setError, formState: { errors, isSubmitting } 
  } = useForm<FormFields>({ 
    resolver: zodResolver(schema),
  });
  
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await Login(data.email, data.password);
      console.log(Login);
      toastSuccess("Logged in with success!")
    } catch (error) {
      toastError("Invalid email or password");
    }
  };

  return (
    <LoginTemplate   handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} isSubmitting={isSubmitting}  />
  );
}

export default Login

import React from "react";
import { FormCard } from '../components/FormCard';

export function LoginTemplate({handleSubmit, onSubmit, errors, register, isSubmitting}) {
  return (<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">

  <FormCard handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} isSubmitting={isSubmitting} />

</div>);
}
  
  
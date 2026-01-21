import { useState, useContext } from 'react';
import AuthContext from '../../../contexts/auth';

function Login() {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const context = useContext(AuthContext);


  function handleChange(event) {
    const { name, value} = event.target;
    setFormData(prev => ({...prev, [name]: value}));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const user = await context.Login(formData.email, formData.password);
      if (user) {
        setSuccessMessage('Login successful!');
        console.log('User logged in:', user.name);
      }
    } catch (error) {
      setErrorMessage('Could not connect to server.')
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
      <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
        <h1 className="text-gray-600-bold flex justify-center pb-4 text-5xl">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full py-5">
            <p className="pb-2 text-xl text-gray-800">Email:</p>
            <input onChange={handleChange} name="email" type="text" className="w-full rounded-md bg-neutral-100 px-5 py-4 text-xl shadow-xs focus:ring-1 focus:ring-teal-800 focus:outline-none" placeholder="Enter email" required />
          </div>
      
          <div className="w-full py-5">
            <p className="pb-2 text-xl text-gray-800">Password:</p>
            <input onChange={handleChange} name="password" type="password" className="w-full rounded-md bg-neutral-100 px-5 py-4 text-xl shadow-xs focus:ring-1 focus:ring-teal-800 focus:outline-none" placeholder="Enter password" required />
          </div>
      
          <div className="flex justify-center pt-8 pb-12">
            <button type="submit" className="rounded-2xl bg-teal-500 px-24 py-6 text-2xl text-neutral-100 shadow-xl hover:bg-cyan-700 hover:text-neutral-200">Enter CourseSphere Account</button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Login

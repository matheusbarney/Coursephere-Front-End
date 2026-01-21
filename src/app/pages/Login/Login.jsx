
import { useState } from 'react';

function Login() {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    const { name, value} = event.target;
    setFormData(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    fetch('http://localhost:8000/users')
      .then(res => res.json())
      .then(users => {
        const user = users.find(u => u.email === formData.email && u.password === formData.password);
        
        if (user) {
          setSuccessMessage('Login successful!');
          console.log('User logged in:', user);
          
        } else {
          setErrorMessage('Invalid email or password');
        }
      })
      .catch(error => {
        setErrorMessage('Failed to connect to server');
        console.error(error);
      });
  }

  return (
    <div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
      <div class="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
        <h1 class="text-gray-600-bold flex justify-center pb-4 text-5xl">Login</h1>
        <form>
          <div class="w-full py-5">
            <p class="pb-2 text-xl text-gray-800">Email:</p>
            <input type="text" class="w-full rounded-md bg-neutral-100 px-5 py-4 text-xl shadow-xs focus:ring-1 focus:ring-teal-800 focus:outline-none" placeholder="Enter email" required />
          </div>
      
          <div class="w-full py-5">
            <p class="pb-2 text-xl text-gray-800">Password:</p>
            <input type="text" class="w-full rounded-md bg-neutral-100 px-5 py-4 text-xl shadow-xs focus:ring-1 focus:ring-teal-800 focus:outline-none" placeholder="Enter password" required />
          </div>
      
          <div class="flex justify-center pt-8 pb-12">
            <button class="rounded-2xl bg-teal-500 px-24 py-6 text-2xl text-neutral-100 shadow-xl hover:bg-cyan-700 hover:text-neutral-200">Enter CourseSphere Account</button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Login

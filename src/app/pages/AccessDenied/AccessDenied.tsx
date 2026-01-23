import { Link } from 'react-router-dom';

function AccessDenied() {
  return (
    <>

      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
        <div className="flex-col place-items-center flex justify-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
          <h1 className="text-gray-600-bold flex justify-center pb-4 text-5xl">You do not have clearance to view this information</h1>
          <Link to={"/"}>
            <button className="rounded-2xl bg-teal-500 px-24 py-6 text-2xl text-neutral-100 shadow-xl hover:bg-cyan-700 hover:text-neutral-200">Go back to Dashboard</button>
          </Link>
        </div>
      </div>

    </>
  )
}


export default AccessDenied

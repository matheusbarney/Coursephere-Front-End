
import '../../../App.css'

function AccessDenied() {
  return (
    <>

      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
        <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
          <h1 className="text-gray-600-bold flex justify-center pb-4 text-5xl">You do not have clearance to view this information</h1>
        </div>
      </div>

    </>
  )
}


export default AccessDenied

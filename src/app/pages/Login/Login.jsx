import '../../../index.css'

function Login() {


  return (
    <div>

      <h1 className="text-emerald-400 p-8">Login</h1>
      
      <div>

        <div>
          <form>
          <input type="text" placeholder="Email" />
          </form>
        </div>

        <div>
          <form>
          <input type="text" placeholder="Password" />
          </form>
        </div>

        <div>
          <button className="p-100">
            Login to CourseSphere
          </button>
        </div>

      </div>

    </div>
  );
}

export default Login

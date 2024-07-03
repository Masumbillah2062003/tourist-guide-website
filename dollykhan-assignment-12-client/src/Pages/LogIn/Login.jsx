import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import auth from "../../Firebase/firebase.config";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import loginImg from "../../assets/images/login.svg";
import SocialLogin from "../../Component/SocialLogin/SocialLogin";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Login = () => {

  const { signIn, loading } = useAuth(auth);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password).then((result) => {
      const user = result.user;
      if (user) {
        const userInfo = {
          name: data.name || 'Unavailable',
          email: data.email,
          role: "user",
          picture: user.photoURL,
          contact: "Unavailable",
          details: "Unavailable",
          education: "Unavailable",
          skills: "Unavailable",
          work: "Unavailable",
          experience: "Unavailable",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your login has been Successfull",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          }
        });
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your login has been Successfull",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      <Helmet>
        <title>Tourist | Log in</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="hero min-h-screen bg-slate-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="shadow-2xl bg-base-100 lg:flex lg:gap-10 lg:p-8 items-center justify-center">
            <div className="w-1/2 mr-12 lg:block hidden">
              <img src={loginImg} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm bg-slate-200">
              <div className="card-body">
                <h1 className="text-3xl text-center font-bold">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="email"
                      className="input input-bordered"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-600">
                        Email field is required
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="text"
                      placeholder="password"
                      className="input input-bordered"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-red-600">
                        Password field is required
                      </span>
                    )}
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label>
                  </div>
                  {/* <div className="form-control">
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input
                    type="text"
                    name="captcha"
                    onBlur={handleValidateCaptcha}
                    placeholder="type the captcha above"
                    className="input input-bordered"
                  />
                </div> */}
                  <div className="form-control mt-6">
                    <button className="btn bg-[#FF3811] hover:bg-[#FF3811] text-white font-bold">
                      {loading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <span>Login</span>
                      )}
                    </button>
                  </div>
                </form>
                <p className="text-center">
                  New to Car Doctors{" "}
                  <Link className="text-orange-600 font-bold" to="/signup">
                    Sign Up
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center mb-5 w-full">
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

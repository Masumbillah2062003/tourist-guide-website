import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import signUpImg from "../../assets/images/login.svg";
import SocialLogin from "../../Component/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Signup = () => {
  const { createUser, updateUserProfile,setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL).then(() => {
          const userInfo = {
            name: data.name || 'Unavailable',
            email: data.email,
            role: "user",
            picture: data.photoURL,
            contact:"Unavailable",
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
                title: "Your register has been Successfull",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        });
      })
      .catch((error) => {
        if (error) {
          reset()
          setLoading(false) 
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.message}`,
          });
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Tourist | Sign Up</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div>
        <div className="hero min-h-screen bg-slate-200">
          <div className="hero-content flex-col lg:flex-row">
            <div className="shadow-2xl bg-base-100 lg:flex lg:gap-10 lg:p-8 items-center justify-center">
              <div className="w-1/2 mr-12 lg:block hidden">
                <img src={signUpImg} alt="" />
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm bg-slate-200">
                <div className="card-body">
                  <h1 className="text-3xl  text-center font-bold">Sign Up</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="name"
                        className="input input-bordered"
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <span className="text-red-600">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Photo URL</span>
                      </label>
                      <input
                        type="text"
                        {...register("photoURL", { required: true })}
                        placeholder="Photo URL"
                        className="input input-bordered"
                      />
                      {errors.photoURL && (
                        <span className="text-red-600">
                          Photo URL is required
                        </span>
                      )}
                    </div>
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
                          This field is required
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
                        {...register("password", {
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                          pattern:
                            /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                        })}
                      />
                      {errors.password?.type === "required" && (
                        <p className="text-red-600">Password is required</p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p className="text-red-600">
                          Password must be 6 characters
                        </p>
                      )}
                      {errors.password?.type === "maxLength" && (
                        <p className="text-red-600">
                          Password must be less than 20 characters
                        </p>
                      )}
                      {errors.password?.type === "pattern" && (
                        <p className="text-red-600">
                          Password must have one Uppercase one lower case, one
                          number and one special character.
                        </p>
                      )}
                    </div>
                    <div className="form-control mt-6">
                      <button className="btn bg-[#FF3811] hover:bg-[#FF3811] text-white font-bold">
                        {loading ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          <span>Sign Up</span>
                        )}
                      </button>
                    </div>
                  </form>
                  <p className=" text-center">
                    Already Have an Account?{" "}
                    <Link className="text-orange-600 font-bold" to="/login">
                      Login
                    </Link>{" "}
                  </p>
                </div>
                <div className="text-center mb-5">
                  <SocialLogin></SocialLogin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

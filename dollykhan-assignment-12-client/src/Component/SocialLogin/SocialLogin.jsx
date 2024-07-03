import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import googleImg from "../../assets/images/google (2).png";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const SocialLogin = () => {
  const { google } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    google().then((result) => {
      if (result) {
        const googleInfo = {
          name: result.user.displayName,
          email: result.user.email,
        };

        axiosPublic.post("/users", googleInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your login or register has been successfull",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your login or register has been successfull",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          }
        });
      }
    });
  };
  return (
    <div className="px-10">
      <button
        onClick={handleGoogleLogin}
        className="flex border-[#FF3811] hover:border-[#FF3811] hover:bg-base-100 justify-center items-center font-bold btn w-full"
      >
        <>
          <span>
            <img className="w-8" src={googleImg} alt="" />
          </span>
          <span>Log in with Google</span>
        </>
      </button>
    </div>
  );
};

export default SocialLogin;

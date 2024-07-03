import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const RequestAdmin = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const handleRequest = () => {
    axiosPublic.post("/guideRequest", {requestEmail: user?.email}).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your guide request has been successfull",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="lg:h-[700px] h-[350px] flex justify-center items-center">
      <div className="lg:w-[500px] w-[270px]  p-5 bg-pink-100">
        <p>
          If you want to be a tour guide then click on the button given
          below......
        </p>
        <div className="flex justify-center items-center">
          <button
            onClick={handleRequest}
            className="btn text-white bg-pink-600 mt-5 hover:text-pink-600"
          >
            Request Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestAdmin;

import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import useOurPackage from "../../../Hook/useOurPackage";
import { Link } from "react-router-dom";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useAuth from "../../../Hook/useAuth";
import Swal from "sweetalert2";

const OurPackages = () => {
  const [ourPackages, isLoading] = useOurPackage();
  const allPackage = ourPackages.slice(0, 3);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const handleWishList = (item) => {
    axiosPublic
      .post("/packageWishlist", {
        email: user.email,
        package_id: item._id,
        about: item.about,
        price: item.price,
        tourImage: item.tourImage,
        tourType: item.tourType,
        tripTitle: item.tripTitle,
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: `${item.tripTitle} is a added`,
            text: "Your file has been added.",
            icon: "success",
          });
        }
      });
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center flex-col mt-20">
        <span className="loading loading-spinner loading-lg flex justify-center"></span>
        <h1 className="text-xl text-pink-600 text-center h-[300px]">
          Loading.......
        </h1>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center border border-pink-600 p-5 flex-wrap items-center gap-6 mt-10">
        {allPackage.map((p) => (
          <div key={p._id}>
            <div className="card w-full card-side border border-pink-600 bg-base-100 hover:shadow-xl hover:scale-105 duration-300">
              <figure className="relative w-64 ">
                <img src={p.tourImage} alt="Movie" className="w-full h-full" />
                <Link
                  title="WishList"
                  onClick={() => handleWishList(p)}
                  className="absolute bottom-5 w-14 right-5 btn bg-pink-600 hover:text-pink-600 border hover:border-pink-600 hover:bg-white  text-white font-bold"
                >
                  <h1>
                    <GiSelfLove className="text-center text-2xl flex justify-center" />{" "}
                  </h1>
                </Link>
              </figure>
              <div className="card-body">
                <h2 className="card-title">{p.tourType}</h2>
                <p>{p.tripTitle}</p>
                <p>${p.price}</p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/tourPackages/details/${p._id}`}
                    className="btn bg-pink-600 hover:text-pink-600 border hover:border-pink-600 hover:bg-transparent  text-white font-bold"
                  >
                    <HiOutlineViewfinderCircle className="text-xl" />{" "}
                    <span>View</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-5">
        <Link
          to="/allpackage"
          className="btn bg-pink-600 hover:text-pink-600 border hover:border-pink-600 hover:bg-transparent  text-white font-bold flex items-center gap-3"
        >
          <HiOutlineViewfinderCircle className="text-xl" />{" "}
          <span>All Packages</span>{" "}
          <FaRegArrowAltCircleRight className="text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default OurPackages;

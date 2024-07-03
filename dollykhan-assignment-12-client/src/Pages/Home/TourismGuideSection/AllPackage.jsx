import { Link } from "react-router-dom";
import useOurPackage from "../../../Hook/useOurPackage";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import SectionTitle from "../../../Component/SectionTitle";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import { GiSelfLove } from "react-icons/gi";
import useAuth from "../../../Hook/useAuth";

const AllPackage = () => {
  const { user } = useAuth();
  const [ourPackages, isLoading] = useOurPackage();
  const axiosPublic = useAxiosPublic();

  

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
    <div className="mt-[90px]">
      <SectionTitle headingTitle="All Packages"></SectionTitle>
      <div className="flex justify-center border border-pink-600 p-5 flex-wrap items-center gap-6 mt-10">
        {ourPackages.map((p) => (
          <div key={p._id}>
            <div className="card w-[600px] card-side border border-pink-600 bg-base-100 hover:shadow-xl hover:scale-105 duration-300">
              <figure className="relative w-64 ">
                <img src={p.tourImage} alt="Movie" className="w-64 h-full" />
                <Link
                  title="WishList"
                  onClick={() => handleWishList(p)}
                  className="absolute bottom-5 w-14 right-5 btn bg-pink-600 hover:text-pink-600 border hover:border-pink-600 hover:bg-white  text-white font-bold"
                >
                  <h1 className="">
                    <GiSelfLove className="text-center text-2xl flex justify-center" />
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
    </div>
  );
};

export default AllPackage;

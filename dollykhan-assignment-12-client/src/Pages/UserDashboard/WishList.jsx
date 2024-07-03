import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAuth from "../../Hook/useAuth";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const WishList = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: wishList = [], refetch } = useQuery({
    queryKey: ["packageWishlist"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packageWishlist");
      const result = res.data.filter((d) => d.email === user.email);
      return result;
    },
  });



  const handlewishDelete = (item) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPublic.delete(`/packageWishlist/${item._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>image</th>
              <th>Title</th>
              <th>Action</th>
              <th>Visit</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {wishList.map((w, index) => (
              <tr key={w._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={w.tourImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{w.tripTitle}</td>
                <td>
                  <button onClick={() =>handlewishDelete(w)} className="btn bg-pink-600 hover:text-pink-600 border hover:border-pink-600 hover:bg-transparent  text-white font-bold">
                  <MdDelete className="text-2xl"/>
                  </button>
                </td>
                <td>
                  <Link to={`/tourPackages/details/${w.package_id}`} className="btn bg-pink-600 hover:text-pink-600 border hover:border-pink-600 hover:bg-transparent  text-white font-bold">
                    <HiOutlineViewfinderCircle className="text-xl" />{" "}
                    <span>Visit Details</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishList;

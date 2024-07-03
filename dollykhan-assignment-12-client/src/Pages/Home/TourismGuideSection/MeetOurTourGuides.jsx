import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";

const MeetOurTourGuides = () => {
  const axiosPublic = useAxiosPublic();
  const { data: guideUser = [] } = useQuery({
    queryKey: ["guideUser"],
    queryFn: async () => {
      const res = await axiosPublic.get("/guideUser");
      return res.data;
    },
  });
  // console.log(guideUser);
  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Guide Name</th>
                <th>Guide Email</th>
                <th>User Visit</th>
              </tr>
            </thead>
            <tbody>
              {guideUser.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.picture}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={`/guideUser/profiledetails/${user._id}`}
                      className="btn bg-pink-600"
                    >
                      <GrView
                        className="text-white 
                            text-xl"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeetOurTourGuides;

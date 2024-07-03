import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const { data: requiestGuide = [] } = useQuery({
    queryKey: ["guideRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/guideRequest");
      return res.data;
    },
  });

  // console.log(requiestGuide);

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: `${user.name} is a admin now`,
          text: "Your file has been update.",
          icon: "success",
        });
      }
    });
  };
  const handleMakeGuide = (user) => {
    axiosSecure.patch(`/users/guide/${user._id}`).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: `${user.name} is a admin now`,
          text: "Your file has been update.",
          icon: "success",
        });
      }
    });

    const guideInfo = {
      name: user.name,
      email: user.email,
      role: "guide",
      picture: user.picture,
      contact: "Unavailable",
      details: "Unavailable",
      education: "Unavailable",
      skills: "Unavailable",
      work: "Unavailable",
      experience: "Unavailable",
    };

    axiosSecure.post("/guideUser", guideInfo).then((res) => {
      // console.log(res.data);
      if (res.data.insertedId) {
        refetch();
        Swal.fire({
          title: `${user.name} is a admin now`,
          text: "Your file has been added.",
          icon: "success",
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
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
  };

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Guide Request</th>
              <th>Admin Role</th>
              <th>Guide Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" || user.role === "guide"
                    ? ""
                    : requiestGuide.map(
                        (r) => r.requestEmail === user.email && "Reqest Guide"
                      )}
                </td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : user.role === "guide" ? (
                    <button
                      disabled
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-lg bg-pink-600"
                    >
                      <FaUsers
                        className="text-white 
                                text-2xl"
                      ></FaUsers>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-lg bg-pink-600"
                    >
                      <FaUsers
                        className="text-white 
                            text-2xl"
                      ></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "guide" ? (
                    "Guide"
                  ) : user.role === "admin" ? (
                    <button
                      disabled
                      onClick={() => handleMakeGuide(user)}
                      className="btn btn-lg bg-pink-600"
                    >
                      <FaUsers
                        className="text-white 
                                text-2xl"
                      ></FaUsers>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeGuide(user)}
                      className="btn btn-lg bg-pink-600"
                    >
                      <FaUsers
                        className="text-white 
                            text-2xl"
                      ></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

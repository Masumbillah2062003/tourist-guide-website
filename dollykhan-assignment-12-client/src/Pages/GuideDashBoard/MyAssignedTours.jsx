import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const MyAssignedTours = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: myBooking = [], refetch } = useQuery({
    queryKey: ["tourBooking"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tourBooking");
      return res.data;
    },
  });

  const onAccept = (id) => {
    axiosSecure.patch(`/tourBooking/review/${id}`).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch()
        Swal.fire({
          title: "Your Tour Accepted",
          text: "Your file has been update.",
          icon: "success",
        });
      }
    });
  };

  const onReject = (id) => {
    axiosSecure.patch(`/tourBooking/reject/${id}`).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch()
        Swal.fire({
          title: "your tour rejected",
          text: "Your file has been update.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Package Name</th>
              <th>Tourist Name</th>
              <th>Tour Date</th>
              <th>Tour Price</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {myBooking.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>{booking.packageName}</td>
                <td>{booking.touristName}</td>
                <td>{booking.tourDate}</td>
                <td>{booking.price}</td>
                <td>
                  {" "}
                  {booking.status === "Accepted" ? (
                    <button className="btn" disabled>
                      Reject
                    </button>
                  ) : booking.status === "In Review" ? (
                    <button className="btn" disabled>
                      Reject
                    </button>
                  ) : (
                    <button
                      className="btn btn-success text-white"
                      onClick={() => onAccept(booking._id)}
                    >
                      Reject
                    </button>
                  )}
                </td>
                <td>
                  {booking.status === "In Review" ? (
                    <button className="btn" disabled>
                      Accept
                    </button>
                  ) : booking.status === "Accepted" ? (
                    <button className="btn" disabled>
                      Accept
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger bg-pink-600 text-white"
                      onClick={() => onReject(booking._id)}
                    >
                      Accept
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssignedTours;

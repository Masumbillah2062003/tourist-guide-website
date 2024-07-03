import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import Payment from "./Payment/Payment";

const MyBooking = () => {
  const axiosPublic = useAxiosPublic();
  const [open, setOpen] = useState(false);
  const [payData, setPayData] = useState({});

  const handleClose = () => setOpen(false);

  const { data: myBooking = [], refetch } = useQuery({
    queryKey: ["tourBooking"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tourBooking");
      return res.data;
    },
  });

  const handleOpen = (id) => {
    const filter = myBooking.filter((f) => f._id === id);
    filter.map((x) => setPayData(x));
    setOpen(true);
  };


  const onCancel = (id) => {
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
        axiosPublic.delete(`/tourBooking/${id}`).then((res) => {
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
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Package Name</th>
              <th>Tour Guide Name</th>
              <th>Tour Date</th>
              <th>Tour Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBooking.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>{booking.packageName}</td>
                <td>{booking.guideName}</td>
                <td>{booking.tourDate}</td>
                <td>{booking.price}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === "Null" && (
                    <button className="btn btn-danger bg-pink-600" disabled>
                      Null
                    </button>
                  )}
                  {booking.status === "In Review" && (
                    <button
                      className="btn btn-danger bg-pink-600"
                      onClick={() => onCancel(booking._id)}
                    >
                      <MdDelete className="text-2xl text-white" />
                    </button>
                  )}
                  {booking.payment === "Confirm"
                    ? booking.status === "Accepted" && (
                        <p className=" text-green-700 font-bold">
                          Payment Confirm
                        </p>
                      )
                    : booking.status === "Accepted" && (
                        <button
                          className="btn btn-success"
                          onClick={() => handleOpen(booking._id)}
                        >
                          Pay
                        </button>
                      )}
                </td>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className="absolute w-[500px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <div className="bg-white lg:p-6 p-3">
                      <Payment
                        setOpen={setOpen}
                        refetch={refetch}
                        handleClose={handleClose}
                        bookingPrice={payData.price}
                        bookingId={payData._id}
                        bookingPackageName={payData.packageName}
                      ></Payment>
                    </div>
                  </Box>
                </Modal>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;

import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useOurPackage from "../../../Hook/useOurPackage";
import SectionTitle from "../../../Component/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { GrView } from "react-icons/gr";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const PackageDetails = () => {
  const loaderData = useLoaderData();
  const { tourImage, about, price } = loaderData;
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [y, sety] = useState([]);
  const navigate = useNavigate()

  const [ourPackages] = useOurPackage();
  const allPackage = ourPackages.slice(0, 6);

  // console.log(loaderData);

  const { data: guideUser = [] } = useQuery({
    queryKey: ["guideUser"],
    queryFn: async () => {
      const res = await axiosPublic.get("/guideUser");
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const addPackage = {
      touristName: data.touristName,
      touristEmail: data.touristEmail,
      touristImageUrl: data.touristImageUrl,
      price: parseFloat(data.price),
      tourDate: startDate.toString(),
      guideName: data.guideName,
      packageName: loaderData.tripTitle,
      status: "Null",
    };

    // console.log(addPackage);

    const bookRes = await axiosPublic.post("/tourBooking", addPackage);
    // console.log(bookRes.data);
    if (bookRes.data.insertedId) {
      // show success popup
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Confirm your Booking",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/dashboard/mybooking')
    }

    const x = await axiosPublic.get("/tourBooking");
    const y = x.data.filter((d) => d.touristEmail === user.email);
    sety(y);
  };

  // console.log(user);

  return (
    <div>
      <div className="mx-10 mb-10 mt-24 p-5">
        <figure className="w-full h-[500px] rounded-md p-5">
          <img src={tourImage} alt="" className="w-full h-[500px] rounded-md" />
        </figure>
        <div className="mt-10">
          <hr />
          <p className="text-lg text-[#000000d2] font-semibold p-5">
            <span className="text-xl text-pink-600 font-bold">
              About The Tour :
            </span>{" "}
            {about}
          </p>
          <hr />
          <div className="my-5">
            <div className="join join-vertical w-full">
              {allPackage.map((p) => (
                <div
                  key={p._id}
                  className="collapse collapse-arrow join-item border border-base-300"
                >
                  <input type="radio" name="my-accordion-4" />
                  <div className="collapse-title text-xl font-medium bg-pink-100">
                    {p.tripTitle}
                  </div>
                  <div className="collapse-content">
                    <p className="text-pink-600">{p.about}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <SectionTitle headingTitle="All Ture Guide"></SectionTitle>
        <div className="border border-pink-600 p-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* head */}
              <thead>
                <tr className="text-pink-600 text-xl">
                  <th>#</th>
                  <th>Guide Name</th>
                  <th>Guide Email</th>
                  <th>User Visit</th>
                </tr>
              </thead>
              <tbody>
                {guideUser.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
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

      <div className="mt-16">
        <SectionTitle headingTitle="Booking Form"></SectionTitle>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-pink-600 p-5"
          >
            <div className="flex gap-8">
              <label className="w-1/2">
                <span className="text-pink-600 font-medium text-xl py-2 block">
                  Tourist Name
                </span>
                <input
                  type="text"
                  value={user?.displayName}
                  className="w-full border-2 border-pinktext-pink-600 rounded-md px-4 py-3 outline-none"
                  {...register("touristName", { required: true })}
                />
              </label>
              <label className="w-1/2">
                <span className="text-pink-600 font-medium text-xl py-2 block">
                  Tourist Email
                </span>
                <input
                  type="text"
                  value={user?.email}
                  className="w-full border-2 border-pinktext-pink-600 rounded-md px-4 py-3 outline-none"
                  {...register("touristEmail", { required: true })}
                />
              </label>
            </div>
            <div className="flex gap-8">
              <label className="w-1/2">
                <span className="text-pink-600 font-medium text-xl py-2 block">
                  Tourist Image URL
                </span>
                <input
                  type="text"
                  value={user?.photoURL}
                  className="w-full border-2 border-pinktext-pink-600 rounded-md px-4 py-3 outline-none"
                  {...register("touristImageUrl", { required: true })}
                />
              </label>
              <label className="w-1/2">
                <span className="text-pink-600 font-medium text-xl py-2 block">
                  Price
                </span>
                <input
                  type="text"
                  value={price}
                  className="w-full border-2 border-pinktext-pink-600 rounded-md px-4 py-3 outline-none"
                  {...register("price", { required: true })}
                />
              </label>
            </div>

            <div className="flex gap-8">
              <label className="w-1/2">
                <span className="text-pink-600 font-medium text-xl py-2 block">
                  Tour Date
                </span>
                <DatePicker
                  className="w-full border-2 text-pink-600 rounded-md px-4 py-3 outline-none"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  required
                />
              </label>
              <label className="w-1/2">
                <span className="text-pink-600 font-medium text-xl py-2 block">
                  Tour guide name
                </span>

                <select
                  id="country"
                  name="countryName"
                  className="w-full border-2 border-pinktext-pink-600 rounded-md px-4 py-3 outline-none"
                  {...register("guideName", { required: true })}
                >
                  {guideUser.map((g) => (
                    <option key={g._id} value={g.name}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              {user ? (
                <input
                  type="submit"
                  value="Book Now"
                  className="w-full btn border-2 bg-pink-600 hover:bg-transparent hover:border-pink-600 hover:text-pink-600 rounded-md font-bold text-xl text-white  outline-none mt-5 "
                />
              ) : (
                <button
                  disabled
                  className="w-full btn border-2 bg-pink-600 hover:bg-transparent hover:border-pink-600 hover:text-pink-600 rounded-md font-bold text-xl text-white  outline-none mt-5 "
                >
                  {" "}
                  Book Now
                </button>
              )}
            </div>
          </form>
          <div>
            {y.length >= 3 && (
             <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;

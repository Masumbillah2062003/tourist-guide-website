import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const image_hoisting_key = import.meta.env.VITE_IMAGE_HOISTING_KEY;
const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hoisting_key}`;
const AddPackage = () => {
  const { register, handleSubmit, reset } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hoisting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the manu item data to the server with the image URL
      const addPackage = {
        tripTitle: data.tripTitle,
        tourType: data.tourType,
        price: parseFloat(data.price),
        about: data.about,
        tourImage: res.data.data.display_url,
      };

      // console.log(addPackage);

      const manuRes = await axiosSecure.post("/tourPackages", addPackage);
      // console.log(manuRes.data);
      if (manuRes.data.insertedId) {
        reset();
        // show success popup
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="h-screen bg-gray-200 px-20 pt-40">


      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-pink-600 p-5"
      >
        <div className="flex gap-8">
          <label className="w-1/2">
            <span className="text-pink-600 font-medium text-xl py-2 block">
              Trip Title
            </span>
            <input
              type="text"
              placeholder="Please Enter Your Name"
              className="w-full border-2 border-pinktext-pink-600 rounded-md px-4 py-3 outline-none"
              {...register("tripTitle", { required: true })}
            />
          </label>
          <label className="w-1/2">
            <span className="text-pink-600 font-medium text-xl py-2 block">
              Tour Type
            </span>

            <select
              id="country"
              name="countryName"
              className="w-full border-2 border-pinktext-pink-600 rounded-md px-4 py-3 outline-none"
              {...register("tourType", { required: true })}
            >
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="wildlife">Wildlife</option>
              <option value="city">City</option>
              <option value="historical">Historical</option>
              <option value="cruise">Cruise</option>
            </select>
          </label>
        </div>

        <div className="form-control">
          <span className="text-pink-600 font-medium text-xl py-2 block">
            Images
          </span>
          <label className="form-control w-full">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full "
              multiple
            />
          </label>
        </div>

        <div className="flex gap-8">
          <label className="w-1/2">
            <span className="text-pink-600 font-medium text-xl py-2 block">
              Price
            </span>
            <input
              type="number"
              placeholder="Please Enter Your Name"
              className="w-full border-2 border-pinktext-pink-600 rounded-md px-4 py-3 outline-none"
              {...register("price", { required: true })}
            />
          </label>
          <label className="w-1/2">
            <span className="text-pink-600 font-medium text-xl py-2 block">
              About The Tour
            </span>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="About The tour"
              {...register("about", { required: true })}
            ></textarea>
          </label>
        </div>
        <div>
          <input
            type="submit"
            value="Add"
            className="w-full btn border-2 bg-pink-600 hover:bg-transparent hover:border-pink-600 hover:text-pink-600 rounded-md font-bold text-xl text-white  outline-none mt-5 "
          />
        </div>
      </form>
    </div>
  );
};

export default AddPackage;

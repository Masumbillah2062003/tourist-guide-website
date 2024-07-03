import useAuth from "../../Hook/useAuth";

const MyProfile = () => {
    const {user} = useAuth()
  return (
    <div>
      <div className=" px-20 pt-20 bg-gray-200 min-h-screen flex justify-center">
        <div className="border-2 border-pink-600  shadow-2xl lg:w-[550px] lg:h-[220px] bg-white">
          <h1 className="text-3xl px-3 font-bold py-2 border-b border-pink-600">
            My Profile
          </h1>

          <div className="flex gap-6 p-4 justify-center items-center">
            <figure className="w-32 border-r pr-7 border-pink-600 h-32 flex justify-center items-center">
              <img src={user.photoURL} alt="" className="w-full rounded-full" />
            </figure>
            <div>
              <h2 className="text-2xl font-bold">Name : {user.displayName}</h2>
              <h3 className="text-lg font-semibold">Email : {user.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

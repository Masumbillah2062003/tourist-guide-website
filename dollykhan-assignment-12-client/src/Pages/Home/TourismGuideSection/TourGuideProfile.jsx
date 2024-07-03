import { useLoaderData } from "react-router-dom";

const TourGuideProfile = () => {
  const loaderData = useLoaderData();
  const {
    email,
    name,
    role,
    picture,
    contact,
    details,
    education,
    skills,
    work,
    experience,
  } = loaderData;
  return (
    <div>
      <div className="mx-80 mb-10 mt-24 p-5 bg-pink-100">
        <figure className="rounded-md px-5">
          <img
            src={picture}
            alt=""
            className="w-[150px] mx-auto h-[150px] rounded-md"
          />
        </figure>
        <div className="mt-10">
          <hr className="border-pink-400" />
          <p className="text-lg text-[#000000d2] font-semibold px-5 py-3">
            <span className="text-xl text-pink-600 font-bold">Role</span> :
            <span className=""> {role}</span>
          </p>
          <hr className="border-pink-400" />
          <p className="text-lg text-[#000000d2] font-semibold px-5 py-3">
            <span className="text-xl text-pink-600 font-bold">Name</span> :
            <span className=""> {name}</span>
          </p>
          <hr className="border-pink-400" />
          <p className="text-lg text-[#000000d2] font-semibold px-5 py-3">
            <span className="text-xl text-pink-600 font-bold">Email</span> :
            <span className=""> {email}</span>
          </p>
          <hr className="border-pink-400" />
          <p className="text-lg text-[#000000d2] font-semibold px-5 py-3">
            <span className="text-xl text-pink-600 font-bold">Contact</span> :
            <span className=""> {contact}</span>
          </p>
          <hr className="border-pink-400" />
          <p className="text-lg text-[#000000d2] font-semibold px-5 py-3">
            <span className="text-xl text-pink-600 font-bold">Details</span> :
            <span className=""> {details}</span>
          </p>
          <hr className="border-pink-400" />
          <p className="text-lg text-[#000000d2] font-semibold px-5 py-3">
            <span className="text-xl text-pink-600 font-bold">Education</span> :
            <span className=""> {education}</span>
          </p>
          <hr className="border-pink-400" />
          <p className="text-lg text-[#000000d2] font-semibold px-5 py-3">
            <span className="text-xl text-pink-600 font-bold">Skills</span> :
            <span className=""> {skills}</span>
          </p>
          <hr className="border-pink-400" />
          <p className="text-lg text-[#000000d2] font-semibold px-5 py-3">
            <span className="text-xl text-pink-600 font-bold">Work</span> :
            <span className=""> {work}</span>
          </p>
          <hr className="border-pink-400" />
          <p className="text-lg text-[#000000d2] font-semibold px-5 py-3">
            <span className="text-xl text-pink-600 font-bold">Experience</span> :
            <span className="">{experience}</span>
          </p>
          <hr className="border-pink-400" />
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfile;

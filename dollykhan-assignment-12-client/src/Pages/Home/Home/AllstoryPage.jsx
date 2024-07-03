import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import SectionTitle from "../../../Component/SectionTitle";

const AllstoryPage = () => {
  const axiosPublic = useAxiosPublic();
  const { data: stories = [] } = useQuery({
    queryKey: ["touristStory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/touristStory");
      return res.data;
    },
  });
  return (
    <div className="mt-[100px]">
        <SectionTitle headingTitle="All Story"></SectionTitle>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 ">
      {stories.map((story) => (
        <div key={story._id} className="border p-5 border-pink-500">
          <h2 className="font-bold text-xl pb-3">{story.title}</h2>
          <p>{story.summary}</p>
          <button className="btn bg-pink-600 text-white mt-3">Show</button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default AllstoryPage;

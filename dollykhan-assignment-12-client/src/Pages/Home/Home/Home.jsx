import bgImg from "../../../assets/images/tourism3.jpg";
import Banner from "../Banner/Banner";
import TourismGuidSection from "../TourismGuideSection/TourismGuidSection";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Component/SectionTitle";
import { Link } from "react-router-dom";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const { data: stories = [] } = useQuery({
    queryKey: ["touristStory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/touristStory");
      return res.data;
    },
  });

  return (
    <div>
      <Banner></Banner>
      <TourismGuidSection></TourismGuidSection>

      <div className="mt-20">
        <figure className="relative">
          <img src={bgImg} alt="" className="w-full h-[450px]" />
          <div className="h-[450px] w-full text-white top-0 bg-[#00000067] backdrop-blur-sm absolute py-10 px-20">
            <div>
              <p className="text-lg font-semibold text-center">
                Find a tour by
              </p>
              <h1 className="w-40 mx-auto text-4xl font-semibold border-b-4 border-pink-600">
                Tour Type
              </h1>
            </div>
            <hr />
            <div className="my-10">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="h-[200px] w-[200px] border rounded-full flex justify-center items-center">
                    <div>
                      <p className="text-2xl font-semibold">Adventure</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="h-[200px] w-[200px] border rounded-full flex justify-center items-center">
                    <div>
                      <p className="text-2xl font-semibold">Cultural</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="h-[200px] w-[200px] border rounded-full flex justify-center items-center">
                    <div>
                      <p className="text-2xl font-semibold">WildLife</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="h-[200px] w-[200px] border rounded-full flex justify-center items-center">
                    <div>
                      <p className="text-2xl font-semibold">City</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="h-[200px] w-[200px] border rounded-full flex justify-center items-center">
                    <div>
                      <p className="text-2xl font-semibold">Histrical</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="h-[200px] w-[200px] border rounded-full flex justify-center items-center">
                    <div>
                      <p className="text-2xl font-semibold">Cruise</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <hr />
          </div>
        </figure>
      </div>

      <div className="mt-20">
        <SectionTitle headingTitle="Tourist Story "></SectionTitle>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper border border-pink-600 "
        >
          {stories.map((story) => (
            <SwiperSlide
              key={story._id}
              className="border m-5 border-pink-400 p-5"
            >
              <div>
                <h2 className="font-bold text-xl pb-3">{story.title}</h2>
                <p>{story.summary}</p>
                <button className="btn bg-pink-600 text-white mt-3">
                  Show
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-end mt-5">
          <Link to="/allstorypage" className="btn bg-pink-600 text-white">
            All Stories Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

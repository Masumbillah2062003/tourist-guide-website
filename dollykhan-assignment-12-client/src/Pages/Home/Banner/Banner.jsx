import { EffectFade, Navigation, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// all images
import banner1 from "../../../assets/images/banner1.jpg"
import banner2 from "../../../assets/images/banner2.jpg"
import banner3 from "../../../assets/images/banner3.jpg"
import banner4 from "../../../assets/images/banner4.jpg"

const Banner = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={banner1} className="w-full lg:h-[650px] h-[250px]"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} className="w-full lg:h-[650px] h-[250px]"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner3} className="w-full lg:h-[650px] h-[250px]"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner4} className="w-full lg:h-[650px] h-[250px]"/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

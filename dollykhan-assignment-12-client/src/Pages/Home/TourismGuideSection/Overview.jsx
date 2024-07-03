
import tourism1 from "../../../assets/images/tourism1.jpg";
import tourism2 from "../../../assets/images/tourism2.jpg";
import tourism3 from "../../../assets/images/tourism3.jpg";
import tourism4 from "../../../assets/images/tourism4.jpg";
import tourism5 from "../../../assets/images/tourism5.jpg";
import tourism6 from "../../../assets/images/tourism6.jpg";
import OverviewImgTitle from "../../../Component/OverviewImgTitle";


const Overview = () => {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-3 gap-6">
        <figure className="col-span-1 relative">
          <img src={tourism1} alt="" className="w-full h-[450px] hover:scale-105 hover:shadow-2xl duration-500" />
          <OverviewImgTitle overviewName="River"></OverviewImgTitle>
        </figure>
        <figure className="col-span-2 relative">
          <img src={tourism2} alt="" className="w-full h-[450px] hover:scale-105 hover:shadow-2xl duration-500" />
          <OverviewImgTitle overviewName="River"></OverviewImgTitle>
        </figure>
        <figure className="col-span-2 relative">
          <img src={tourism3} alt="" className="w-full h-[450px] hover:scale-105 hover:shadow-2xl duration-500" />
          <OverviewImgTitle overviewName="River"></OverviewImgTitle>
        </figure>
        <figure className="col-span-1 relative">
          <img src={tourism4} alt="" className="w-full h-[450px] hover:scale-105 hover:shadow-2xl duration-500" />
          <OverviewImgTitle overviewName="River"></OverviewImgTitle>
        </figure>
        <figure className="col-span-1 relative">
          <img src={tourism5} alt="" className="w-full h-[450px] hover:scale-105 hover:shadow-2xl duration-500" />
          <OverviewImgTitle overviewName="River"></OverviewImgTitle>
        </figure>
        <figure className="col-span-2 relative ">
          <img src={tourism6} alt="" className="w-full h-[450px] hover:scale-105 hover:shadow-2xl duration-500" />
          <OverviewImgTitle overviewName="River"></OverviewImgTitle>
        </figure>
      </div>
    </div>
  );
};

export default Overview;

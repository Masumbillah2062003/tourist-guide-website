import { CiLocationOn } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";
import { Link } from "react-router-dom";

const OverviewImgTitle = ({overviewName}) => {
    return (
        <div className="bg-[#494949] flex justify-between items-center absolute bottom-0 w-full px-4">
            <div>
              <h1 className="flex items-center gap-3  py-3">
                <CiLocationOn className="text-[#EEFF25] text-3xl"></CiLocationOn>{" "}
                <span className="text-[#EEFF25] text-3xl">{overviewName}</span>
              </h1>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Link>
                {" "}
                <FaFacebook className="text-2xl text-white"></FaFacebook>
              </Link>
              <Link>
                {" "}
                <LiaLinkedin className="text-3xl text-white"></LiaLinkedin>
              </Link>
            </div>
          </div>
    );
};

export default OverviewImgTitle;
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6 lg:px-20 lg:mt-16 mt-8">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
          {/* Left Section */}
          <div className="mb-4 lg:mb-0">
            <p className="text-3xl font-bold"> Tourist</p>
            <p className="text-lg">© 2024 Tourist. All rights reserved.</p>
          </div>
    
          {/* Center Section */}
          <div className="mb-4 lg:mb-0">
            <p className="text-2xl mb-2">Contact Us:</p>
            <p className="text-lg">Email: dollykhan@gmail.com</p>
            <p className="text-lg">Phone: +8801700011147</p>
          </div>
    
          {/* Right Section */}
          <div>
            <p className="text-2xl mb-2">Follow Us:</p>
            <div className="flex space-x-2">
              <a href="#" className="text-4xl hover:text-white">
                <FaFacebook />
              </a>
              <a href="#" className="text-4xl hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-4xl hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-4xl hover:text-white">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
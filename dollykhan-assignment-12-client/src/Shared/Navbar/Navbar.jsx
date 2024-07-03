import { FaBarsStaggered } from "react-icons/fa6";
import { GiTireIronCross } from "react-icons/gi";
import { IoPersonAddOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import auth from "../../Firebase/firebase.config";
import { MdDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { user, logOut } = useAuth(auth);

  const handlerLogout = () => {
    logOut()
      .then(() => {})
      // .catch((error) => console.log(error));
  };
  const navlinks = (
    <div className="flex lg:gap-6 gap-2 items-center lg:flex-row flex-col">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-[#EEFF25] lg:border-b-2 underline-offset-2 border-[#EEFF25] text-lg font-semibold"
            : "font-semibold text-lg"
        }
      >
        HOME
      </NavLink>
      <NavLink
        to="/manu"
        className={({ isActive }) =>
          isActive
            ? "text-[#EEFF25] lg:border-b-2 underline-offset-2 border-[#EEFF25] text-lg font-semibold uppercase"
            : "font-semibold text-lg uppercase"
        }
      >
       Community
      </NavLink>
      <NavLink
        to="/order/salad"
        className={({ isActive }) =>
          isActive
            ? "text-[#EEFF25] lg:border-b-2 underline-offset-2 border-[#EEFF25] text-lg font-semibold"
            : "font-semibold text-lg"
        }
      >
        Blogs
      </NavLink>
      <NavLink
        to="/secret"
        className={({ isActive }) =>
          isActive
            ? "text-[#EEFF25] lg:border-b-2 underline-offset-2 border-[#EEFF25] text-lg font-semibold"
            : "font-semibold text-lg"
        }
      >
        About Us
      </NavLink>
      <NavLink
        to="/secret"
        className={({ isActive }) =>
          isActive
            ? "text-[#EEFF25] lg:border-b-2 underline-offset-2 border-[#EEFF25] text-lg font-semibold"
            : "font-semibold text-lg"
        }
      >
        Contact Us
      </NavLink>

    </div>
  );

  const handleNavbarClick = () => {
    document.getElementById("sidebar").classList.add("left-0");
    document.getElementById("sidebar").classList.remove("-left-[850px]");
  };
  const handleCancle = () => {
    document.getElementById("sidebar").classList.add("-left-[850px]");
    document.getElementById("sidebar").classList.remove("left-0");
  };
  return (
    <>
      <nav className="flex flex-wrap fixed lg:w-[1280px] w-full top-0 z-50 items-center text-white justify-between lg:h-[80px] h-[50px] px-3 bg-[#000000b6]">
        {/* responsive */}
        <div onClick={handleNavbarClick} className="lg:hidden block">
          <FaBarsStaggered className="text-xl active:scale-90 duration-200" />
        </div>
        <ul
          id="sidebar"
          className="lg:hidden z-50 top-[50px] absolute duration-700  w-2/3 bg-[#151515f4] px-4 py-3 -left-[850px]"
        >
          <span className="flex justify-end">
            <GiTireIronCross
              onClick={handleCancle}
              className="text-xl active:scale-90 duration-200"
            />
          </span>
          {navlinks}
        </ul>

        {/* logo */}
        <div>
          <h1 className="lg:text-3xl text-xl font-extrabold">Tourist</h1>
        </div>

        {/* middle */}
        <div className="lg:block hidden">
          <ul>{navlinks}</ul>
        </div>

        {/* authentication */}
        {/* responsive */}
        <div>
          {/* large device */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user
                        ? user?.photoURL
                        : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 rounded-lg shadow menu menu-sm dropdown-content bg-[#292929] text-center space-y-2 text-base"
              >
                <li>
                  <div className="w-20 mx-auto">
                    <img
                      alt="Tailwind CSS Navbar component"
                      className="rounded-full"
                      src={
                        user
                          ? user?.photoURL
                          : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                    />
                  </div>
                </li>
                <li>{user?.displayName}</li>
                <li> {user?.email}</li>
                <li className="py-2">
                  <hr className="rounded-none"/>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/userProfile"
                    className="font-semibold text-lg bg-[#1c1c1cf6] px-3 rounded-lg
                    active:scale-90 duration-150 py-2"
                  >
                    <MdDashboard /> Dashboard
                  </NavLink>
                </li>
                <li>
                  {user && (
                    <NavLink
                      onClick={handlerLogout}
                      className="text-lg font-semibold bg-[#30302cad] px-3 rounded-lg
                      active:scale-90 duration-150 py-2"
                    >
                      <CiLogout /> Logout
                    </NavLink>
                  )}
                </li>
              </ul>
            </div>
          ) : (
            <>
              <div className="lg:hidden">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "active:scale-90 duration-200 font-bold border-none flex items-center justify-center gap-1 hover:bg-[#edff2551]  px-2 rounded-md py-1 text-white"
                      : "active:scale-90 duration-200 font-bold text-[white] border-none flex items-center justify-center gap-1 px-2 rounded-md py-1"
                  }
                >
                  <IoPersonAddOutline /> <span>Sign In</span>
                </NavLink>
              </div>

              <div className="hidden lg:block">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "btn font-bold bg-transparent hover:bg-[#edff256a] text-[#EEFF25] border-none"
                      : "btn font-bold bg-transparent hover:bg-[#edff256a] text-[#EEFF25] border-none"
                  }
                >
                  <IoPersonAddOutline /> Sign In
                </NavLink>
                <span className="font-bold text-lg text-[#EEFF25]">|</span>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "btn font-bold bg-transparent hover:bg-[#edff256a] text-[#EEFF25] border-none"
                      : "btn font-bold bg-transparent hover:bg-[#edff256a] text-[#EEFF25] border-none"
                  }
                >
                  Sign Up
                </NavLink>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

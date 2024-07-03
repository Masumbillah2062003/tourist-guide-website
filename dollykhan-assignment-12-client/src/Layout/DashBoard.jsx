import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";
import useGuide from "../Hook/useGuide";

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  const [isGuide] = useGuide();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-pink-600">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/myprofile">My Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addpackage">Add Package</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allusers">Manage Users</NavLink>
              </li>
            </>
          ) : isGuide ? (
            <>
              <li>
                <NavLink to="/dashboard/guidemyProfile">
                  Guide My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/assignedtours">
                My Assigned Tours
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userProfile">User Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mybooking">My Booking</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mywishlist">My Wishlist</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requestAdmin">
                  Request To Admin
                </NavLink>
              </li>
            </>
          )}

          <hr className="mt-5 mb-5" />
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;

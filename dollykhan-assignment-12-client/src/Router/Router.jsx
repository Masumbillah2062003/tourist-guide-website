import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/LogIn/Login";
import Signup from "../Pages/Signup/Signup";
import DashBoard from "../Layout/DashBoard";
import AllUsers from "../Pages/AdminDashboard/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/AdminDashboard/MyProfile";
import AddPackage from "../Pages/AdminDashboard/AddPackage";
import GuideMyProfile from "../Pages/GuideDashBoard/GuideMyProfile";
import AllPackage from "../Pages/Home/TourismGuideSection/AllPackage";
import UserPofile from "../Pages/UserDashboard/UserPofile";
import WishList from "../Pages/UserDashboard/WishList";
import PackageDetails from "../Pages/Home/TourismGuideSection/PackageDetails";
import TourGuideProfile from "../Pages/Home/TourismGuideSection/TourGuideProfile";
import MyBooking from "../Pages/UserDashboard/MyBooking";
import MyAssignedTours from "../Pages/GuideDashBoard/MyAssignedTours";
import RequestAdmin from "../Pages/UserDashboard/RequestAdmin";
import AllstoryPage from "../Pages/Home/Home/AllstoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "allpackage",
        element: <AllPackage></AllPackage>,
      },
      {
        path: "/tourPackages/details/:id",
        element: <PackageDetails></PackageDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/tourPackages/details/${params.id}`),
      },
      {
        path: "/guideUser/profiledetails/:id",
        element: <TourGuideProfile></TourGuideProfile>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/guideUser/profiledetails/${params.id}`),
      },
      {
        path:"/allstorypage",
        element: <AllstoryPage></AllstoryPage>
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "userProfile",
        element: <UserPofile></UserPofile>,
      },
      {
        path: "mywishlist",
        element: <WishList></WishList>,
      },
      {
        path: "mybooking",
        element: <MyBooking></MyBooking>
      },
      {
        path: "requestAdmin",
        element: <RequestAdmin></RequestAdmin>
      },

      // Guide Users

      {
        path: "guidemyProfile",
        element: <GuideMyProfile></GuideMyProfile>,
      },
      {
        path: "assignedtours",
        element: <MyAssignedTours></MyAssignedTours>,
      },

      // Admin related
      {
        path: "myprofile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "addpackage",
        element: <AddPackage></AddPackage>,
      },
      {
        path: "allusers",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);

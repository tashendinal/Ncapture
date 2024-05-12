import Explore from "../modules/Explore/explore.jsx";
import HomePage from "../modules/HomePage/pages/HomePage.jsx";
import ProfileRoutes from "../modules/profile/routes.jsx";
import UserProfile from "../modules/userProfile/userProfile.jsx";
import PrivateRoute from "./protectedroute.jsx";

const layoutRouter = [
    {
        title: "Home",
        path: "/",
        status: true,
        element: <HomePage />
    },
    {
        title: "Home",
        path: "/profile/:userId",
        status: true,
        element: <UserProfile />
    },
    {
        title: "Home",
        path: "/explore",
        status: true,
        element: <Explore />
    },
    
    ...ProfileRoutes
];


export default layoutRouter;
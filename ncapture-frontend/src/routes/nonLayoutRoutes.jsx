import SignUp from "../modules/auth/SignUp";
import SignUpE from "../modules/auth/SignUpE";
import UserData from "../modules/auth/UserData";
import EmailConfirmation from "../modules/auth/emailConfirmation";
import EmailConfirmationE from "../modules/auth/emailConfirmationE";
import Login from "../modules/auth/login";
import LoginE from "../modules/auth/loginE";
import Page404 from "../pages/404";



const NonLayoutRoutes = [
  {
    title: "404",
    path: "*",
    element: <Page404 />,
  },
  {
    title: "Login",
    path: "/login",
    element: <LoginE />,
  },
  {
    title: "Sign Up",
    path: "/signup",
    element: <SignUpE />,
  },
  {
    title: "Email Confirmation",
    path: "/emailConfirmation",
    element: <EmailConfirmationE />,
  },
  {
    title: "User Information",
    path: "/userInformation",
    element: <UserData />,
  },
];

export default NonLayoutRoutes;
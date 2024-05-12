import { Navigate } from "react-router-dom";
const PrivateRoute = (props) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  return (
    <>
      {isLoggedIn ? (
        <>{props.children}</>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};
export default PrivateRoute;

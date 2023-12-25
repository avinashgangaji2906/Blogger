import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout()); // updating the state
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-block  duration-200 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium ml-3"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;

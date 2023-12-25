import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true); // webpage takes time then will show loading state
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getcurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // conditional rendering
  return !loading ? (
    <div
      className="w-screen h-screen  flex
  flex-wrap"
    >
      <div className="w-full block">
        <Header />
        <main className="h-full bg-slate-200">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;

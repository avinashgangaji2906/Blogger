import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  // this authStatus will track whether user is logged in / logged out
  const authStatus = useSelector((state) => state.auth.status); // auth is authSlice name

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky z-50 top-0 py-2 shadow-md bg-gray-800 ">
      <Container>
        <nav className="flex flex-1 justify-between">
          <div className="mr-4">
            <Logo />
          </div>
          <ul className="hidden md:flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="list-none">
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium mx-3"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
          {authStatus && (
            <li className="list-none">
              <LogoutBtn />
            </li>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;

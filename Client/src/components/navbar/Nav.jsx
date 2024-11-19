import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { ThemeChanger } from "../../lib/ThemeChanger ";

export const Nav = () => {
  const { isLoggedIn } = useAuth();

  const navItems = [
    { id: "/", text: "Home" },
    { id: "/about", text: "About" },
    { id: "/services", text: "Services" },

    ...(isLoggedIn
      ? [
          { id: "/logout", text: "Logout" },
          { id: "/contact", text: "Contact" },
        ]
      : [
          { id: "/register", text: "Register" },
          { id: "/login", text: "Login" },
        ]),
  ];

  return (
    <header
      className="h-full w-full
       bg-gray-800 bg-clip-padding backdrop-filter 
       backdrop-blur-lg bg-opacity-40 border border-gray-800"
    >
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdowns relative z-50">
            <label htmlFor="my-drawer" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </label>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
                {navItems.map((item, index) => (
                  <li key={index} className="py-2 hover:bg-gray-700 rounded-md">
                    <NavLink
                      to={item.id}
                      className="text-gray-200 hover:text-white"
                    >
                      {item.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* to={isLoggedIn ? "/admin" : "/"} */}
          <NavLink to={"/"} className="btn btn-ghost text-error text-xl">
            DemoWebS
          </NavLink>

          <div
            className={
              isLoggedIn
                ? "badge badge-primary mx-4 badge-xs"
                : "badge badge-error mx-4 badge-xs"
            }
          ></div>
          <ThemeChanger />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="hidden md:flex w-full items-center justify-between">
            <div className="flex space-x-4">
              {navItems
                .filter(
                  (item) =>
                    item.text === "Home" ||
                    item.text === "About" ||
                    item.text === "Services" ||
                    item.text === "Contact"
                )
                .map((item, index) => (
                  <li
                    key={index}
                    className="mx-4 rounded-md  cursor-pointer duration-300 text-error hover:text-red-600"
                  >
                    <NavLink to={item.id}>{item.text}</NavLink>
                  </li>
                ))}
            </div>
          </ul>
        </div>
        <div className="flex space-x-4 navbar-end">
          {navItems
            .filter(
              (item) =>
                item.text === "Login" ||
                item.text === "Register" ||
                item.text === "Logout"
            )
            .map((item, index) => (
              <div
                key={index}
                className="
                  rounded-md 
                  duration-300 text-error hover:text-red-600"
              >
                <NavLink to={item.id}>{item.text}</NavLink>
              </div>
            ))}
        </div>
      </div>
    </header>
  );
};

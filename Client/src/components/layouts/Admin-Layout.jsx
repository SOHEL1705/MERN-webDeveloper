import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { IoHome } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi";
import { RiContactsBookFill } from "react-icons/ri";
// import { AdminHome } from "../../pages/admin/Admin-Home";

export const AdminLayout = () => {
  const { userInfoData, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //* Check if user is admin
  //! if not redirect to home
  if (!userInfoData.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex  min-h-screen">
      {/* Sidebar */}
      <aside className="w-16 bg-base-200 flex content-center text-white p-4">
        <ul className="space-y-4">
          <li className="p-1 bg-slate-600 hover:bg-slate-400 hover:text-slate-700  rounded-sm">
            <NavLink
              to="/admin/home"
              className="flex items-center space-x-2 text-xl "
            >
              <IoHome className="text-2xl" />
            </NavLink>
          </li>
          <div className="divider"></div>
          
            <li className="p-1 bg-slate-600 hover:bg-slate-400 hover:text-slate-700  rounded-sm">
              <NavLink
                to="/admin/users"
                className="flex items-center space-x-2 text-xl "
              >
                <HiUserCircle className="text-2xl" />
                {/* <span>Users</span> */}
              </NavLink>
            </li>
            <li className="p-1 bg-slate-600 hover:bg-slate-400 hover:text-slate-700  rounded-sm">
              <NavLink
                to="/admin/contacts"
                className="flex items-center space-x-2 text-xl "
              >
                <RiContactsBookFill className="text-2xl" />
                {/* <span>Contacts</span> */}
              </NavLink>
            </li>
        </ul>
      </aside>

      {/* Main Content Section */}
      <section className="flex-1 bg-base-content">
        <div className="text-primary mx-auto">
          {/* <AdminHome/> */}
          <Outlet />
        </div>
      </section>
    </div>
  );
};

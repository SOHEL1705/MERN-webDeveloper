/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Buttons } from "../Buttons";
import { FaUserEdit, FaUserSlash } from "react-icons/fa";
import { useAuth } from "../../store/Auth";
// import { UpdateDialog } from "../UpdateDialog";

const Tabels = ({ user, deleteUser }) => {
  const {user_tbl_heading} = useAuth()
  return (
    <>
        <table  className="table table-md p-8 table-pin-rows table-pin-cols">
          <thead>
            <tr>
              {user_tbl_heading.map((item) => {
                return (
                  <th key={item.id}>
                    {item.text}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {user.length == 0 ? 
            (
              <tr>
              <td colSpan="5" className="text-center">
               No User is Available 
              </td>
            </tr>
            ):(
              user.map((item, index) => (
                <tr key={item._id} className="hover:bg-slate-600 hover:text-black">
                  <td >{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td
                    className={`text-left ${
                      item.isAdmin ? "admin-yes" : "admin-no"
                    }`}
                  >
                    {item.isAdmin ? "Yes" : "No"}
                  </td>
                  <td>
                    {/* <button onClick={()=>{deleteUser(item._id)}}>delete</button> */}
                    <Buttons
                      onClickHandler={() => deleteUser(item._id)} // Pass item._id here
                      btnType="button"
                      btnName="Delete"
                      btnClass="btn btn-xs btn-error"
                      icon={FaUserEdit}
                    />
                  </td>
                  <td className="text-left user-edit">
                    {/* <UpdateDialog/> */}
                    <Link to={`/admin/users/${item._id}/update`}>
                      <Buttons
                        btnType="button"
                        btnName="Edit"
                        btnClass="btn  btn-xs btn-success"
                        icon={FaUserSlash}
                      />
                    </Link>
                  </td>
                </tr>
              ))
            )
            }
           
          </tbody>
          <tfoot>
            <tr>
              {user_tbl_heading.map((item) => {
                return (
                  <th key={item.id}>
                    {item.text}
                  </th>
                );
              })}
            </tr>
            <tr className="bg-red-300">
    <td className="bg-slate-800 text-center" colSpan={7}>
      This Contains List of Contacts
    </td>
  </tr>
          </tfoot>
        </table>
    </>
  );
};

export default Tabels;

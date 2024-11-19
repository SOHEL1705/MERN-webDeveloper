/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Buttons } from "./Buttons";
import { FaUserEdit, FaUserSlash } from "react-icons/fa";
export const Tables = ({ body, deleteUser,headers }) => {
  
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          {/*table header */}
          <thead>
            <tr>
              {headers.map((item) => {
                return (
                  <th key={item.id}>
                    {item.text}
                  </th>
                );
              })}
            </tr>
          </thead>


          {/* table body */}
          <tbody>
            {body.map((item, index) => (
              <tr key={item._id} className="hover:bg-slate-600 hover:text-black">
                <td>{index + 1}</td>
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
            ))}
          </tbody>


          {/* table footer */}
          <tfoot>
            <tr>
              <th></th>
              <td>Name</td>
              <td>Job</td>
              <td>company</td>
              <td>location</td>
              <td>Last Login</td>
              <td>Favorite Color</td>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

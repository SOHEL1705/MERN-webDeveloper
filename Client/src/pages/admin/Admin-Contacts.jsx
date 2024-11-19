import { useAuth } from "@/store/Auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const { authTokenBearer } = useAuth();
  const [contactsData, setContactsData] = useState([]);

  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authTokenBearer,
          },
        }
      );
      if (response.ok) {
        get_all_contacts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_all_contacts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: authTokenBearer,
        },
      });

      const data = await response.json();
      console.log("contacts data", data.contacts);
      if (response.ok) {
        toast.success(data.message);
        setContactsData(data.contacts);
      } else {
        toast.error(data.message);
      }
      // get_all_contacts()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    get_all_contacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-x-auto ">
      <table className="table table-md table-pin-rows table-pin-cols">
        <thead>
          <tr>
            {/* <th></th> */}
            <th>No.</th>
            <td>Name</td>
            <td>Email</td>
            <td>Messages</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {contactsData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
               No Contact Data is Available 
              </td>
            </tr>
          ) : (
            contactsData.map((item, index) => {
              const { _id, email, username, message } = item;
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{username || "N/A"}</td>
                  <td>{email || "N/A"}</td>
                  <td>{message || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-xs px-2 btn-error"
                      onClick={() => deleteContact(_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <td>Name</td>
            <td>Email</td>
            <td>Messages</td>
            <td>Delete</td>
          </tr>
          <tr className="bg-red-300">
            <td className="bg-slate-800 text-center" colSpan={6}>
              This Contains List of Users
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

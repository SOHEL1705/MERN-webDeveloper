import { useEffect, useState } from "react"
import { useAuth } from "../../store/Auth";
import Tabels from "../../components/table-component/Tabels";
import { toast } from "react-toastify";
export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authTokenBearer,userInfoData } = useAuth();



  //*-----------------------------------------[get all user data]---------------------------
  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users",
        {
          method: "GET",
          headers : {
            Authorization: authTokenBearer
          }
        }
      ) 
      const data = await response.json();
      setUsers(data.userData);
      console.log(data.userData);
    } catch (error) {
      console.log(error);
      
    }
  }
const currentUsersID = userInfoData._id  
console.log(currentUsersID);

  
  
  //! ---------------------------------------------------------------------Delete User Function 
  
  const deleteUser = async (id) => {
    try {
      const currentUserID = userInfoData._id; 
      const userExists = users.some(user => user._id === currentUserID);
  
      if (userExists && id === currentUserID) {
        toast.error("Cannot delete the current user.")
        return 
      } 
  
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authTokenBearer
        }
      });
  
      const data = await response.json();
      console.log(`Deleted user with ID: ${id}, Response: ${JSON.stringify(data)}`);
  
      if (response.ok) {
        await getAllUsers(); 
      } else {
        console.log("Failed to delete user:", data.message || "Unknown error");
      }
  
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };
  
  
  useEffect(() => {
    getAllUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
    <Tabels deleteUser={deleteUser} user = {users}/>
    </>
  )
}
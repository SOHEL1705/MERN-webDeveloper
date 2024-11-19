import { Buttons } from "@/components/Buttons";
import { Inputs } from "@/components/Inputs";
import { useAuth } from "@/store/Auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const params = useParams();
  const { authTokenBearer } = useAuth();

  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: true,
  });

  // Fetch single user data
  const getSingleUser = async () => {
    if (!authTokenBearer) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: { Authorization: authTokenBearer },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.userData);
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("An unexpected error occurred while fetching user data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Update user data
  const updateUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authTokenBearer,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("User updated:", responseData);
        toast.success("User Updated Successfully");
      } else {
        const errorData = await response.json();
        console.log("Failed to update user:", errorData);
        toast.error("User Not Updated");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An unexpected error occurred while updating user data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserData();
  };

  // Toggle isAdmin state
  const toggleAdmin = () => {
    setData({ ...data, isAdmin: !data.isAdmin });
  };

  useEffect(() => {
    getSingleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, authTokenBearer]);

  return (
    <section className="mx-8 bg-base-200">
      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        <h1 className="px-10 text-3xl text-center">Update User</h1>

        {/* Username input */}
        <Inputs
          inputType="text"
          inputId="username"
          inputName="username"
          inputValue={data.username}
          onChangeHandler={handleChange}
          inputRequired={true}
        />

        {/* Email input */}
        <Inputs
          inputType="email"
          inputId="email"
          inputName="email"
          inputValue={data.email}
          onChangeHandler={handleChange}
          inputRequired={true}
        />

        {/* Phone input */}
        <Inputs
          inputType="tel"
          inputId="phone"
          inputName="phone"
          inputValue={data.phone}
          onChangeHandler={handleChange}
          inputRequired={true}
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="isAdmin">
            Admin Mode: {data.isAdmin ? "Enabled" : "Disabled"}
          </label>
          <input
            type="checkbox"
            checked={data.isAdmin} // Bind the checkbox to `data.isAdmin`
            onChange={toggleAdmin} // Call `toggleAdmin` on change
            id="isAdmin"
            className="toggle toggle-primary"
          />
{/* 
          <Switch
            id="isAdmin"
            checked={data.isAdmin}
            onCheckedChange={toggleAdmin}
          /> */}
        </div>
        <Buttons btnType="submit" btnName="Update" btnClass="submit-button" />
      </form>
    </section>
  );
};

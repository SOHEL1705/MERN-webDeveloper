import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Inputs } from "../components/Inputs";
import { toast } from "react-toastify";
import { Buttons } from "../components/Buttons";
import { useAuth } from "../store/Auth";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const { store_in_LocalStorage } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const register_URL = "http://localhost:5000/api/auth/register";
      const response = await fetch(register_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // console.log("Register Data:", res_Data.details);

      if (response.ok) {
        const res_Data = await response.json();
        //this a response from the server which we convert to json
        store_in_LocalStorage(res_Data.token);

        setFormData({
          username: "",
          email: "",
          password: "",
          phone: "",
        });

        console.log("Form submitted:", formData);
        navigate("/contact");
        toast.success("Registered successfully");
      } else {
        const errorData = await response.json();
        errorData.details
          ? toast.error(errorData.details)
          : toast.error(errorData.message);
        // errorData.details ? alert(errorData.details) : alert(errorData.message);
        throw new Error(
          `Error: ${response.status} - ${errorData.message} \n ${errorData.details}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="hero  bg-base-200 min-h-screen p-16">
        <div className="hero-content items-start flex-col lg:flex-row-reverse">
          {/* form here */}
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body"  onSubmit={handleSubmit}>
              <div className="form-control">
                {/* inputs here */}
                {/* Username input */}
                <Inputs
                  inputLabel="Name"
                  inputType="text"
                  inputId="username"
                  inputName="username"
                  inputValue={formData.username}
                  onChangeHandler={handleChange}
                  inputRequired={false}
                />
                {/* email input */}
                <Inputs
                  inputLabel="Email"
                  inputType="email"
                  inputId="email"
                  inputName="email"
                  inputValue={formData.email}
                  onChangeHandler={handleChange}
                  inputRequired={false}
                />
                {/* password input */}
                <Inputs
                  inputLabel="Password"
                  inputType="password"
                  inputId="password"
                  inputName="password"
                  inputValue={formData.password}
                  onChangeHandler={handleChange}
                  inputRequired={true}
                />
                {/* phone input */}
                <Inputs
                  inputLabel="Phone Number"
                  inputType="phone"
                  inputId="phone"
                  inputName="phone"
                  inputValue={formData.phone}
                  onChangeHandler={handleChange}
                  inputRequired={true}
                />
              </div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <div className="form-control mt-6">
              <Buttons
              btnType="submit"
              btnName="Register"
              btnClass="btn btn-primary"
            />
              </div>
            </form>
          </div>

          <div>
            <h1 className="text-5xl items-start font-bold">Register</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

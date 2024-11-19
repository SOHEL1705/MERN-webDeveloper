import { useState } from "react";
import { Inputs } from "../components/Inputs";
import { Buttons } from "../components/Buttons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/Auth";

const URL = "http://localhost:5000/api/auth/login";
export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { store_in_LocalStorage } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
        // credentials: "include",
      });

      if (response.ok) {
        const res_Data = await response.json();
        console.log(res_Data);
        setFormData({
          email: "",
          password: "",
        });
        const token_data = res_Data.token;
        store_in_LocalStorage(token_data);

        toast.success("Logged in successfully");
        navigate("/");
      } else {
        const errorData = await response.json();
        errorData.details
          ? toast.error(errorData.details)
          : toast.error(errorData.message);
        throw new Error(
          `Error: ${response.status} - ${errorData.message} \n ${errorData.details}`
        );
      }
    } catch (error) {
      console.log(error);
    }

    // console.log("Form submitted:", formData);
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content items-start flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <Inputs
                  inputLabel="Email"
                  inputType="email"
                  inputId="email"
                  inputName="email"
                  inputValue={formData.email}
                  onChangeHandler={handleChange}
                  inputRequired={false}
                />
              </div>
              <div className="form-control">
                <Inputs
                  inputLabel="Password"
                  inputType="password"
                  inputId="password"
                  inputName="password"
                  inputValue={formData.password}
                  onChangeHandler={handleChange}
                  inputRequired={false}
                />
              </div>
              <div className="form-control mt-6">
                <Buttons
                  btnType="submit"
                  btnName="Login"
                  btnClass="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

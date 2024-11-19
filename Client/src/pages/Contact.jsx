import { useState, useEffect } from "react";
import { Buttons } from "../components/Buttons";
import { Inputs } from "../components/Inputs";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

export const Contact = () => {
  const defaultData = {
    email: "",
    username: "",
    message: "",
  };
  
  const [formData, setFormData] = useState(defaultData);
  const { userInfoData } = useAuth();

  useEffect(() => {
    if (userInfoData) {
      setFormData({
        email: userInfoData.email || "",
        username: userInfoData.username || "",
        message: userInfoData.message || "",
      });
    }
  }, [userInfoData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const resData = await response.json();
        setFormData(defaultData);
        toast.success(resData.message);
      } else {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-base-200">
      <section className="w-full max-w-lg p-6 m-4 bg-base-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-primary mb-4">Contact Us</h1>
        <form className="form-control space-y-4" onSubmit={handleSubmit}>
          <Inputs
            inputLabel="Username"
            inputType="text"
            inputId="username"
            inputName="username"
            inputValue={formData.username}
            onChangeHandler={handleChange}
            inputRequired={true}
            inputClass="input input-bordered w-full"
            labelClass="label"
          />
          <Inputs
            inputLabel="Email"
            inputType="email"
            inputId="email"
            inputName="email"
            inputValue={formData.email}
            onChangeHandler={handleChange}
            inputRequired={true}
            inputClass="input input-bordered w-full"
            labelClass="label"
          />
          <label className="label">Message</label>
          <textarea
            className="textarea textarea-bordered dark:text-white w-full"
            placeholder="Your message here..."
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            cols="30"
            rows="5"
            required
          ></textarea>
          <Buttons btnType="submit" btnName="Submit" btnClass="btn btn-primary w-full" />
        </form>
      </section>
    </div>
  );
};

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUser, updateUser } from "../services/api";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [otp, setOtp] = useState();
  const [userOtp, setUserOtp] = useState();
  useEffect(() => {
    if (id) {
      getUser(id).then((res) => setFormData(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateUser(id, formData);
      alert("user updated");
      navigate("/");
    } else {
      const response = await createUser(formData);
      setOtp(response.data.newUser.otp);
      //   if (userOtp === otp) {
      //     navigate("/");
      //   }
      console.log(response);
    }
  };
  return (
    <>
      <div>
        <h2>{id ? "Edit user" : "Register User"}</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Enter Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter Your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter Your phone number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter Your address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          {otp && (
            <div>
              <p>Generated OTP:{otp}</p>
              <input type="number" placeholder="enter your otp" />
            </div>
          )}
          <button type="submit">{id ? "update user" : "register user"}</button>
        </form>
      </div>
    </>
  );
};

export default UserForm;

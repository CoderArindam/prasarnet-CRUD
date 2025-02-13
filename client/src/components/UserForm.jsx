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
  const [userOtp, setUserOtp] = useState(0);
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
      if (userOtp === otp) {
        navigate("/");
      }
    }
  };

  const handleOtpSubmission = (userOtp) => {
    if (Number(userOtp) === otp) {
      navigate("/");
    }
  };
  return (
    <>
      <div>
        <h2 className="">{id ? "Edit user" : "Register User"}</h2>
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

          {!otp && (
            <>
              <button type="submit">
                {id ? "Update user" : "Register user"}
              </button>
            </>
          )}
        </form>
        {otp && (
          <div>
            <p>Generated OTP:{otp}</p>
            <input
              type="number"
              placeholder="enter your otp"
              onChange={(e) => setUserOtp(e.target.value)}
              value={userOtp}
            />
            <button onClick={() => handleOtpSubmission(userOtp)}>
              Submit Otp
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserForm;

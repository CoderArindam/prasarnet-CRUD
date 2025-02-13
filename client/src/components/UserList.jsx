import React, { useEffect, useState } from "react";
import { deleteUser, fetchUsers, updateUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data.data.users);
    };
    getUsers();
  }, []);
  //   console.log(users);
  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    fetchUsers();
  };

  return (
    <div>
      <button onClick={() => navigate("/create")}>Add a new user</button>
      <h2>All Users List</h2>
      {users.map((item, index) => (
        <div key={index}>
          Name: <span>{item.name}</span> <br />
          <span>Email: {item.email}</span> <br />
          <span>
            {item.phone} -{item.address} <br />
          </span>{" "}
          <br />
          <div>
            <Link to={`/edit/${item._id}`}>Edit</Link> <br />
            <button onClick={() => handleDelete(item._id)}>Delete</button>
            <br />
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default UserList;

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
    fetchUsers();
  };

  return (
    <div>
      <button onClick={() => navigate("/create")}>Add a new user</button>
      <h2>All Users List</h2>
      {users.map((item, index) => (
        <div key={index}>
          {item.name} - {item.email} - {item.phone} -{item.address}
          <Link to={`/edit/${item._id}`}>Edit</Link>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;

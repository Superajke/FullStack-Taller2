import { useState } from "react";
import { useAuth } from "../../context/UserContext";
import UptadeItem from "../UptadeItem";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
function UsersRows({ toggleUpdate }) {
  const { users, deleteUser } = useAuth();
  return (
    <>
      {users.map((user) => (
        <tr key={user.userId}>
          <td>
            {user.firstName} {user.lastName}
          </td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => {
              toggleUpdate(user.userId);
            }}
          >
            <FaPencilAlt />
          </td>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => {
              deleteUser(user.userId);
            }}
          >
            <FaRegTrashAlt />
          </td>
        </tr>
      ))}
    </>
  );
}

export default UsersRows;

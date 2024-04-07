import { useAuth } from "../../context/UserContext";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
function UsersRows({ toggleUpdate, toggleDelete }) {
  const { users } = useAuth();
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
            className="table__button"
            onClick={() => {
              toggleUpdate(user.userId);
            }}
          >
            <FaPencilAlt />
          </td>
          <td
            className="table__button"
            onClick={() => {
              toggleDelete(user.userId, user.firstName + " " + user.lastName);
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

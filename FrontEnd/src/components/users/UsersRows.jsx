import { useAuth } from "../../context/UserContext";
import { FaPencilAlt, FaRegTrashAlt, FaRetweet } from "react-icons/fa";
function UsersRows({ toggleUpdate, toggleDelete, tableType }) {
  const { users } = useAuth();
  
  tableType = tableType.tableType;

  const userList = users.filter((user) => user.active === tableType);

  return (
    <>
      {userList.map((user) => (
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
            {tableType === "ACTIVE" ? <FaRegTrashAlt /> : <FaRetweet />}
          </td>
        </tr>
      ))}
    </>
  );
}

export default UsersRows;

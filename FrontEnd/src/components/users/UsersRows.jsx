import { useAuth } from "../../context/UserContext";
function UsersRows() {
  const { users, deleteUser } = useAuth();
  return (
    <>
      {users.map((user) => (
        <tr key={user.userId}>
          <td>
            {user.firstName} {user.lastName}
          </td>
          <td>{user.email}</td>
          <td>Editar</td>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => {
                deleteUser(user.userId);
            }}
          >
            ❌
          </td>
        </tr>
      ))}
    </>
  );
}

export default UsersRows;

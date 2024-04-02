import UsersRows from "./UsersRows";

function UsersTable() {
  return (
    <>
      <section className="appointments_content__container">
        <table className="appointments__table">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <UsersRows />
          </tbody>
        </table>
      </section>
    </>
  );
}

export default UsersTable;

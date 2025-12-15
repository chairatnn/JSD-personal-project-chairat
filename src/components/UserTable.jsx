export function UserTable({ users }) {
  return (
    <div>
      <table className="w-full border-separate">
        <thead>
          <tr className="bg-gray-200">
            <th className="border rounded-tl-lg p-2">Name</th>
            <th className="border p-2">Last name</th>
            <th className="border p-2 rounded-tr-lg">Position</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.lastname}</td>
              <td className="border p-2">{user.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

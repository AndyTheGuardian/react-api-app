import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">User Directory</h1>
        <div>
          <input
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <h1>Users</h1>
          <div className="grid gap-3">
            {filteredUsers.length === 0 ? (
              <p className="text-center text-gray-500">No users found</p>
            ) : (
              filteredUsers.map((user) => (
                <div
                  className="p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition"
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                >
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              ))
            )}
          </div>

          {selectedUser && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">{selectedUser.name}</h2>
              <p className="text-gray-600">Email: {selectedUser.email}</p>
              <p className="text-gray-600">User ID: {selectedUser.id}</p>

              <button
                className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

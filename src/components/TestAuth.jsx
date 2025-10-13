import React from "react";
import { useAuth } from "../hooks";

const TestAuth = () => {
  const { isAuthenticated, user, login, logout, loading, error } = useAuth();

  const handleTestLogin = async () => {
    const result = await login({
      email: "admin@example.com",
      password: "123456",
    });
    console.log("Login result:", result);
  };

  const handleTestLoginWrong = async () => {
    const result = await login({
      email: "wrong@example.com",
      password: "wrongpassword",
    });
    console.log("Wrong login result:", result);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-bold mb-4">Test Authentication</h3>

      <div className="mb-4">
        <p>
          <strong>isAuthenticated:</strong>{" "}
          {isAuthenticated ? "✅ True" : "❌ False"}
        </p>
        <p>
          <strong>User:</strong> {user ? JSON.stringify(user, null, 2) : "null"}
        </p>
        <p>
          <strong>Loading:</strong> {loading ? "⏳ True" : "✅ False"}
        </p>
        <p>
          <strong>Error:</strong> {error || "None"}
        </p>
      </div>

      <div className="space-x-2">
        <button
          onClick={handleTestLogin}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          Test Login (Admin)
        </button>

        <button
          onClick={handleTestLoginWrong}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Test Wrong Login
        </button>

        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TestAuth;

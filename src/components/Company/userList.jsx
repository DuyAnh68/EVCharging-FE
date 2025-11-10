function UserList({ users, loading, error }) {
 if (loading) return <p>Đang tải danh sách tài xế...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;
  if (!Array.isArray(users) || users.length === 0)
    return <p>Không có tài xế nào.</p>;

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <table className="min-w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Tên</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{u?.id}</td>
              <td className="px-4 py-2 border">{u?.name}</td>
              <td className="px-4 py-2 border">{u?.email}</td>
              <td className="px-4 py-2 border">
                {/* {u?.active ? "Hoạt động" : "Ngưng hoạt động"} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

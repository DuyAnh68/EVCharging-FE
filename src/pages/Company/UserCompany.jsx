import { useEffect, useState } from "react";
import useCompany from "../../hooks/useCompany";
import UserList from "../../components/Company/UserList.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserCompany = () => {
    const [users, setUsers] = useState();
    const {getUserCompany, loading, error, deleteDriver} = useCompany();
  

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUserCompany();
            console.log("users", data);
            if(data){
                setUsers(data);
            }
        };
        fetchUsers();
    }, []);

    
    const handleDelete = async (id) => {
        if (!id) return;
        const ok = window.confirm("Bạn có chắc muốn xóa tài xế này không?");
        if (!ok) return;
    try {
      const response = await deleteDriver(id);

      if (response) {
        toast.success(response);
        setUsers(users.filter((u) => u.id !== id)); // cập nhật UI
      } else {
        toast.error("Xóa tài xế thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xóa tài xế." + (error?.message || ""));
    }
  };

    return (
        <div className="min-h-screen  py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#00B35C] to-[#009951] rounded-xl flex items-center justify-center shadow-md">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    Quản lý tài xế
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Danh sách tài xế trong công ty
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/company/addDriver"
                            className="flex items-center gap-2 bg-gradient-to-r from-[#00B35C] to-[#009951] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Thêm tài xế
                        </Link>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <UserList 
                    users={users} 
                    loading={loading} 
                    error={error} 
                    onDelete={handleDelete}/>
                </div>
            </div>
        </div>
    );
}

export default UserCompany;
import { useEffect, useState } from "react";
import useCompany from "../../hooks/useCompany";
// import UserList from "../../components/Company/UserList.jsx";

const UserCompany = () => {
    const [users, setUsers] = useState([]);
    const {getUserCompany, loading, error} = useCompany();

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

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="top flex justify-between max-w-7xl mx-auto mb-1">
                <div className="title !text-[#14AE5C] text-4xl font-bold">
                    Danh sách tài xế
                </div>
                {/* <div>
                    <UserList users={users} loading={loading} error={error}/>
                </div> */}
            </div>
        </div>
    );
}

export default UserCompany;
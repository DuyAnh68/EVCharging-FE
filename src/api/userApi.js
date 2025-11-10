import axiosClient from "./axiosClient";

const userApi  = {
    getUser: () => axiosClient.get('/api/member/user'),
    updateUser: (data) => axiosClient.put('/api/member/user', data),
};

export default userApi;
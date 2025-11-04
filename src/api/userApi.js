import axiosClient from "./axiosClient";

const userApi  = {
    getUser: () => axiosClient.get('/member/user'),
    updateUser: (data) => axiosClient.put('/member/user', data),
};

export default userApi;
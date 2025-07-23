import { create } from "zustand";
import { axiosInstance } from "./lib/axios.js";
import toast from "react-hot-toast";

const token = localStorage.getItem('jwt')

export const api = create((set, get) => ({
    userGear: null,
    authUser: null,
    userInfo: null,

    checkAuth: async () => {
        try {

            // if (localStorage.getItem(('jwt')))
            //     set({authUser: localStorage.getItem('jwt')})

            const res = await axiosInstance.get("/user/checkAuth")
            set({authUser: res.data})
            console.log(res.data)

        } catch (error) {
            console.log(error.message)
        }

    },
    signup: async (data) => {
        try {
            const res = await axiosInstance.post("/user/signup", data)
            set({authUser: res.data})
            toast.success("Account created successfully")

        } catch (error) {
            toast.error(error.response.data.detail)
        }
    },
    login: async (data) => {
        try {
            const res = await axiosInstance.post("/user/login", data)
            // localStorage.setItem("jwt", res.data.access_token)
            set({authUser: res.data})
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.detail)
        }
    },
    logout: async () => {
        try {
            const token = localStorage.getItem("jwt")
            console.log(token)
            const res = await axiosInstance.post("/user/logout", {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            localStorage.removeItem("jwt")
            set({userGear: null})
            set({authUser: null})
            toast.success(res.data.message);

        } catch (error) {
            console.log(error)
        }
    },
    get_user_info: async () => {
        try {

            const res = await axiosInstance.get("user/get_user_info", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            set({userInfo: res.data})
        } catch (error) {
            console.log(error)
        }
    },
    edit_user: async (data) => {
        try {
            const token = localStorage.getItem("jwt")

            const res = await axiosInstance.put(`user/edit_user`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    },
    get_gear: async () => {
        try {
            const res = await axiosInstance.get("/gear/")
            await set({userGear: res.data})
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.detail)
        }
    },
    save_new_gear: async (data) => {
        try {
            const token = localStorage.getItem("jwt")
            const res = await axiosInstance.post("/gear/add", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            set({userGear: res.data})
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.detail)
        }
    },
    edit_gear: async (data) => {
        try {
            const token = localStorage.getItem("jwt")
            const res = await axiosInstance.put(`gear/edit_item/${data.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error.response)
        }
    },
    delete_gear: async (data) => {
        try {
            // console.log(data)
            const token = localStorage.getItem("jwt")
             const res = await axiosInstance.delete(`/gear/delete/${data}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        } catch (error) {
            console.log(error)

        }
    }

}))

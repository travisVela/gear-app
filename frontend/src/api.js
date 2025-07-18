import { create } from "zustand";
import { axiosInstance } from "./lib/axios.js";
import toast from "react-hot-toast";



export const api = create((set, get) => ({
    userGear: null,
    token: null,
    authUser: null,

    checkAuth: async () => {
        try {
            const token = localStorage.getItem("jwt")
            const res = await axiosInstance.get("/user/checkAuth", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
             set({authUser: res.data})
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
            localStorage.setItem("jwt", res.data.access_token)
            set({authUser: res.data})
            toast.success("Logged in successfully");
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
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
    get_gear: async () => {
        try {
            const token = localStorage.getItem("jwt")
            const res = await axiosInstance.get("/gear", {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            set({userGear: res.data})
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
        }
    }

}))

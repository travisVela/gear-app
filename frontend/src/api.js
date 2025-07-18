import { create } from "zustand";
import { axiosInstance } from "./lib/axios.js";
import toast from "react-hot-toast";



export const api = create((set, get) => ({
    authUserGear: null,
    token: null,

    signup: async (data) => {
        try {
            console.log("in get gear api call")
            const res = await axiosInstance.post("/user/signup", data)
            console.log(res.data)
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

            set({authUserGear: res.data})
        } catch (error) {
            console.log(error.message)
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
            set({authUserGear: res.data})
            console.log(res.data)

        } catch (error) {
            console.log(error)
            // toast.error(error.response.data.detail)
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
            set({authUserGear: res.data})
        } catch (error) {
            console.log(error)
        }
    }

}))

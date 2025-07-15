import axios from "axios"


//create an instance of axios with the base url


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
    // baseURL: "http://localhost:8000"
})

export default api;
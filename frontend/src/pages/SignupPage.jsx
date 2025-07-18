import React, {useState} from "react";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import {api} from "../api"



const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {signup} = api()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        firstname: "",
        lastname: "",
        bio: ""
    });
    const validateForm = () => {
        if (!formData.username.trim()) return toast.error("Username is required");
        if (!formData.firstname.trim()) return toast.error("First Name is required");
        if (!formData.lastname.trim()) return toast.error("Last Name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email))
            return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6)
            return toast.error("Password must be al least 6 characters");

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const success = validateForm()
        if (success === true) signup(formData)
    }

    return (
        <div className={"flex flex-col h-screen w-1/2 justify-center items-center"}>
        <form className="my-4  flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <div className={"flex flex-row w-full"}>
                <div className={"flex flex-col w-50"}>
                    <input
                        type={"email"}
                        value={formData.email}
                        placeholder={"Email"}
                        className="input border border-gray-500 rounded-2xl w-full p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <div className={"flex flex-col w-50"}>
                    <input
                        type="username"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        placeholder="Username"
                        className="input border border-gray-500 rounded-2xl w-full p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                    />
                </div>
            </div>
            <div className={"flex flex-row w-full"}>
                <div className={"relative"}>
                    <div className={"flex flex-row w-50"}>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="*******"
                            className="input border border-gray-500  rounded-2xl w-full p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="size-5 text-base-content/40"></EyeOff>
                            ) : (
                                <Eye className="size-5 text-base-content/40"></Eye>
                            )}
                        </button>
                    </div>
                </div>
                {/*<div className={"flex flex-col w-50"}>*/}
                {/*    <input*/}
                {/*        type={showPassword ? "text" : "password"}*/}
                {/*        value={formData.confirm_password}*/}
                {/*        onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}*/}
                {/*        placeholder="*******"*/}
                {/*        className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"*/}
                {/*    />*/}

                {/*</div>*/}
            </div>


            <div className={"flex flex-row w-full"}>
                <div className={"flex flex-row w-50"}>
                    <input
                        type="text"
                        value={formData.firstname}
                        onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                        placeholder="First Name"
                        className="input border border-gray-500  rounded-2xl w-full p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                    />
                </div>
                <div className={"flex flex-col w-50"}>
                    <input
                        type="text"
                        value={formData.lastname}
                        onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                        placeholder="Lastname"
                        className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                    />

                </div>
            </div>

            <textarea

                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Tell us about you..."
                className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                rows="5"
                cols={"40"}
            />

            <button className="m-2" type="submit">Submit</button>
        </form>
            </div>
    )
}
export default SignupPage
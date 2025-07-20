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

const LoginPage = () => {
    const {login} = api()
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        login(formData);
      };

    return (
        <div className={"flex flex-col h-screen justify-center items-center"}>
        <form className="my-4  flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <div className={"flex flex-row w-full"}>
                <div className={"flex flex-col w-50"}>
                    <input
                        type={"username"}
                        value={formData.username}
                        placeholder={"Username"}
                        className="input border border-gray-500 rounded-2xl w-full p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                </div>
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
            </div>
            <button className="m-2" type="submit">Submit</button>
        </form>
        </div>
    )
}
export default LoginPage
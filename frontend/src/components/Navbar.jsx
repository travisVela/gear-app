import {api} from "../api";
import {Link} from "react-router-dom";
import {LogOut, MessageSquare, Settings, User} from "lucide-react";

const Navbar = () => {
    const {logout} = api()

    return (


        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">

                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Gear App</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>

                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        <li>
                            <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                                <User className="sixe-5">
                                    <span className="hidden sm:inline">Profile</span>
                                </User>
                            </Link>
                        </li>
                        <li>
                            <button className="flex gap-2 items-center" onClick={logout}>
                                <LogOut className="size-5">
                                    <span className="hidden sm:inline">Logout</span>
                                </LogOut>
                            </button>

                        </li>


                    </ul>
                </div>
            </div>
        </nav>


    )
}
export default Navbar